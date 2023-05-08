import { createSlice } from "@reduxjs/toolkit";

const venuesSlice = createSlice({
    name: 'venues',
    initialState: {
        venues: [],
        singleVenue: null,
        cheapestHouses:[],
        topRatedHouses:[],
        createVenue: null,
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
    }
})

export default venuesSlice.reducer

const {SET_VENUES} = venuesSlice.actions
const {SET_SINGLE_VENUE} = venuesSlice.actions
const {SET_CREATE_VENUE} = venuesSlice.actions
const {SET_UPDATE_VENUE} = venuesSlice.actions
const accessToken = localStorage.getItem("accessToken")

export const fetchVenues = () => async (dispatch) => {
    try {
        const response = await fetch('https://nf-api.onrender.com/api/v1/holidaze/venues?sort=created&sortOrder=desc&&_owner=true&_bookings=true')
        const data = await response.json()
        console.log(data);
        dispatch(SET_VENUES(data))
    } catch(e) {
        console.log(e);
    }
}

export const fetchSingleVenue = (id) => async (dispatch) => {
    try {
        const response = await fetch(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
        const data = await response.json()
        console.log(data);
        dispatch(SET_SINGLE_VENUE(data))
    } catch(e) {
        console.log(e);
    }
}

export const newVenue = (venueData) => async (dispatch) => {
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
        console.log(data);
        dispatch(SET_CREATE_VENUE(data))
        window.location.href = '/';
    } catch(e) {
        console.log(e);
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
        console.log(data);
        dispatch(SET_UPDATE_VENUE(data))
        window.location.href = "/profile";
    } catch(e) {
        console.log(e);
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