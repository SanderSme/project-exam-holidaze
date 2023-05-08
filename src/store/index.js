import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import venuesSlice from './modules/venuesSlice';
import profileSlice from './modules/profileSlice';
import loaderSlice from './modules/loaderSlice';

const reducer = combineReducers({
    venues: venuesSlice,
    profile: profileSlice,
    loader: loaderSlice
})

const index = configureStore({
    reducer
})

export default index