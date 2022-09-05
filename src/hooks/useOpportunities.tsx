/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable camelcase */
import React, { createContext, useContext, useState } from 'react';

import 'sweetalert2/src/sweetalert2.scss';

import { OpportunitiesProviderProps, UseOpportunitiesHookData } from './types';

const OpportunitiesContext = createContext<UseOpportunitiesHookData>(
  {} as UseOpportunitiesHookData
);

export default function OpportunitiesProvider({ children }: OpportunitiesProviderProps) {
  const [opportunities, setOpportunities] = useState([]);

  async function registerNewOpportunitie() {
    console.log(opportunities);
  }

  return <OpportunitiesContext.Provider value={{}}>{children}</OpportunitiesContext.Provider>;
}

export function useOpportunities() {
  const context = useContext(OpportunitiesContext);
  return context;
}
