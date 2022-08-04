import { useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

import { PatientWithEntries } from "../types";
import { apiBaseUrl } from "../constants";
import { getPatientWithEntries, useStateValue } from "../state";

const PatientPage = () => {
  const [{ selectedPatient }, dispatch] = useStateValue();
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
      <h3>{selectedPatient.name}</h3>
      <p>gender: {selectedPatient.gender}</p>
      <p>ssn: {selectedPatient.ssn}</p>
      <p>occupation: {selectedPatient.occupation}</p>
    </div>
  );
};

export default PatientPage;
