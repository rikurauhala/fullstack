import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Patient, PatientWithEntries, Gender } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  selectedPatient: PatientWithEntries;
  diagnoses: { [id: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  selectedPatient: {
    name: "",
    dateOfBirth: "",
    ssn: "",
    gender: Gender.Other,
    occupation: "",
    entries: [ ],
    id: ""
  },
  diagnoses: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
