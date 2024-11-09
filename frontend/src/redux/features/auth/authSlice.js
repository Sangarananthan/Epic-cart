import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("useInfo") ? JSON.parse(localStorage.getItem("useInfo")) : null  
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredientials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime);
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("expirationTime");
        }
    }
})

export const { setCredientials, logout } = authSlice.actions;
export default authSlice.reducer;
