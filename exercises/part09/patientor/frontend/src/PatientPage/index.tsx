import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

import EntryDetails from './EntryDetails';
import { Entry, PatientWithEntries } from '../types';
import { apiBaseUrl } from '../constants';
import { getPatientWithEntries, useStateValue } from '../state';

import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPage = () => {
  const [{ diagnoses, selectedPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

  useEffect(() => {
    const getPatient = async () => {
      try {
        const { data: patient } = await axios.get<PatientWithEntries>(
          `${apiBaseUrl}/patients/${id || '0'}`
        );
        dispatch(getPatientWithEntries(patient));
      } catch (e) {
        console.error(e);
      }
    };
    void getPatient();
  }, [dispatch]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const data = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id || 0}/entries`,
        values
      );
      console.log(data);
      //dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
      } else {
        console.error('Unknown error', e);
      }
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      <Button variant='contained' onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
