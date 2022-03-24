export const stateToPath = (state) => {
	let searchParams = new URLSearchParams(state);
	window.history.pushState(
		null,
		'',
		`${window.location.pathname}?${searchParams.toString()}`
	);
};

export const stateFromPath = () => {
	let searchParams = new URLSearchParams(window.location.search);
	const stateFromParams = {}
	for (let [key, val] of searchParams) {
		stateFromParams[key] = val;
	}
	return stateFromParams;
};