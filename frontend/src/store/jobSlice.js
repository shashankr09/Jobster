import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        jobId: "",
        isEdit:false,
        isDelete:false
    },
    reducers: {
        updateJobId: (state, { payload }) => {
            return { ...state, jobId: payload }
        },
        updateIsEdit:(state,{payload})=>{
            return{...state,isEdit:payload}
        },
        updateIsDelete:(state,{payload})=>{
            return {...state,isDelete:payload}
        }
    }
})

export default jobSlice.reducer;
export const { updateJobId,updateIsEdit,updateIsDelete } = jobSlice.actions;