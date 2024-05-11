import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use HTTP base query.
const baseQuery = fetchBaseQuery({ baseUrl: '/api' });

// Define API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    getFolders: builder.query<Array<{id: number, name: string, parentId: number, type: 'folder' | 'file'}>, number>({
      query: (id) => ({url: `/folder?parentId=${id}`}),
    }),
  }),
});

export const { useGetFoldersQuery } = api;