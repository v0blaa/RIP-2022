import { AppDispatch } from "..";
import axios from "axios";
import { ShortMedicineProps } from "../../MedicineTypes/MedicineTypes";
import { medicineListSlice } from "../reducers/medicineListSlice";

export const fetchMedicineList = (url: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(medicineListSlice.actions.medicineListFetching())
        const response = await axios.get<Array<ShortMedicineProps>>(url)
        dispatch(medicineListSlice.actions.medicineListFetchingSuccess(response.data))
    } catch (error: any) {
        console.log(error)
        dispatch(medicineListSlice.actions.medicineListFetchingError(error.message))
    }
}