import React from "react";
import "./OrderStatuses.css";
import { useAppSelector } from "../../store";
import { StatusBlock } from "../StatusBlock/StatusBlock";
import { StatusProps } from "../../MedicineTypes/MedicineTypes"

export const OrderStatuses: React.FC = () => {

    const nullStatus: StatusProps = {id: 0, name: "Все заказы"}

    const statuses = useAppSelector((state) => state.statusReducer.statuses)

    return (
        <div className="order_statuses">
            <StatusBlock {...nullStatus} key={0} />
            {statuses.map((status: StatusProps, index: number) => {
                return <StatusBlock {...status} key={index + 1} />
            })}
        </div>
    )
}