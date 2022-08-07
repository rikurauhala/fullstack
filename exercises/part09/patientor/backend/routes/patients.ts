import express from 'express';
import patientService from '../services/patientService';
import { NewEntry } from '../types';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send('Not found');
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);
  console.log(req.params.id);
  if (!patient) {
    res.status(404).send('Patient not found');
  } else {
    try {
      //const newEntry = toNewEntry(req.body);
      const newEntry: NewEntry = req.body;
      const updatedPatient = patientService.addEntry(patient, newEntry);
      res.json(updatedPatient);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) errorMessage += ' Error: ' + error.message;
      res.status(400).send(errorMessage);
    }
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) errorMessage += ' Error: ' + error.message;
    res.status(400).send(errorMessage);
  }
});

export default router;
