interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const total = hours.reduce((total, hours) => total + hours, 0)

  const periodLength = hours.length
  const trainingDays = hours.filter(hour => hour > 0).length
  let success = false
  let rating = -1
  let ratingDescription = ''
  const average = Math.round(total / periodLength * 10) / 10

  if (average >= target) {
    success = true
    rating = 3
    ratingDescription = '3/3 - Well done!'
  } else if (average >= target / 2) {
    rating = 2
    ratingDescription = '2/3 - You got this!'
  } else {
    rating = 1
    ratingDescription = '1/3 - Try harder!'
  }

  const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }

  return result
}

const hours = [3, 0, 2, 4.5, 0, 3, 1]
const target = 2
const result = calculateExercises(hours, target)
console.log(result)
