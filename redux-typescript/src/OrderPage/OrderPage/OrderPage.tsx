import React, { useEffect } from "react";
import "./OrderPage.css";
import "../../MedicineStyles/Titles.css";
import { OrderList } from "../OrderList/OrderList";
import { OrderStatuses } from "../OrderStatuses/OrderStatuses";
import { OrderFilter } from "../OrderFilter/OrderFilter";

export const OrderPage: React.FC = () => {
    return (
        <div className="order_page">
            <div className="page_title">
                Заказы
            </div>
            <OrderStatuses />
            <OrderFilter />
            <OrderList />
        </div>
    )
}