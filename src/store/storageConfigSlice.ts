import { createSlice } from '@reduxjs/toolkit';
import {
  CONNECTOR_TYPE_CUSTOM,
  CONNECTOR_TYPE_GLOBAL,
} from '../consts/connectors';
import * as t from '../types';
// import { GeneralInformation } from '../components/priv-config/GeneralInformation';
import { storageApi } from './api';

const storageConfigApiSlice = storageApi.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.query<string, string>({
      // query: (token) => ({
      //   url: 'configuration/token',
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) => ({ data: 'token' }),
      providesTags: ['apiToken'],
    }),
    resetToken: builder.mutation<string, string>({
      // query: (token) => ({
      //   url: `configuration/token/reset`,
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) =>
        new Promise((resolve) => setTimeout(resolve, 1000)).then((_) => ({
          data: 'new_token',
        })),
      invalidatesTags: ['apiToken'],
    }),
    getConnectors: builder.query<Array<t.Connector>, string>({
      // query: (token) => ({
      //   url: '/configuration/connectors',
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      // transformResponse: (response: Array<t.ConnectorPayload>, meta, arg): Array<t.Connector> =>
      //   response.map(r => {
      //     switch (r.typ) {
      //       case 'todo': return { type: GLOBAL_CONNECTOR_TYPE, id: r.id, name: r.name, settings: { type: r.typ, config: r.config || '' } }
      //       default: return { type: CUSTOM_CONNECTOR_TYPE, id: r.id, name: r.name }
      //     }
      //   })
      queryFn: (arg, queryApi, extraOptions, baseQuery) => ({
        data: [
          { type: CONNECTOR_TYPE_CUSTOM, id: '1', name: 'conn 1' },
          { type: CONNECTOR_TYPE_CUSTOM, id: '2', name: 'conn 2' },
        ],
      }),
      providesTags: ['connectors'],
    }),
    createConnector: builder.mutation<
      { id: string },
      [string, t.CreateConnectorPayload]
    >({
      // query: (token, body) => ({
      //   url: `configuration/connectors`,
      //   method: 'POST',
      //   body,
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) =>
        new Promise((resolve) => setTimeout(resolve, 1000)).then((_) => ({
          data: { id: '1' },
        })),
      invalidatesTags: ['connectors'],
    }),
    getConnector: builder.query<t.Connector, [string, string]>({
      // query: ([token, id]) => ({
      //   url: `/configuration/connector/${id}`,
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      // transformResponse: (r: t.ConnectorPayload, meta, arg): t.Connector => {
      //   switch (r.typ) {
      //     case 'todo': return { type: GLOBAL_CONNECTOR_TYPE, id: r.id, name: r.name, settings: { type: r.typ, config: r.config || '' } }
      //     default: return { type: CUSTOM_CONNECTOR_TYPE, id: r.id, name: r.name }
      //   }
      // }
      queryFn: (arg, queryApi, extraOptions, baseQuery) => ({
        // data: { type: CONNECTOR_TYPE_CUSTOM, id: '1', name: 'conn 1' },
        data: {
          type: CONNECTOR_TYPE_GLOBAL,
          id: '1',
          name: 'global conn 1',
          settings: { type: 'todo', config: '{test: 1}' },
        },
      }),
      providesTags: ['connectors', 'connectorToken'],
    }),
    getConnectorToken: builder.query<string, [string, string]>({
      // query: ([token, id]) => ({
      //   url: `configuration/connectors/${id}/token`,
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) => ({ data: 'token' }),
      providesTags: ['connectorToken'],
    }),
    resetConnectorToken: builder.mutation<string, [string, string]>({
      // query: ([token, id]) => ({
      //   url: `configuration/connectors/${id}/token`,
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // }),
      queryFn: (arg, queryApi, extraOptions, baseQuery) =>
        new Promise((resolve) => setTimeout(resolve, 1000)).then((_) => ({
          data: 'new_token',
        })),
      invalidatesTags: ['connectorToken'],
    }),
  }),
});

export const {
  useGetTokenQuery,
  useResetTokenMutation,
  useGetConnectorsQuery,
  useCreateConnectorMutation,
  useGetConnectorQuery,
  useGetConnectorTokenQuery,
  useResetConnectorTokenMutation,
} = storageConfigApiSlice;

type State = {};

const initialState: State = {};

export const storageConfigSlice = createSlice({
  name: 'storageConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const selectPrivSelectors = (token: string) =>
//   createSelector(
//     storageConfigSlice.endpoints.getPrivacyScopeDimenstions.select(token),
//     (res) =>
//       res.data?.data_categories.filter((dc) => !dataCategories.includes(dc))
//   );

// export const selectNewPrivSelectors = (state: RootState) =>
//   state.privConfig.newPrivSelectors;
