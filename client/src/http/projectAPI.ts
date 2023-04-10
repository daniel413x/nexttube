import { IProject, QueryResGetProject } from '@types';

import { $host } from './index';

export const fetchProjects = async (): Promise<QueryResGetProject> => {
  const { data } = await $host.get('api/projects');
  return data;
};

export const fetchProject = async (id: number | string): Promise<IProject> => {
  const { data } = await $host.get(`api/projects/${id}`);
  return data;
};
