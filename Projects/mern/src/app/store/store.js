/* eslint-disable no-unused-vars */
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { Iterable } from 'immutable';

import exerciseReducer from '../../Features/exerciseSlice';
// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value);

// eslint-disable-next-line max-len
const getEntries = (value) => (Iterable.isIterable(value) ? value.entries() : Object.entries(value));

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
});

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, exerciseReducer);

export default configureStore({
  reducer: {
    exercise: persistedReducer,
  },
  middleware: [serializableMiddleware],
});
