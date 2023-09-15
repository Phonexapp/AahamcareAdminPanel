import { createSlice } from '@reduxjs/toolkit';

const INTIAL_STATE = {
  allOldageHomes: [],
  loading: false,
  oldageHome: {}
};

const oldAgeHomeSlice = createSlice({
  name: 'oldageHome',
  initialState: INTIAL_STATE,

  reducers: {
    getOldageHomes: (state, action) => {
      state.allOldageHomes = action.payload;
    },

    getById : (state,action)=>{
      state.oldageHome = action.payload;
    }
  },
});

export const { getOldageHomes, getById } = oldAgeHomeSlice.actions;
export default oldAgeHomeSlice.reducer;
