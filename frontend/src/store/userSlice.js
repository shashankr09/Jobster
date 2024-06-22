import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: "",
        loginStatus: false,
        userEmail: "",
        accessToken: "",
        location:""
    },
    reducers: {
        loginSuccess: (state, { payload }) => {
            return { ...state, userEmail: payload.email, loginStatus: true, accessToken: payload.token }
        },
        updateUserDetails:(state,{payload})=>{
            return {...state,location:payload.location,userName:payload.name}
        },
        loginFailed: (state, { payload }) => {
            return { ...state, loginStatus: false, userName: "", userEmail: "" }
        }, // action.payload,
        logout: (state) => {
            return { ...state, loginStatus: false }
        }
    }
})

export default userSlice.reducer;
export const { loginSuccess, logout,updateUserDetails } = userSlice.actions;