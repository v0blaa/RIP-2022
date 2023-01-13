import React, { useState } from "react";
import "./OrderFilter.css";
import "../../MedicineStyles/Buttons.css";
import "../../MedicineStyles/Inputs.css";
import "../../MedicineStyles/Titles.css";
import { useAppDispatch} from "../../store";
import DatePicker from "react-datepicker";
import { statusesUpdateMinDate, statusesUpdateMaxDate } from "../../store/reducers/statusSlice";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)

require('react-datepicker/dist/react-datepicker.css');

export const OrderFilter: React.FC = () => {

    const dispatch = useAppDispatch()

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const changeStartDate = (date: Date) => {
        setStartDate(date)
    }

    const changeEndDate = (date: Date) => {
        setEndDate(date)
    }

    const onKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            let min = (startDate === null) ? "" : startDate.toJSON()
            let max = (endDate === null) ? "" : endDate.toJSON()
            dispatch(statusesUpdateMinDate(min))
            dispatch(statusesUpdateMaxDate(max))
        }
    }

    const clickButton = () => {
        let min = (startDate === null) ? "" : startDate.toJSON()
        let max = (endDate === null) ? "" : endDate.toJSON()
        dispatch(statusesUpdateMinDate(min))
        dispatch(statusesUpdateMaxDate(max))
    }

    return (
        <div className="order_filter" onKeyDown={onKeyDown}>
            <div className="option_title">
                Фильтр по дате оплаты
            </div>
            <div className="block">
                <div className="search_input">
                    <DatePicker
                        selected={startDate}
                        onChange={changeStartDate}
                        showTimeSelect
                        dateFormat="Pp"
                        locale="ru"
                    />
                </div>
                <div className="search_input">
                    <DatePicker
                        selected={endDate}
                        onChange={changeEndDate}
                        showTimeSelect
                        dateFormat="Pp"
                        locale="ru"
                    />
                </div>
                <div className="blue_button" onClick={clickButton}>
                    Применить
                </div>
            </div>
        </div>
    )
}