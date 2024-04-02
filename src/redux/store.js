import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import UserSlice from './User.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fetcher from '../services/Services';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['api'],
};

const rootReducer = combineReducers({
  UserSlice,
  [Fetcher.reducerPath]: Fetcher.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(Fetcher.middleware),
});

export default Store;
