<script>
	export let input_date;
	export let updated;
	export let short = false;
	export let style;

	const date = new Date(input_date);
	const date_string =
		short || date.getFullYear() === new Date().getFullYear()
			? date.toLocaleDateString(undefined, {
					month: 'short',
					day: 'numeric'
			  })
			: date.toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
			  });
</script>

<time datetime={date} {style}>
	{date_string}{#if updated} updated at {updated}{/if}
</time>

<style>
	time {
		font-family: 'PT Sans', 'Helvetica Neue', Arial, sans-serif;
		color: var(--grayed-text);
		position: absolute;
		top: 0;
		text-transform: uppercase;
	}
</style>
