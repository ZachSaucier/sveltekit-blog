export const dateParser = (input_date) => {
	const date = new Date(input_date);
	const date_string =
		date.getFullYear() === new Date().getFullYear()
			? date.toLocaleDateString(undefined, {
					month: 'short',
					day: 'numeric'
			  })
			: date.toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
			  });
	return {
		date,
		date_string
	};
};

export default dateParser;
