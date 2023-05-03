import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import venuesSlice from './modules/venuesSlice';
import profileSlice from './modules/profileSlice';

const reducer = combineReducers({
    venues: venuesSlice,
    profile: profileSlice
})

const index = configureStore({
    reducer
})

export default index