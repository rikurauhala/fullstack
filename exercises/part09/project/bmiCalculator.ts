const calculateBmi = (height: number, weight: number) : string => {
  const bmi = Math.round(weight / ( height / 100 ) ** 2 * 10) / 10;

  var description = '';

  if (bmi < 16) {
    description = 'Underweight (Severe thinness)';
  } else if (bmi <= 16.9) {
    description = 'Underweight (Moderate thinness)';
  } else if (bmi <= 18.4) {
    description = 'Underweight (Mild thinness)';
  } else if (bmi <= 24.9) {
    description = 'Normal (healthy weight)';
  } else if (bmi <= 29.9) {
    description = 'Overweight (Pre-obese)';
  } else if (bmi <= 34.9) {
    description = 'Obese (Class I)';
  } else if (bmi <= 39.9) {
    description = 'Obese (Class II)';
  } else if (bmi >= 40.0) {
    description = 'Obese (Class III)';
  }

  return `BMI: ${bmi} | ${description}`;
}

console.log(calculateBmi(180, 74));
