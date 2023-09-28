import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'user',
  initialState: {
    sitename: 'Runmix'
  },
  reducers: {
    updateSiteName: (state, action) => ({
      ...state,
      sitename: action.payload
    })
  }
})

export const { updateSiteName} = homeSlice.actions

export default homeSlice