import { createSlice } from '@reduxjs/toolkit';

const INTIAL_STATE = {
  orphanges: [],
  loading: false,
  orphange: {}
};

const orphanageSlice = createSlice({
  name: 'orphanage',
  initialState: INTIAL_STATE,

  reducers: {
    getOrphanges: (state, action) => {
      state.orphanges = action.payload;
    },

    getById : (state,action)=>{
      state.orphange = action.payload;
    }
  },
});

export const { getOrphanges, getById } = orphanageSlice.actions;
export default orphanageSlice.reducer;
