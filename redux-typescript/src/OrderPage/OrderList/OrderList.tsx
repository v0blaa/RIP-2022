import React, {useEffect, useState} from "react";
import "./OrderList.css";
import { FullOrderProps } from "../../MedicineTypes/MedicineTypes";
import { Order } from "../Order/Order";
import { useAppDispatch, useAppSelector } from "../../store";
import axios from "axios";

export const OrderList: React.FC = () => {

    const dispatch = useAppDispatch()

    const {user, token} = useAppSelector((state) => state.userInfoReducer)
    const {statuses, statusId, minDate, maxDate} = useAppSelector((state) => state.statusReducer)
    const [orders, setOrder] = useState<Array<FullOrderProps>>([]);

    useEffect(() => {
        setOrder([])
        axios.get('/full_orders/?status_id=' + statusId + '&date_after=' + minDate + '&date_before=' + maxDate + (user.is_staff ? '' : `&user_id=${user.id}`), {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access,
        }})
        .then((response) => {
            setOrder(response.data)
        })
    }, [dispatch, statuses, statusId, minDate, maxDate])

    return (
        <div className="order_list">
            {orders.map((order: FullOrderProps, index: number) => {
                return <Order {...order} key={index} />
            })}
        </div>
    )
}