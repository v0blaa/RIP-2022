import React, { useState, useEffect } from "react";
import "./Search.css";
import "../../MedicineStyles/Buttons.css";
import "../../MedicineStyles/Inputs.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { medicinListUpdateSearch } from "../../store/reducers/medicineListSlice";

export const Search: React.FC = () => {

    const dispatch = useAppDispatch()

    const [editSearch, setEditSearch] = useState(useAppSelector((state) => state.medicineReducer.search));
    const {search} = useAppSelector((state) => state.medicineReducer)

    const changeEditSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditSearch(e.target.value)
    }

    const onButtonClick = (e: any) => {
        dispatch(medicinListUpdateSearch(editSearch))
    }

    const onKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            dispatch(medicinListUpdateSearch(editSearch))
        }
    }

    useEffect(() => {
    }, [])

    return (
        <div className="search" onKeyDown={onKeyDown}>
            <div className="edit">
                <input 
                    type="text"
                    placeholder="Введите название"
                    value={editSearch}
                    onChange={changeEditSearch}
                    className="search_input"
                />
            </div>
            <div className="blue_button" onClick={onButtonClick}>
                Поиск
            </div>
        </div>
    )
}