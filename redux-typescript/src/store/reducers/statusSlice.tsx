import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusProps } from "../../MedicineTypes/MedicineTypes";

interface StatusState {
    statuses: Array<StatusProps>,
    statusId: string,
    minDate: string,
    maxDate: string,
}

const initialState: StatusState = {
    statuses: [],
    statusId: "",
    minDate: "",
    maxDate: "",
}

export const statusSlice = createSlice({
    name: "statuses",
    initialState,
    reducers: {
        statusesFetchingSuccess(state, action: PayloadAction<Array<StatusProps>>) {
            state.statuses = [...action.payload]
        },
        statusesUpdateStatusId(state, action: PayloadAction<string>) {
            state.statusId = action.payload
        },
        statusesUpdateMinDate(state, action: PayloadAction<string>) {
            state.minDate = action.payload
        },
        statusesUpdateMaxDate(state, action: PayloadAction<string>) {
            state.maxDate = action.payload
        },
    }
})

export const {statusesFetchingSuccess, statusesUpdateMaxDate, statusesUpdateMinDate, statusesUpdateStatusId} = statusSlice.actions

export default statusSlice.reducer;