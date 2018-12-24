const createNodes = (input) => {
	const nodes = {};
	for (let instruction of input) {
		let stepToFinish = instruction.substring(5, 6);
		let stepId = instruction.substring(36, 37);
		if (!nodes[stepId]) {
			let mustBeFinished = new Set();
			mustBeFinished.add(stepToFinish);
			nodes[stepId] = {
				mustBeFinished: mustBeFinished
			};
		} else {
			nodes[stepId].mustBeFinished.add(stepToFinish);
		}
		if (!nodes[stepToFinish]) {
			nodes[stepToFinish] = {};
			nodes[stepToFinish].mustBeFinished = new Set();
		}
	}

	return nodes;
}

const buildTheThing = (input, workers, stepTime) => {
	let availableWorkers = new Array(workers).fill(0);
	let orderOfSteps = '';
	let nodes = input;
	let buildTime = 0;

	while (true) {
		let availableSteps = getAvailableSteps(nodes);
		console.log(availableSteps)
		if (availableSteps) {
			let workPlan = distributeWork(availableWorkers, availableSteps, stepTime);
			availableWorkers = workPlan.workers;
			orderOfSteps += workPlan.stepsStarted;
			nodes = Object.assign({}, notifyStepStarted(nodes, workPlan.stepsStarted));

			availableWorkers.sort();
			let smallestTime = Infinity;
			for (let [index, timeToIdle] of availableWorkers.entries()) {
				if (!timeToIdle && timeToIdle < smallestTime) {
					smallestTime = timeToIdle;
				}
				else break;
			}
			availableWorkers = substractTime(availableWorkers, smallestTime);
			buildTime = buildTime + smallestTime;
			orderOfSteps

		} else return {
			order: orderOfSteps,
			buildTime: buildTime
		};
	}
}

const substractTime = (availableWorkers, time) => availableWorkers.map(value => (value) ? value - time : value)

const distributeWork = (availableWorkers, availableSteps, stepTime) => {
	let workers = availableWorkers;
	let stepsStarted = '';
	let indexSteps = 0;
	const charOffset = 64;
	for (let [index, timeToIdle] of workers.entries()) {
		if (!timeToIdle && availableSteps[indexSteps]) {
			workers[index] = availableSteps[indexSteps].charCodeAt(0) - charOffset + stepTime;
			stepsStarted += availableSteps[indexSteps];
			indexSteps++;
		}
	}
	return { 
		workers: workers,
		stepsStarted: stepsStarted
	}
}

const getAvailableSteps = (nodes) => {
	if (!Object.keys(nodes).length) return;
	let lowerLetter = [];
	for (node in nodes) {
		if (!nodes[node].mustBeFinished.size) {
			lowerLetter.push(node);
		}
	}
	lowerLetter.sort((a,b) => (a >= b) ? 1 : -1);
	return lowerLetter;
}

const notifyStepStarted = (nodes, nextSteps) => {
	let res = Object.assign({}, nodes);
	let steps = nextSteps.split('');
	for (step of steps) {
		delete res[step];
		for (node in res) {
			res[node].mustBeFinished.delete(step);
		}
	}
	return res;
}

const main = () => buildTheThing(createNodes(input, 5, 60));
const test = () => buildTheThing(createNodes(testData, 2, 0));

const testData = [
	'Step C must be finished before step A can begin.',
	'Step C must be finished before step F can begin.',
	'Step A must be finished before step B can begin.',
	'Step A must be finished before step D can begin.',
	'Step B must be finished before step E can begin.',
	'Step D must be finished before step E can begin.',
	'Step F must be finished before step E can begin.'
];

const input = [
	'Step J must be finished before step E can begin.',
	'Step X must be finished before step G can begin.',
	'Step D must be finished before step A can begin.',
	'Step K must be finished before step M can begin.',
	'Step P must be finished before step Z can begin.',
	'Step F must be finished before step O can begin.',
	'Step B must be finished before step I can begin.',
	'Step U must be finished before step W can begin.',
	'Step A must be finished before step R can begin.',
	'Step E must be finished before step R can begin.',
	'Step H must be finished before step C can begin.',
	'Step O must be finished before step S can begin.',
	'Step Q must be finished before step Y can begin.',
	'Step V must be finished before step W can begin.',
	'Step T must be finished before step N can begin.',
	'Step S must be finished before step I can begin.',
	'Step Y must be finished before step W can begin.',
	'Step Z must be finished before step C can begin.',
	'Step M must be finished before step L can begin.',
	'Step L must be finished before step W can begin.',
	'Step N must be finished before step I can begin.',
	'Step I must be finished before step G can begin.',
	'Step C must be finished before step G can begin.',
	'Step G must be finished before step R can begin.',
	'Step R must be finished before step W can begin.',
	'Step Z must be finished before step R can begin.',
	'Step Z must be finished before step N can begin.',
	'Step G must be finished before step W can begin.',
	'Step L must be finished before step G can begin.',
	'Step Y must be finished before step R can begin.',
	'Step P must be finished before step I can begin.',
	'Step C must be finished before step W can begin.',
	'Step T must be finished before step G can begin.',
	'Step T must be finished before step R can begin.',
	'Step V must be finished before step Z can begin.',
	'Step L must be finished before step C can begin.',
	'Step K must be finished before step I can begin.',
	'Step J must be finished before step I can begin.',
	'Step Q must be finished before step C can begin.',
	'Step F must be finished before step A can begin.',
	'Step H must be finished before step Y can begin.',
	'Step M must be finished before step N can begin.',
	'Step P must be finished before step H can begin.',
	'Step M must be finished before step C can begin.',
	'Step V must be finished before step Y can begin.',
	'Step O must be finished before step V can begin.',
	'Step O must be finished before step Q can begin.',
	'Step A must be finished before step G can begin.',
	'Step T must be finished before step Z can begin.',
	'Step K must be finished before step R can begin.',
	'Step H must be finished before step O can begin.',
	'Step O must be finished before step Y can begin.',
	'Step O must be finished before step C can begin.',
	'Step K must be finished before step P can begin.',
	'Step P must be finished before step F can begin.',
	'Step E must be finished before step M can begin.',
	'Step M must be finished before step I can begin.',
	'Step T must be finished before step W can begin.',
	'Step P must be finished before step L can begin.',
	'Step A must be finished before step O can begin.',
	'Step X must be finished before step V can begin.',
	'Step S must be finished before step G can begin.',
	'Step A must be finished before step Y can begin.',
	'Step J must be finished before step R can begin.',
	'Step K must be finished before step F can begin.',
	'Step J must be finished before step A can begin.',
	'Step P must be finished before step C can begin.',
	'Step E must be finished before step N can begin.',
	'Step F must be finished before step Y can begin.',
	'Step J must be finished before step D can begin.',
	'Step H must be finished before step Z can begin.',
	'Step U must be finished before step H can begin.',
	'Step J must be finished before step T can begin.',
	'Step V must be finished before step G can begin.',
	'Step Z must be finished before step I can begin.',
	'Step H must be finished before step W can begin.',
	'Step B must be finished before step R can begin.',
	'Step F must be finished before step B can begin.',
	'Step X must be finished before step C can begin.',
	'Step L must be finished before step R can begin.',
	'Step F must be finished before step U can begin.',
	'Step D must be finished before step N can begin.',
	'Step P must be finished before step O can begin.',
	'Step B must be finished before step O can begin.',
	'Step F must be finished before step C can begin.',
	'Step H must be finished before step L can begin.',
	'Step O must be finished before step N can begin.',
	'Step J must be finished before step Y can begin.',
	'Step H must be finished before step N can begin.',
	'Step O must be finished before step L can begin.',
	'Step I must be finished before step W can begin.',
	'Step J must be finished before step H can begin.',
	'Step D must be finished before step Z can begin.',
	'Step F must be finished before step W can begin.',
	'Step X must be finished before step W can begin.',
	'Step Y must be finished before step M can begin.',
	'Step T must be finished before step M can begin.',
	'Step U must be finished before step G can begin.',
	'Step L must be finished before step I can begin.',
	'Step N must be finished before step W can begin.',
	'Step E must be finished before step C can begin.'
]