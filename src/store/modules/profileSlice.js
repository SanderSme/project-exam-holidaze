import { createSlice } from "@reduxjs/toolkit";
import { setLoadingState } from "./loaderSlice";
import { setError } from "./errorSlice"

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        singleProfile: null,
    },
    reducers: {
        SET_SINGLE_PROFILE: (state, action) => {
            state.singleProfile = action.payload
        },
    }
})

export default profileSlice.reducer

const {SET_SINGLE_PROFILE} = profileSlice.actions
const accessToken = localStorage.getItem("accessToken")

export const fetchSingleProfile = (name, profileData) => async (dispatch) => {
    dispatch(setLoadingState(true))
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
        dispatch(setLoadingState(false))
        dispatch(SET_SINGLE_PROFILE(data))
    } catch(e) {
        dispatch(setError(true, e.message))
    }
}

export const logIn = (userData) => {
    fetch('https://nf-api.onrender.com/api/v1/holidaze/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
            .then(data => {
                localStorage.setItem('userName', data.name)
                localStorage.setItem('email', data.email)
                localStorage.setItem('avatar', data.avatar)
                localStorage.setItem('accessToken', data.accessToken)
                localStorage.setItem('venueManager', data.venueManager)
                window.location.href = '/';
            })
            .catch(error => {
                document.getElementById('errorMessage').innerHTML = "Wrong password or email"
            })
}

export const registerUser = (userData, logInData) => {
    fetch('https://nf-api.onrender.com/api/v1/holidaze/auth/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(userData)
              })
              .then(response => {
                  if(!response.ok) {
                      throw new Error(response.statusText)
                  }
                  return response.json()
              })
              .then(() => {
                  logIn(logInData)
              })
              .catch(error => {
                document.getElementById('errorMessage').innerHTML = "There was an Error, pleace try again"
              })
}