import React, { useState, useEffect } from "react";
import "../MedicineStyles/Buttons.css"
import "../MedicineStyles/Inputs.css"
import "./Login.css"
import { useAppDispatch, useAppSelector } from "../store";
import { login } from "../store/actions/getUserInfo";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

export const Login: React.FC = () => {

    const dispatch = useAppDispatch();
    const cookies = new Cookies();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {token, error, user, order} = useAppSelector((state) => state.userInfoReducer)

    const navigate = useNavigate();

    useEffect(() => {
        if (token.access !== "") {
            navigate('/userpage')
            cookies.set('access-token', token.access, { path: '/' });
            cookies.set('refresh-token', token.refresh, { path: '/' });
            cookies.set('username', user.username, { path: '/' });
        }
    }, [dispatch, token, user])

    const logIn = (e: any) => {
        dispatch(login({username: userName, password: password}))
    }

    const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const goToReg = () => {
        navigate('/registration')
    }

    return (
        <div className="login">
            <div className="field">
                <input 
                    type="text"
                    placeholder="Логин"
                    className="log_input"
                    onChange={changeUserName}
                />
            </div>
            <div className="field">
                <input
                    type="password"
                    placeholder="Пароль"
                    className="log_input"
                    onChange={changePassword}
                />
            </div>
            {error !== '' ?
                <div className="error">Логин или пароль введены неверно. Повторите попытку снова</div>
                :
                <div></div>
            }
            <div className="reg" onClick={goToReg}>
                Регистрация
            </div>
            <div className="blue_button" onClick={logIn}>
                Войти
            </div>
        </div>
    )
}