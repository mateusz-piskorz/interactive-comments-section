import { initTsrReactQuery } from '@ts-rest/react-query/v5';
// import { contract } from 'apps/shared/contract';
import { contract } from '../../../../shared/contract';

export const tsr = initTsrReactQuery(contract, {
  baseUrl: 'http://localhost:3001',
  credentials: 'include',
  // jsonQuery: true,
});
