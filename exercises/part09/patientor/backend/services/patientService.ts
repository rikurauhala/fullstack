import patients from '../data/patients';
import { Patient } from '../types';

const addPatient = () => {
  return null;
};

const getEntries = (): Array<Patient> => {
  return patients;
};

export default {
  addPatient,
  getEntries
};
