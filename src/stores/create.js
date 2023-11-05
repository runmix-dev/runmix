import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './home';

const createStore = ({preloadedState = {}}) => configureStore({
  reducer: {
    home: homeSlice.reducer,
  },
  preloadedState,
})

export default createStore