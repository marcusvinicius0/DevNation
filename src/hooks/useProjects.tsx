/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable camelcase */
import React, { createContext, useContext, useState } from 'react';

import 'sweetalert2/src/sweetalert2.scss';

import { ProjectsProviderProps, UseProjectsHookData } from './types';

const ProjectsContext = createContext<UseProjectsHookData>({} as UseProjectsHookData);

export default function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [projects, setProjects] = useState([]);

  async function registerNewProject() {
    console.log(projects);
  }

  return <ProjectsContext.Provider value={{}}>{children}</ProjectsContext.Provider>;
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  return context;
}
