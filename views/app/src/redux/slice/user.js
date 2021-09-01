import logo from "../../images/logo.svg";

import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: "user",
    initialState: {
        username: null,
        name: null,
        profilePicture: null,
        conversation: [],
    },
    reducers: {
        init: (state, action) => {
            state = action.payload;
        },
        updateName: (state, action) => {
            state.name = action.payload;
        },
        updateProfilePicture: (state, action) => {
            state.profilePicture = action.payload;
        },
        newChat: (state, action) => {
            state.conversation = new Array(...state.conversation, action.payload);
        },
    },
});

export const {} = user.actions;

export default user.reducer;
