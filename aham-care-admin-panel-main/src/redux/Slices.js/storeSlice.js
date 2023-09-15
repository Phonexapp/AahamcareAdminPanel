import { createSlice } from '@reduxjs/toolkit';

const INTIAL_STATE = {
    stores: [],
    loading: false,
    store: {}
  };

  const storeSlice = createSlice({
    name: 'store',
    initialState: INTIAL_STATE,
  
    reducers: {
      getStores: (state, action) => {
        state.loading = action.payload.loading
        state.stores = action.payload.value;
      },
  
      getById : (state,action)=>{
        state.store = action.payload;
      }
    },
  });
  
  export const { getStores, getById } = storeSlice.actions;
  export default storeSlice.reducer;