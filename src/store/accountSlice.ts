import { createSlice, createSelector } from '@reduxjs/toolkit';
import { api } from './api';

type AccountState = {};

const initialState: AccountState = {};

const accountApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getInfo: builder.query<{}, any>({
      query: () => ({
        url: 'account',
        method: 'GET',
      }),
      // ransformResponse: (response, meta, arg) => response
    }),
  }),
});

export const { useGetInfoQuery } = accountApiSlice;

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const { } = accountSlice.actions

export const selectAccountInfo = (token: string) =>
  createSelector(
    accountApiSlice.endpoints.getInfo.select(undefined),
    (res) => res.data
  );

export default accountSlice.reducer;
