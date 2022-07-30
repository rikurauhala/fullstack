import diagnoses from '../data/diagnoses';
import { Diagnosis } from '../types';

const addDiagnosis = () => {
  return null;
};

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  addDiagnosis,
  getEntries
};
