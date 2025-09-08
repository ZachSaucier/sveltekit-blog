import fetchPosts from './fetchPosts.js';

/**
 * Extract internal blog links from HTML content
 * @param {string} htmlContent - The HTML content to parse
 * @returns {Array<string>} Array of slugs from internal blog links
 */
const extractInternalBlogLinks = (htmlContent) => {
  const linkRegex = /href="\/blog\/([^\/\#"]+)/g;
  const slugs = [];
  let match;
  
  while ((match = linkRegex.exec(htmlContent)) !== null) {
    const slug = match[1];
    if (slug && !slugs.includes(slug)) {
      slugs.push(slug);
    }
  }
  
  return slugs;
};

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
 * Get related posts based on internal links first, then shared tags with weighted scoring
 * @param {string} currentSlug - The slug of the current post to exclude
 * @param {Array<string>} currentTags - Tags of the current post
 * @param {number} limit - Maximum number of related posts to return (default: 2)
 * @param {boolean} useWeighting - Whether to use weighted scoring (default: true)
 * @param {string} postHtml - The HTML content of the current post to extract internal links from
 * @returns {Promise<Array>} Array of related posts sorted by internal links first, then weighted relevance and recency
 */
const getRelatedPosts = async (currentSlug, currentTags = [], limit = 2, useWeighting = true, postHtml = '') => {
  const { posts } = await fetchPosts({ limit: -1 });
  
  // First, check for internal blog links in the post content
  let relatedPosts = [];
  if (postHtml) {
    const internalLinkSlugs = extractInternalBlogLinks(postHtml);
    
    // Find posts that match the internal link slugs, in order of appearance
    for (const slug of internalLinkSlugs) {
      if (relatedPosts.length >= limit) break;
      
      const linkedPost = posts.find(post => post.slug === slug && post.slug !== currentSlug);
      if (linkedPost && !relatedPosts.some(p => p.slug === linkedPost.slug)) {
        relatedPosts.push(linkedPost);
      }
    }
    
    // If we have enough related posts from internal links, return them
    if (relatedPosts.length >= limit) {
      return relatedPosts.slice(0, limit);
    }
  }
  
  // If we don't have enough posts from internal links, fall back to tag-based logic
  if (!currentTags || currentTags.length === 0) {
    return relatedPosts.slice(0, limit);
  }
  
  // Filter out the current post, posts without tags, and posts already in relatedPosts
  const otherPosts = posts.filter(post => 
    post.slug !== currentSlug && 
    post.tags && 
    post.tags.length > 0 &&
    !relatedPosts.some(p => p.slug === post.slug)
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
  const tagBasedPosts = postsWithScores.filter(post => post.relevanceScore > 0);

  // Sort by relevance score (descending), then by date (descending) for tie-breaking
  tagBasedPosts.sort((a, b) => {
    const scoreDiff = useWeighting ? 
      Math.abs(a.relevanceScore - b.relevanceScore) > 0.001 :
      a.relevanceScore !== b.relevanceScore;
      
    if (scoreDiff) {
      return b.relevanceScore - a.relevanceScore;
    }
    return new Date(b.date) - new Date(a.date);
  });

  // Combine internal link posts with tag-based posts, up to the limit
  const remainingSlots = limit - relatedPosts.length;
  const finalRelatedPosts = [...relatedPosts, ...tagBasedPosts.slice(0, remainingSlots)];

  return finalRelatedPosts;
};

export default getRelatedPosts;
