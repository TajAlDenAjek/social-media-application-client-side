import { RootState } from '../../app/store'
import { createSlice } from '@reduxjs/toolkit'


// type of user state information
export type User = {
    id: number | null,
    username: string | null,
    token: string | null | any
}
// intial State when the app starts
let intiState: User = {
    id: null,
    username: null,
    token: null
}
// get localstoragestate
if (localStorage.getItem('auth') !== null) {
    intiState = { ...JSON.parse(localStorage.getItem('auth') || '{}') as User }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: intiState,
    reducers: {
        setCredentials: (state, action) => {
            const { id, username, token } = action.payload
            const user = { id,username,token }
            localStorage.setItem('auth', JSON.stringify(user))
            state.id = id;
            state.username = username;
            state.token = token
        },
        logOut: (state) => {
            localStorage.removeItem('auth')
            state.id = null
            state.username = null
            state.token = null
        },
    }
})


export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer


//getters
export const selectCurrentId = (state: RootState) => state.auth.id
export const selectCurrentUserName = (state: RootState) => state.auth.username
export const selectCurrentToken = (state: RootState) => state.auth.token