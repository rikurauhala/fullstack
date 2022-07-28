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
  const total = hours.reduce((total, hours) => total + hours, 0);

  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour > 0).length;
  let success = false;
  let rating = -1;
  let ratingDescription = '';
  const average = Math.round(total / periodLength * 10) / 10;

  if (average >= target) {
    success = true;
    rating = 3;
    ratingDescription = '3/3 - Well done!';
  } else if (average >= target / 2) {
    rating = 2;
    ratingDescription = '2/3 - You got this!';
  } else {
    rating = 1;
    ratingDescription = '1/3 - Try harder!';
  }

  const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };

  return result;
};

interface ParsedArguments {
  target: number,
  hours: Array<number>
}

const parse = (args: Array<string>): ParsedArguments => {
  if (args.length < 4) throw new Error('Not enough arguments!');

  const target = Number(args[2]);
  const hours = args.slice(3).map(hour => Number(hour));
  const containsNaN = hours.filter(hour => !isNaN(hour)).length !== hours.length;

  if (!isNaN(target) && !containsNaN) {
    return {
      target,
      hours
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { target, hours } = parse(process.argv);
  const exercises = calculateExercises(hours, target);
  console.log(exercises);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
