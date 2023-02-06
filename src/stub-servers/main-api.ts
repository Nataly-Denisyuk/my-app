import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import process from 'process'
//import { TableOptions } from 'types'

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.STUB_API ||
      'https://inАco-ps-config-file.ds5-genr02-inco-default.apps.ds5-genr02.corp.dev.vtb',
  }),
  endpoints: builder => ({
    getMain: builder.query({
      query: requestBody => ({
        // endpoint not exist in spec
        url: '/main',
        body: requestBody,
      }),
    }),
  }), // queries to backend
})

export const { useGetMainQuery } = mainApi