import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'Malformatted parameters!' });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({ weight, height, bmi });
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
  /* eslint-disable */
  const target = Number(req.body.target);
  const hours = req.body.exercises;

  if (!target || !hours) {
    return res.status(400).json({ error: 'Parameters missing!' });
  }

  const containsNaN = hours.filter((hour: number) => !isNaN(hour)).length !== hours.length;

  if (isNaN(target) || containsNaN) {
    return res.status(400).json({ error: 'Malformatted parameters!' });
  }

  return res.json(calculateExercises(hours, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
