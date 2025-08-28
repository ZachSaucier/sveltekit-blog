import fetchPosts from './fetchPosts.js';

/**
 * Calculate tag frequency across all posts
 * @param {Array} posts - All posts to analyze
 * @returns {Map} Map of tag -> frequency count
 */
const calculateTagFrequencies = (posts) => {
  const tagFrequencies = new Map();
  
  posts.forEach(post => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach(tag => {
        tagFrequencies.set(tag, (tagFrequencies.get(tag) || 0) + 1);
      });
    }
  });
  
  return tagFrequencies;
};

/**
 * Calculate weighted relevance score based on tag rarity
 * Rarer tags contribute more to the score using inverse frequency weighting
 * @param {Array<string>} sharedTags - Tags shared between posts
 * @param {Map} tagFrequencies - Map of tag frequencies
 * @param {number} totalPosts - Total number of posts for normalization
 * @returns {number} Weighted relevance score
 */
const calculateWeightedScore = (sharedTags, tagFrequencies, totalPosts) => {
  return sharedTags.reduce((score, tag) => {
    const frequency = tagFrequencies.get(tag) || 1;
    // Use inverse frequency: rarer tags get higher weights
    // Add 1 to avoid division by zero and smooth the curve
    const weight = Math.log(totalPosts / frequency + 1);
    return score + weight;
  }, 0);
};

/**
 * Get related posts based on shared tags with weighted scoring
 * @param {string} currentSlug - The slug of the current post to exclude
 * @param {Array<string>} currentTags - Tags of the current post
 * @param {number} limit - Maximum number of related posts to return (default: 2)
 * @param {boolean} useWeighting - Whether to use weighted scoring (default: true)
 * @returns {Promise<Array>} Array of related posts sorted by weighted relevance and recency
 */
const getRelatedPosts = async (currentSlug, currentTags = [], limit = 2, useWeighting = true) => {
  if (!currentTags || currentTags.length === 0) {
    return [];
  }

  const { posts } = await fetchPosts({ limit: -1 });
  
  // Filter out the current post and posts without tags
  const otherPosts = posts.filter(post => 
    post.slug !== currentSlug && 
    post.tags && 
    post.tags.length > 0
  );

  // Calculate tag frequencies across all posts (only if using weighting)
  const tagFrequencies = useWeighting ? calculateTagFrequencies(posts) : null;
  const totalPosts = posts.length;

  // Calculate relevance score for each post
  const postsWithScores = otherPosts.map(post => {
    const sharedTags = post.tags.filter(tag => currentTags.includes(tag));
    
    if (sharedTags.length === 0) {
      return {
        ...post,
        relevanceScore: 0,
        sharedTags: []
      };
    }

    let relevanceScore;
    if (useWeighting) {
      relevanceScore = calculateWeightedScore(sharedTags, tagFrequencies, totalPosts);
    } else {
      // Simple count-based scoring
      relevanceScore = sharedTags.length;
    }
    
    return {
      ...post,
      relevanceScore,
      sharedTags,
      // Include tag weights for debugging if needed
      ...(useWeighting && { 
        tagWeights: sharedTags.map(tag => ({
          tag,
          frequency: tagFrequencies.get(tag),
          weight: Math.log(totalPosts / tagFrequencies.get(tag) + 1)
        }))
      })
    };
  });

  // Filter posts that have at least one shared tag
  const relatedPosts = postsWithScores.filter(post => post.relevanceScore > 0);

  // Sort by relevance score (descending), then by date (descending) for tie-breaking
  relatedPosts.sort((a, b) => {
    const scoreDiff = useWeighting ? 
      Math.abs(a.relevanceScore - b.relevanceScore) > 0.001 :
      a.relevanceScore !== b.relevanceScore;
      
    if (scoreDiff) {
      return b.relevanceScore - a.relevanceScore;
    }
    return new Date(b.date) - new Date(a.date);
  });

  return relatedPosts.slice(0, limit);
};

export default getRelatedPosts;
