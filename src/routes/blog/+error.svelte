<script>
	import { page } from '$app/stores';
</script>

<p>I'm not sure how you got here. But here's where I think you should go!</p>
<ul>
	<li><a href="/">Home</a></li>
</ul>

<sub>
	<h2>{$page.status}</h2>
	<p>{$page.error.message}</p>
</sub>
