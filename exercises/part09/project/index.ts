import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "Malformatted parameters!" });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({ weight, height, bmi });
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
