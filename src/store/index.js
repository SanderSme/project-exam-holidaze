import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import venuesSlice from './modules/venuesSlice';

const reducer = combineReducers({
    venues: venuesSlice
})

const index = configureStore({
    reducer
})

export default index