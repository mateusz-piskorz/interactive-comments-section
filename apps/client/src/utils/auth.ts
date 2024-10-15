import { tsr } from './ts-client';

export const getAuth = async () => {
  const response = await tsr.auth.getAuth.mutate();

  if (response.status !== 201) {
    return undefined;
  }

  return response.body;
};
