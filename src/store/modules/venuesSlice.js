import { createSlice } from "@reduxjs/toolkit";

const venuesSlice = createSlice({
    name: 'venues',
    initialState: {
        venues: [],
        singleVenue: null
    },
    reducers: {
        SET_VENUES: (state, action) => {
            state.venues = action.payload
        },
        SET_SINGLE_VENUE: (state, action) => {
            state.singleVenue = action.payload
        }
    }
})

export default venuesSlice.reducer

const {SET_VENUES} = venuesSlice.actions
const {SET_SINGLE_VENUE} = venuesSlice.actions

export const fetchVenues = () => async (dispatch) => {
    try {
        const response = await fetch('https://nf-api.onrender.com/api/v1/holidaze/venues')
        const data = await response.json()
        console.log(data);
        dispatch(SET_VENUES(data))
    } catch(e) {
        console.log(e);
    }
}

export const fetchSingleVenue = (id) => async (dispatch) => {
    try {
        const response = await fetch(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`)
        const data = await response.json()
        console.log(data);
        dispatch(SET_SINGLE_VENUE(data))
    } catch(e) {
        console.log(e);
    }
}