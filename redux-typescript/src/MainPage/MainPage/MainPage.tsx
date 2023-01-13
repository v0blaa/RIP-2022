import React from "react";
import { MedicineList } from "../MedicineList/MedicineList";
import { Search } from "../Search/Search";
import { Ordering } from "../Ordering/Ordering";
import "../../MedicineStyles/Titles.css";
import "../../MedicineStyles/Buttons.css";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";

export const MainPage: React.FC = () => {

    const navigate = useNavigate()
    const user = useAppSelector((state) => state.userInfoReducer.user)

    const goToAdd = () => {
        navigate('/editpage/0')
    }

    return (
        <div className="main_page">
            <div className="page_title">
                Аптека
            </div>
            <Search />
            <Ordering />
            {user.is_staff ?
            <div className="blue_button" id="bt" onClick={goToAdd}>
                Добавить
            </div> : ""
            }
            <MedicineList />
        </div>
    )
}