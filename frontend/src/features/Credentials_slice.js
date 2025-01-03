import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email:"",
    password:"",
    role:"",
    token:"",
    date:[],
    first_name:"",
    last_name:"",
    department:"",

}

export const credentials_slice = createSlice({
    name:"Credentials",
    initialState,
    reducers:{
        add_data: (state,action)=>{
                state.email = action.payload.Email,
                    state.token = action.payload.Token,
                    state.last_name = action.payload.Last_name,
                    state.first_name = action.payload.First_name,
                    state.department = action.payload.Department,
                    state.role = action.payload.Role,
                    state.date = [],
                    state.date.push(...action.payload.Date)

        }
    },
    devTools:true
})
export const {add_data}=credentials_slice.actions
export default credentials_slice.reducer;