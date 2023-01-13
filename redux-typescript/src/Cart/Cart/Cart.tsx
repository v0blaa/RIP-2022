import React, {useEffect} from "react";
import "../../MedicineStyles/Titles.css";
import { useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { OrderList } from "../OrderList/OrderList";

export const Cart: React.FC = () => {

    const navigate = useNavigate()
    const {token, user, order} = useAppSelector((state) => state.userInfoReducer)

    useEffect(() => {
        if (token.access === "")
            navigate('/login')
    }, [token, user, order, order.products])

    const getOrderCount = () => {
        if (token.access !== "")
            return order.products.reduce((sum, element) => sum + element.count, 0)
    }

    const getOrderSum = () => {
        if (token.access !== "")
            return order.products.reduce((sum, element) => sum + element.medicine.price * element.count, 0)
    }

    return (
        <div className="cart">
            <div className="page_title">
                Корзина
                {order.products.length !== 0 ? 
                    "(" + getOrderCount() + ") - " + getOrderSum() + " Р"
                    : ""
                }
            </div>
            <OrderList />
        </div>
    )
}