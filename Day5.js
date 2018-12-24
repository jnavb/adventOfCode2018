const areReactive = (str1, str2) => ((str1.toLowerCase() === str1 && str2 === str1.toUpperCase()) || (str2 === str1.toLowerCase() && str1 === str2.toUpperCase()))

const reactRecursive = (polymer, position) => {
	if (typeof position === 'undefined') return react(polymer, 0);
	if (position === polymer.length) return polymer;


	if (areReactive(polymer.charAt(position), polymer.charAt(position + 1))) {
		return react(polymer.substring(0, position) + polymer.slice(position + 2, polymer.length), position - 1);
	} else {
		return react(polymer, position + 1);
	}
}

const react = (polymer) => {
	let position = 0;
	let res = polymer;
	while (position < res.length && res.length > 0) {
		if (areReactive(res.charAt(position), res.charAt(position + 1))) {
			res = res.substring(0, position) + res.slice(position + 2, res.length);
			position = position - 1;
		} else {
			position = position + 1;
		}
	}
	return {
		remainPolymer: res,
		length: res.length
	}
}

const improveReaction = (polymer) => {
	const alphabet = genCharArray('a', 'z');
	const res = {};
	alphabet.forEach(letter => {
		const letterUppAndLower = new RegExp(letter, 'gi');
		const polymerWithoutLetter = polymer.replace(letterUppAndLower, '');
		res[letter] = react(polymerWithoutLetter); 
	});
	return res.sort((value1, value2) => (value1.length === value2.length) ? 0: (value1.length < value2.length) ? -1 : 1 );
}

const genCharArray = (charA, charZ) => {
	let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
	for (; i <= j; ++i) {
			a.push(String.fromCharCode(i));
	}
	return a;
}