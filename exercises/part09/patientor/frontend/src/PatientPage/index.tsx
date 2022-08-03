import { useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
//import { Box, Table, Button, TableHead, Typography } from "@material-ui/core";

//import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
//import AddPatientModal from "../AddPatientModal";
import { PatientWithEntries } from "../types";
import { apiBaseUrl } from "../constants";
//import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
//import { TableCell } from "@material-ui/core";
//import { TableRow } from "@material-ui/core";
//import { TableBody } from "@material-ui/core";

const PatientPage = () => {
  const [{ selectedPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPatient = async () => {
      try {
        const { data: patient } = await axios.get<PatientWithEntries>(
          `${apiBaseUrl}/patients/${id || "0"}`
        );
        dispatch({ type: "GET_PATIENT", payload: patient });
      } catch (e) {
        console.error(e);
      }
    };
    void getPatient();
  }, [dispatch]);

  return (
    <div>
     <h3>{selectedPatient.name}</h3>
    </div>
  );
};

export default PatientPage;
