import patients from '../data/patients';
import { NonSensitivePatient, Patient } from '../types';

const addPatient = () => {
  return null;
};

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  addPatient,
  getPatients,
  getNonSensitivePatients
};
