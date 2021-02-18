const getDataFrom = async (url) => {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}. ${res.status}`);
	}
	return await res.json();
};


const postDataTo = async (url, data) => {
	const json = JSON.stringify(data);
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: json
	});
	return await res.json();
};

export { getDataFrom, postDataTo };