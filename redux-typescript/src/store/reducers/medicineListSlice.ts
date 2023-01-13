import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShortMedicineProps } from "../../MedicineTypes/MedicineTypes";

interface MedicineListState {
    medicineList: Array<ShortMedicineProps>,
    isLoading: boolean,
    error: string,
    search: string,
    minPrice: string,
    maxPrice: string,
    farmGroup: string,
}

const initialState: MedicineListState = {
    medicineList: [],
    isLoading: false,
    error: "",
    search: "",
    minPrice: "",
    maxPrice: "",
    farmGroup: "",
}

export const medicineListSlice = createSlice({
    name: "medicine_list",
    initialState,
    reducers: {
        medicineListFetching(state) {
            state.isLoading = true
        },
        medicineListFetchingSuccess(state, action: PayloadAction<Array<ShortMedicineProps>>) {
            state.isLoading = false
            state.error = ""
            state.medicineList = [...action.payload]
        },
        medicineListFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        },
        medicinListUpdateSearch(state, action: PayloadAction<string>) {
            state.search = action.payload
        },
        medicinListUpdateMinPrice(state, action: PayloadAction<string>) {
            state.minPrice = action.payload
        },
        medicinListUpdateMaxPrice(state, action: PayloadAction<string>) {
            state.maxPrice = action.payload
        },
        medicinListUpdatePrice(state, action: PayloadAction<{minPrice: string, maxPrice: string}>) {
            state.minPrice = action.payload.minPrice
            state.maxPrice = action.payload.maxPrice
        },
        medicinListUpdateFarmGroup(state, action: PayloadAction<string>) {
            state.farmGroup = action.payload
        },
        medicineListDeleteMedicine(state, action: PayloadAction<number>) {
            let index = state.medicineList.findIndex((element) => element.id === action.payload)
            if (index !== -1) {
                let newList = [...state.medicineList.slice(0, index), ...state.medicineList.slice(index + 1)]
                state.medicineList = [...newList]
            }
        }
    }
})

export const {medicinListUpdateSearch, medicinListUpdatePrice, medicinListUpdateFarmGroup, medicineListDeleteMedicine} = medicineListSlice.actions;

export default medicineListSlice.reducer;

