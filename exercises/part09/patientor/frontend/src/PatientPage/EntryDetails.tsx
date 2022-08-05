import { HEALTHBAR_TEXTS } from '../constants';
import { useStateValue } from '../state';
import { Entry } from '../types';
import { assertNever } from '../utils';

const EntryDetails = ({ entry }: { entry: Entry }): JSX.Element => {
  const [{ diagnoses }] = useStateValue();
  const style = { 'paddingTop': '10px' };

  switch (entry.type) {
    case 'Hospital':
      return (
        <div style={style}>
          {entry.date} | Hospital
          <br/>
          <i>{entry.description}</i>
          <br/>
          Diagnosis by {entry.specialist}
          <br/>
          {entry.diagnosisCodes !== null &&
            <div>
              <span>Diagnoses:</span>
              <ul>
                {entry.diagnosisCodes?.map((diagnosis: string) => (
                  <li key={diagnosis}>{diagnosis} {diagnoses[diagnosis].name}</li>
                ))}
              </ul>
            </div>
          }
          Discharged on {entry.discharge.date} for reason: {entry.discharge.criteria}
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div style={style}>
          {entry.date} | Occupational healthcare | Employer: {entry.employerName}
          <br/>
          <i>{entry.description}</i>
          <br/>
          Diagnosis by {entry.specialist}
          {entry.diagnosisCodes !== undefined &&
            <div>
              <span>Diagnoses:</span>
              <ul>
                {entry.diagnosisCodes?.map((diagnosis: string) => (
                  <li key={diagnosis}>{diagnosis} {diagnoses[diagnosis].name}</li>
                ))}
              </ul>
            </div>
          }
          {entry.sickLeave !== undefined && 
            <div>Sick leave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</div>
          }
        </div>
      );
    case 'HealthCheck':
      return (
        <div style={style}>
          {entry.date} | Health check
          <br/>
          <i>{entry.description}</i>
          <br/>
          {entry.healthCheckRating === 0 && <span>{HEALTHBAR_TEXTS[0]}</span>}
          {entry.healthCheckRating === 1 && <span>{HEALTHBAR_TEXTS[1]}</span>}
          {entry.healthCheckRating === 2 && <span>{HEALTHBAR_TEXTS[2]}</span>}
          {entry.healthCheckRating === 3 && <span>{HEALTHBAR_TEXTS[3]}</span>}
          <br/>
          Diagnosis by {entry.specialist}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
