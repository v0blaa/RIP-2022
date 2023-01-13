import React from "react";
import { StatusProps } from "../../MedicineTypes/MedicineTypes"
import "../../MedicineStyles/Buttons.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { statusesUpdateStatusId } from "../../store/reducers/statusSlice";

export const StatusBlock: React.FC<StatusProps> = ({...status}) => {

    const dispatch = useAppDispatch()

    const onClick = () => {
        dispatch(statusesUpdateStatusId(status.id === 0 ? "" : status.id.toString()))
    }

    const getStringStatus = () => {
        if (status.id === 0)
            return ""
        return status.id.toString()
    }

    return (
        <div
            onClick={onClick}
        >
            {status.name}
        </div>
    )
}