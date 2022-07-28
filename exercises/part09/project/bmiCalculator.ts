export const calculateBmi = (height: number, weight: number): string => {
  const bmi = Math.round(weight / ( height / 100 ) ** 2 * 10) / 10

  var description = ''

  if (bmi < 16) {
    description = 'Underweight (Severe thinness)'
  } else if (bmi <= 16.9) {
    description = 'Underweight (Moderate thinness)'
  } else if (bmi <= 18.4) {
    description = 'Underweight (Mild thinness)'
  } else if (bmi <= 24.9) {
    description = 'Normal (healthy weight)'
  } else if (bmi <= 29.9) {
    description = 'Overweight (Pre-obese)'
  } else if (bmi <= 34.9) {
    description = 'Obese (Class I)'
  } else if (bmi <= 39.9) {
    description = 'Obese (Class II)'
  } else if (bmi >= 40.0) {
    description = 'Obese (Class III)'
  }

  return `BMI: ${bmi} | ${description}`
}

const parseArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments!')
  if (args.length > 4) throw new Error('Too many arguments!')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv)
    const bmi = calculateBmi(height, weight)
    console.log(bmi)
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
  }
}
