import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use HTTP base query.
const baseQuery = fetchBaseQuery({ baseUrl: '/api' });

// Define API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ["folders"],
  endpoints: (builder) => ({
    getFolders: builder.query<Array<{id: number, name: string, parentId: number, type: 'folder' | 'file'}>, number>({
      query: (id) => ({url: `/folder?parentId=${id}`}),
      providesTags: ["folders"]
    }),
    addFolder: builder.mutation<void, {parentId: number, name: string}>({
      query: (args) => ({url: '/folder', method: 'POST', body: args}),
      invalidatesTags: ["folders"],
    }),
    getFile: builder.query<{id: number, name: string, parentId: number, file: string}, number>({
      queryFn: async (id) => {
        try {
          const res = await fetch(`/api/file?id=${id}`);
          const data = await res.json();
          // Convert file data from base64 to ascii/utf-8.
          return {data: {id: data.id, name: data.name, parentId: data.parentId, file: atob(data.file)}};
        } catch (error) {
          console.error(error);
          return {error: {status: 500, data: undefined}};
        }
      }
    }),
    addFile: builder.mutation<void, {parentId: number, file: File}>({
      query: (args) => {
        const formData = new FormData();
        formData.append('parentId', args.parentId.toString());
        formData.append('file', args.file);
        return {
          url: '/file',
          method: 'POST',
          body: formData
        };
      },
      invalidatesTags: ["folders"]
    })
  }),
});

export const { useGetFoldersQuery, useAddFolderMutation, useAddFileMutation, useGetFileQuery } = api;