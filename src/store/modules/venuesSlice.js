import { createSlice } from "@reduxjs/toolkit";
import { setLoadingState } from "./loaderSlice";
import { setError } from "./errorSlice"

const venuesSlice = createSlice({
    name: 'venues',
    initialState: {
        venues: [],
        singleVenue: null,
        cheapestHouses:[],
        topRatedHouses:[],
        createVenue: null,
        bookVenue: null,
        searchVenue: ''
    },
    reducers: {
        SET_VENUES: (state, action) => {
            state.venues = action.payload;
            let lowestPrice = Infinity;
            let cheapestHouses = [];
            for (let i = 0; i < action.payload.length; i++) {
                const house = action.payload[i];
                if (house.price < lowestPrice) {
                    lowestPrice = house.price;
                    cheapestHouses = [house];
                } else if (house.price === lowestPrice) {
                    cheapestHouses.push(house);
                }
            }
            state.cheapestHouses = cheapestHouses;
            let highestScore = -Infinity;
            let topRatedHouses = [];
            for(let i = 0; i < action.payload.length; i++) {
                const house = action.payload[i];
                if(house.rating > highestScore) {
                    highestScore = house.rating;
                    topRatedHouses = [house];
                } else if (house.rating === highestScore) {
                    topRatedHouses.push(house)
                }
            }
            state.topRatedHouses = topRatedHouses;
        },
        SET_SINGLE_VENUE: (state, action) => {
            state.singleVenue = action.payload
        },
        SET_CREATE_VENUE: (state, action) => {
            state.createVenue = action.payload
        },
        SET_UPDATE_VENUE: (state, action) => {
            state.createVenue = action.payload
        },
        SET_BOOK_VENUE: (state, action) => {
            state.bookVenue = action.payload
        },
        SET_SINGLE_BOOKING: (state, action) => {
            state.singleBooking = action.payload;
        },
        SET_SEARCH_VENUE: (state, action) => {
            state.searchVenue = action.payload
        }
    }
})

export default venuesSlice.reducer

export const {
    SET_VENUES,
    SET_SINGLE_VENUE,
    SET_CREATE_VENUE,
    SET_UPDATE_VENUE,
    SET_BOOK_VENUE,
    SET_SINGLE_BOOKING,
    SET_SEARCH_VENUE
    } = venuesSlice.actions

const accessToken = localStorage.getItem("accessToken")

export const fetchVenues = () => async (dispatch) => {
    dispatch(setLoadingState(true))
    try {
        const response = await fetch('https://nf-api.onrender.com/api/v1/holidaze/venues?sort=created&sortOrder=desc&&_owner=true&_bookings=true')
        const data = await response.json()
        dispatch(SET_VENUES(data))
        dispatch(setLoadingState(false))
    } catch(e) {
        dispatch(setLoadingState(false))
        dispatch(setError(true, e.message))
    }
}

export const fetchSingleVenue = (id) => async (dispatch) => {
    dispatch(setLoadingState(true))
    try {
        const response = await fetch(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
        const data = await response.json()
        dispatch(SET_SINGLE_VENUE(data))
        dispatch(setLoadingState(false))
    } catch(e) {
        dispatch(setLoadingState(false))
        dispatch(setError(true, e.message))
    }
}

export const fetchSingleBooking = (id) => async (dispatch) => {
    dispatch(setLoadingState(true))
    try {
        const response = await fetch(`https://nf-api.onrender.com/api/v1/holidaze/bookings/${id}?_customer=true`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        const data = await response.json()
        dispatch(SET_SINGLE_BOOKING(data))
        dispatch(setLoadingState(false))
    } catch(e) {
        dispatch(setLoadingState(false))
        dispatch(setError(true, e.message))
    }
}


export const newVenue = (venueData) => async (dispatch) => {
    dispatch(setLoadingState(true))
    try {
        const response = await fetch('https://nf-api.onrender.com/api/v1/holidaze/venues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(venueData)
        })
        const data = await response.json()
        dispatch(SET_CREATE_VENUE(data))
        dispatch(setLoadingState(false))
        window.location.href = '/';
    } catch(e) {
        dispatch(setError(true, e.message))
    }
}

export const updateVenue = (id, venueData) => async (dispatch) => {
    try {
        const response = await fetch(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(venueData)
        })
        const data = await response.json()
        dispatch(SET_UPDATE_VENUE(data))
        dispatch(setLoadingState(false))
        window.location.href = `/venue/${id}`;
    } catch(e) {
        dispatch(setError(true, e.message))
        dispatch(setLoadingState(false))
    }
}

export const bookVenue = (venueData) => async (dispatch) => {
    try {
        const response = await fetch(`https://nf-api.onrender.com/api/v1/holidaze/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(venueData)
        })
        const data = await response.json()
        dispatch(SET_BOOK_VENUE(data))
    } catch(e) {
        dispatch(setError(true, e.message))
    }
}

export const deleteVenue = (id) =>  {
        fetch(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        })
        .then(() => {
            window.location.href = '/profile';
        })
}

export const deleteBooking = (id) =>  {
    fetch(`https://nf-api.onrender.com/api/v1/holidaze/bookings/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    })
    .then(() => {
        window.location.href = '/profile';
    })
}