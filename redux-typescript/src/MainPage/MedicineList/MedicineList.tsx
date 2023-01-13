import React, { useEffect } from "react";
import "./MedicineList.css";
import "../../MedicineStyles/Titles.css"
import { useAppDispatch, useAppSelector } from "../../store";
import { ShortMedicineProps } from "../../MedicineTypes/MedicineTypes";
import { Medicine } from "../Medicine/Medicine";
import { Loading } from "../../Loading/Loading";
import { fetchMedicineList } from "../../store/actions/getMineralList";

export const MedicineList: React.FC = () => {

    const dispath = useAppDispatch()

    const {medicineList, isLoading, error, search, minPrice, maxPrice, farmGroup} = useAppSelector((state) => state.medicineReducer)

    useEffect(() => {
        dispath(fetchMedicineList('/short_medicine/?search=' + search + '&min_price=' + minPrice + '&max_price=' + maxPrice + '&farm_group_id=' + farmGroup))
    }, [search, minPrice, maxPrice, farmGroup])

    return (
        <div className="medicine_list">
            {isLoading ? <Loading /> :
                medicineList.length === 0 ? 
                <div className="gray_title">Ничего не найдено</div>
                :
                error === "" ?
                medicineList.map((medicine: ShortMedicineProps, index: number) => {
                    return <Medicine {...medicine} key={index}  />
                })
                : 
                <div className="gray_title">{error}</div>
             }
        </div>
    )
}