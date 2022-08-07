import { useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

import EntryDetails from './EntryDetails';
import { Entry, PatientWithEntries } from "../types";
import { apiBaseUrl } from "../constants";
import { getPatientWithEntries, useStateValue } from "../state";

const PatientPage = () => {
  const [{ diagnoses, selectedPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPatient = async () => {
      try {
        const { data: patient } = await axios.get<PatientWithEntries>(
          `${apiBaseUrl}/patients/${id || "0"}`
        );
        dispatch(getPatientWithEntries(patient));
      } catch (e) {
        console.error(e);
      }
    };
    void getPatient();
  }, [dispatch]);

  return (
    <div>
      <h2>{selectedPatient.name}</h2>
      <p>gender: {selectedPatient.gender}</p>
      <p>ssn: {selectedPatient.ssn}</p>
      <p>occupation: {selectedPatient.occupation}</p>
      {(selectedPatient.entries.length > 0 && Object.keys(diagnoses).length > 0) &&
        <div>
          <h3>Entries</h3>
          {selectedPatient.entries.map((entry: Entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
      }
    </div>
  );
};

export default PatientPage;