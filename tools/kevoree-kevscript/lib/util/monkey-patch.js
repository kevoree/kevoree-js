function hash(str) {
	let val = 0;
	if (str.length === 0) {
		return val + '';
	}
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		val = ((val<<5) - val) + char;
		val = val & val; // Convert to 32bit integer
	}
	return (val & 0xfffffff) + '';
}

function bindingHash(binding) {
	const hubPath = binding.hub ? binding.hub.path() : 'UNDEFINED';
	const portPath = binding.port ? binding.port.path() : 'UNDEFINED';
	return hash(hubPath + '_' + portPath);
}

function monkeyPatch(model) {
	model.mBindings.array.forEach((binding) => {
		binding.generated_KMF_ID = bindingHash(binding);
	});
}

module.exports = monkeyPatch;
