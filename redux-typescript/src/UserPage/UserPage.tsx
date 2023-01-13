import React, { useEffect } from "react";
import '../MedicineStyles/Buttons.css';
import { useAppDispatch, useAppSelector } from "../store";
import { userInfoLogOut } from "../store/reducers/userInfoSlice";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

export const UserPage: React.FC = () => {

    const dispatch = useAppDispatch()
    const cookies = new Cookies()

    const {user, token} = useAppSelector((state) => state.userInfoReducer)
    const navigate = useNavigate()

    useEffect(() => {
        if (token.access === "")
            navigate("/login")
    }, [dispatch, token, user])

    const logOut = (e: any) => {
        navigate("/login")
        cookies.set('access-token', '', { path: '/' });
        cookies.set('refresh-token', '', { path: '/' });
        cookies.set('username', '', { path: '/' });
        dispatch(userInfoLogOut())
    }

    return (
        <div className="user_page">
            <div className="info">
                <div>{user.username}</div>
                <div>{user.is_staff ? "Admin" : ""}</div>
                <div>{user.first_name}</div>
                <div>{user.last_name}</div>
                <div>{user.email}</div>
            </div>
            <div className="blue_button" onClick={logOut}>
                Выйти
            </div>
        </div>
    )
}