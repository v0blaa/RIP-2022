import React, {useState, useEffect} from "react";
import "../MedicineStyles/Inputs.css";
import "../MedicineStyles/Buttons.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { registration } from "../store/actions/getUserInfo";

export const Registration: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {token, error} = useAppSelector((state) => state.userInfoReducer)

    useEffect(() => {
        if (token.access !== "")
            navigate('/userpage')
    }, [dispatch, token])

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const createUser = () => {
        dispatch(registration({email: email, username: userName, password: password}))
    }


    return (
        <div className="regist">
            <div>
                <input 
                    type="text"
                    placeholder="Почта"
                    className="log_input"
                    onChange={changeEmail}
                />
            </div>
            <div>
                <input 
                    type="text"
                    placeholder="Логин"
                    className="log_input"
                    onChange={changeUserName}
                />
            </div>
            <div>
                <input
                    placeholder="Пароль"
                    className="log_input"
                    type="password"
                    onChange={changePassword}
                />
            </div>
            {error !== '' ?
                <div className="error">Пароль введен некорректно. Повторите попытку снова</div>
                :
                <div></div>
            }
            <div className="blue_button" onClick={createUser}>
                Регистрация
            </div>
        </div>
    )
}