import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from '../types';

let patientsInMemory = [...patients];

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const entry: Entry = { id: uuid(), ...newEntry };
  const updatedPatient = { ...patient, entries: patient.entries.concat(entry) };
  patientsInMemory = patientsInMemory.map(patient =>
    patient.id === updatedPatient.id 
      ? updatedPatient
      : patient
  );
  return updatedPatient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patient };
  patientsInMemory.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientsInMemory.find(patient => patient.id === id);
  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient => {
  return patientsInMemory.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPatients = (): Array<Patient> => {
  return patientsInMemory;
};

export default {
  addEntry,
  addPatient,
  findById,
  getNonSensitivePatients,
  getPatients
};
