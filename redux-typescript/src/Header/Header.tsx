import React, { useEffect } from "react";
import "./Header.css";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { useAppDispatch } from "../app/hooks";

export const Header: React.FC = () => {

    const dispath = useAppDispatch()
    const {token, user, order} = useAppSelector((state) => state.userInfoReducer)
    const navigate = useNavigate();

    useEffect(() => {
    }, [dispath, token])

    const getOrderCount = () => {
        if (token.access !== "" && order.id !== 0)
            return order.products.reduce((sum, element) => sum + element.count, 0)
    }

    const logInClick = (e: any) => {
        if (token.access !== "")
            navigate("/userpage")        
        else
            navigate("/login")
    }

    const mainPageClick = (e: any) => {
        navigate("/")
    }

    const goToCart = (e: any) => {
        navigate('/cart')
    }

    const goToOrders = (e: any) => {
        if (token.access !== "")
            navigate('/orderpage')
    }

    return (
        <div className="header">
            <div className="option" onClick={logInClick}>
                {token.access === "" ? "Войти" : user.username}
            </div>
            <div className="option" onClick={goToOrders}>
                Заказы
            </div>
            <div className="option" onClick={goToCart}>
                Корзина{token.access !== "" ? 
                    order.id !== 0 ?
                        "(" + getOrderCount() + ")"
                    : ""
                : ""}
            </div>
            <div className="option" onClick={mainPageClick}>
                Главная
            </div>
            <Outlet />
        </div>
    )
}