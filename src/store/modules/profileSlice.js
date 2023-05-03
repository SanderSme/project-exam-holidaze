import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        singleProfile: null,
    },
    reducers: {
        SET_SINGLE_PROFILE: (state, action) => {
            state.singleProfile = action.payload
        }
    }
})

export default profileSlice.reducer

const {SET_SINGLE_PROFILE} = profileSlice.actions
const accessToken = localStorage.getItem("accessToken")

export const fetchSingleProfile = (name, profileData) => async (dispatch) => {
    try {
        const response = await fetch(`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}?_bookings=true&_venues=true`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(profileData)
        })
        const data = await response.json()
        console.log(data);
        dispatch(SET_SINGLE_PROFILE(data))
    } catch(e) {
        console.log(e);
    }
}