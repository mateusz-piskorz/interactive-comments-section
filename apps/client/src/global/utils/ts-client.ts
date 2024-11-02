import { initTsrReactQuery } from '@ts-rest/react-query/v5';
// import { contract } from 'apps/shared/contract';
import { contract } from '../../../../shared/contract';
const SERVER_URL_BASE =
  import.meta.env.REACT_APP_BACKEND_SERVER_URL || 'http://localhost:3001';

export const tsr = initTsrReactQuery(contract, {
  baseUrl: SERVER_URL_BASE,
  credentials: 'include',
});
