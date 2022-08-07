import {
  BaseEntryFields,
  Diagnosis,
  Discharge,
  EntryFields,
  EntryType,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
  NewPatient,
  PatientFields,
  SickLeave
} from './types';

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const isArrayOfStrings = (param: any[]): param is Array<string> => {
  return !param.some(item => !isString(item));
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error('Incorrect or missing name');
  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) throw new Error('Incorrect or missing social security number');
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing social security number');
  }
  return occupation;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const toNewPatient = (props: PatientFields): NewPatient => {
  const { name, dateOfBirth, ssn, gender, occupation } = props;
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
  return newPatient;
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) throw new Error('Incorrect or missing type: ' + type);
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) throw new Error('Incorrect or missing description');
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) throw new Error('Incorrect or missing specialist');
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis codes');
  }
  return diagnosisCodes;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) throw new Error('Incorrect or missing criteria');
  return criteria;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) throw new Error('Missing discharge');
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) throw new Error('Incorrect or missing employer');
  return employerName;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) throw new Error('Missing sick leave');
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  };
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing Health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

export const toNewBaseEntry = (props: BaseEntryFields): NewBaseEntry => {
  const { type, description, date, specialist, diagnosisCodes } = props;
  const newBaseEntry = {
    type: parseType(type),
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
  };
  return newBaseEntry;
};

export const toNewEntry = (newEntry: EntryFields): NewEntry => {
  const newBaseEntry = toNewBaseEntry(newEntry) as NewEntry;
  switch (newBaseEntry.type) {
    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        discharge: parseDischarge(newEntry.discharge)
      };
    case EntryType.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        employerName: parseEmployerName(newEntry.employerName),
        sickLeave: parseSickLeave(newEntry.sickLeave)
      };
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(newEntry.healthCheckRating),
      };
    default:
      return assertNever(newBaseEntry);
  }
};
