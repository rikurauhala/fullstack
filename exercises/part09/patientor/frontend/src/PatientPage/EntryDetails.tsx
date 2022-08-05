import { useStateValue } from "../state";
import { Entry } from '../types';

const EntryDetails = ({ entry }: { entry: Entry }): JSX.Element => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div key={entry.id}>
      {entry.date} <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map((diagnosis: string) => (
          <li key={diagnosis}>{diagnosis} {diagnoses[diagnosis].name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EntryDetails;
