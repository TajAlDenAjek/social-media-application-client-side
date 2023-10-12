import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../user/userApiSlice";
import { RootState } from "../../app/store";


export type MessageType = {
    id: number,
    message?: string,
    createdAt?: string | Date,
    updatedAt?: string | Date,
    senderUserId?: number,
    reciverUserId?: number,
    senderUser?: UserType|number,
    reciverUser?: UserType|number,
}


let initState: MessageType[] = []

export const chatSlice = createSlice({
    name: 'chat',
    initialState: initState,
    reducers: {
        initStateReducer: (state,action: any) => {
            return action.payload.chat
        },
        addMessage: (state, action) => {
            state.push(action.payload.message);
        }
    }
})

export const { initStateReducer, addMessage } = chatSlice.actions
export default chatSlice.reducer
export const selectCurrentChat = (state: RootState) => state.chat
