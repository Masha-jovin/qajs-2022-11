
/** Object "scores" contains scores */
const scores = {
Anna: 10,
Olga: 1,
Ivan: 5,
Marfa: 15
}

const sumScores=getScore(scores)

/** function "getScore" returns the sum of scores from object "scores" */
function getScore(scores) {
	let sum=0
	for (const key in scores) {
		sum=sum+scores[key]
	}
	return sum
}

console.log('sumScores =',sumScores)

