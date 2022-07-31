import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
};

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  addPatient,
  getPatients,
  getNonSensitivePatients
};
