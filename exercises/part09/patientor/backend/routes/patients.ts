import express from 'express';
import patientService from '../services/patientService';
import { NewPatient, PatientFields } from '../types';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    const patientFields: PatientFields = req.body;
    const newPatient: NewPatient = toNewPatient(patientFields);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) errorMessage += ' Error: ' + error.message;
    res.status(400).send(errorMessage);
  }
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
  if (!patient) {
    res.status(404).send('Patient not found');
  } else {
    try {
      const newEntry = toNewEntry(req.body);
      const updatedPatient = patientService.addEntry(patient, newEntry);
      res.json(updatedPatient);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) errorMessage += ' Error: ' + error.message;
      res.status(400).send(errorMessage);
    }
  }
});

export default router;
