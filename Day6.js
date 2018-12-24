const safestCoordinate = (coordinates) => {
	const sizeX = Math.max.apply(null, coordinates.map(a => a.x));
	const sizeY = Math.max.apply(null, coordinates.map(a => a.y));
	let grid = new Array(sizeX + 1).fill(0).map(a => new Array(sizeY + 1));
	let events = addLetterId(coordinates);
	const maxDistanceForSafeArea = 10000;
	const res = {};
	let safeAreaZone = 0;
	for (let x = 0; x <= sizeX; x++) {
		for (let y = 0; y <= sizeY; y++) {
			const closestCoordinate = calculateClosestPoint( {x, y}, events);
			grid[x][y] = closestCoordinate.id;
			res[closestCoordinate.id] = closestCoordinate;
			if (isInTheBorder(x, y, sizeX, sizeY)) {
				res[closestCoordinate.id].isInfinite = true;
			}
			if (closestCoordinate.distanceAllPoints < maxDistanceForSafeArea) {
				safeAreaZone++;
			}
		}
	}
	return {
		grid: grid,
		res: res,
		safeAreaZone: safeAreaZone
	}
}

const isInTheBorder = (x, y, sizeX, sizeY) => (x === 0 || y === 0 || x === sizeX || y === sizeY)

const calculateClosestPoint = ( {x: x, y: y}, coordinates) => {
	let minDistance = Infinity;
	let closestCoordinate;
	let equalDistance = false;
	let distanceAllPoints = 0;
	for (let coordinate of coordinates) {
		let distance = calculateDistance({ x, y }, { ...coordinate });
		distanceAllPoints += distance;
		if (distance < minDistance) {
			minDistance = distance;
			closestCoordinate = coordinate;
			equalDistance = false;
		} else if (distance === minDistance) {
			equalDistance = true;
		}
	}
	if (equalDistance) {
		return { 
			id: 'DOT',
			distanceAllPoints: distanceAllPoints 
		}
	} else {
		closestCoordinate.totalZones = closestCoordinate.totalZones + 1 || 1;
		return { ...closestCoordinate, distanceAllPoints: distanceAllPoints };
	}
}

const calculateDistance = ({x: x1, y: y1}, {x: x2, y: y2},) => Math.abs(x1 - x2) + Math.abs(y1 - y2) 

const addLetterId = (coordinates) => {
	let letterId = 'A';
	const res = [];
	for (let coordinate of coordinates) {
			res.push({...coordinate, id: letterId});
			letterId = String.fromCharCode(letterId.charCodeAt(0) + 1);
	}
	return res;
}