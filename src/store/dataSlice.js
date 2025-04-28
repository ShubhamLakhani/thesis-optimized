import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    extractedData: [],
    filteredData: [],
    isLoading: false
  },
  reducers: {
    setExtractedData: (state, action) => {
        console.log({ action: action.payload });
      state.extractedData = action.payload
      // state.filteredData = action.payload
      state.isLoading = false
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload
      state.isLoading = false
    },
    setIsLoading: (state, action) => {
        state.isLoading = action.payload;
    },
  },
})

export const { setExtractedData, setFilteredData, setIsLoading } = dataSlice.actions

export default dataSlice.reducer    