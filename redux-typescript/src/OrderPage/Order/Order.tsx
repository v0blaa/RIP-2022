import React, { useEffect, useState } from "react";
import "./Order.css";
import "../../MedicineStyles/Buttons.css"
import { useAppDispatch, useAppSelector } from "../../store";
import { FullOrderProps, FullProductProps, StatusProps, UserProps } from "../../MedicineTypes/MedicineTypes";
import axios from "axios";

export const Order: React.FC<FullOrderProps> = ({...order}) => {

    const dispatch = useAppDispatch()
    const [userName, setUserName] = useState("")

    const statuses = useAppSelector((state) => state.statusReducer.statuses)
    const token = useAppSelector((state) => state.userInfoReducer.token)
    const user = useAppSelector((state) => state.userInfoReducer.user)
    const [editStatus, setEditStatus] = useState(order.status)
    const [editDate, setEditDate] = useState("")
    const [paidDate, setPaidDate] = useState("")
    const [sentDate, setSentDate] = useState("")
    const [deliveredDate, setDeliveredDate] = useState("")

    const [paidDateD, setPaidDateD] = useState(order.paid_date)
    const [sentDateD, setSentDateD] = useState(order.sent_date)
    const [deliveredDateD, setDeliveredDateD] = useState(order.delivered_date)

    const getUpButtonName = () => {
        const current_status = getStatus()
        if (current_status === 'В корзине')
            return "Восстановить заказ"
        if (current_status === 'В ожидании')
            return "Подтвердить оплату"
        if (current_status === 'Оплачен')
            return "Отправить"
        if (current_status === 'Отправлен')
            return "Получен"
        if (current_status === 'Доставлен')
            return "..."
    }

    const getDownButtonName = () => {
        const current_status = getStatus()
        if (current_status === 'В корзине')
            return "..."
        if (current_status === 'В ожидании')
            return "Отменить заказ"
        if (current_status === 'Оплачен')
            return "Отменить оплату"
        if (current_status === 'Отправлен')
            return "Отменить отправку"
        if (current_status === 'Доставлен')
            return "Отменить доставку"
    }

    const getPrice = () => {
        return order.products.reduce((sum: number, elem: FullProductProps) => {return sum + elem.medicine.price * elem.count}, 0)
    }

    const getStatus = () => {
        let index = statuses.find((element: StatusProps) => element.id === editStatus)?.name
        let statusName = (index === undefined) ? "" : index
        // if (statusName === "В корзине") {
        //     return "Отменен"
        // }
        return statusName
    }

    const getDate = () => {
        let status = getStatus()
        if (status === "В корзине" || status === "В ожидании")
        {
            setPaidDate("...")
            setSentDate("...")
            setDeliveredDate("...")
            return "..."
        }
        let dateStr = ""
        if (status === "Оплачен")
        {
            dateStr = order.paid_date
            setSentDate("...")
            setDeliveredDate("...")
        }
        else if (status === "Отправлен")
        {
            dateStr = order.sent_date
            setDeliveredDate("...")
        }
        else if (status === "Доставлен")
            dateStr = order.delivered_date
        const date = new Date(dateStr)
        return date.toLocaleString()
    }

    const getFormatDate = (date: string) => {
        let newDate = new Date(date)
        return newDate.toLocaleString()
    }

    const nextStatus = () => {
        let newStatus = getStatus()
        if (newStatus === "Доставлен")
            return;
        if (newStatus === "В корзине")
            newStatus = "В ожидании"
        else if (newStatus === "В ожидании")
            newStatus = "Оплачен"
        else if (newStatus === "Оплачен")
            newStatus = "Отправлен"
        else if (newStatus === "Отправлен")
            newStatus = "Доставлен"
        let index = statuses.find((element: StatusProps) => element.name === newStatus)?.id
        let newStatusId = (index === undefined) ? order.status : index
        updateStatus(newStatusId, newStatus, "next")
        setEditStatus(newStatusId)
    }

    const previousStatus = () => {
        let newStatus = getStatus()
        if (newStatus === "В корзине")
            return;
        if (newStatus === "В ожидании")
            newStatus = "В корзине"
        if (newStatus === "Доставлен")
            newStatus = "Отправлен"
        else if (newStatus === "Отправлен")
            newStatus = "Оплачен"
        else if (newStatus === "Оплачен")
            newStatus = "В ожидании"
        let index = statuses.find((element: StatusProps) => element.name === newStatus)?.id
        let newStatusId = (index === undefined) ? order.status : index
        updateStatus(newStatusId, newStatus, "prev")
        setEditStatus(newStatusId)
        if (newStatus === "Отправлен")
        {
            setDeliveredDate("...")
        }
        if (newStatus === "Оплачен")
        {
            setSentDate("...")
            setDeliveredDate("...")
        }
        if (newStatus === "В ожидании")
        {
            setPaidDate("...")
            setSentDate("...")
            setDeliveredDate("...")
        }
    }

    const updateProduct = (newStatusId: number, product: FullProductProps, paid: string, sent: string, delivered: string) => {
        axios.put('/products/' + product.id.toString() + '/',
        {
            id: product.id,
            count: product.count,
            paid_date: paid,
            sent_date: sent,
            delivered_date: delivered,
            user: product.user,
            order: order.id,
            medicine: product.medicine.id,
            status: newStatusId
        }, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access,
        }})
        .then((response) => { })
    }

    const updateProducts = (newStatusId: number, paid: string, sent: string, delivered: string) => {
        order.products.map((element: FullProductProps, index: number) => {
            updateProduct(newStatusId, {...element}, paid, sent, delivered)
        })
    }

    const getJSONType = (date: string) => {
        let newDate = date.replace(/, /gi, 'T')
        console.log(newDate)
        let newDate2 = newDate.replace(/[\.\/]/g, '-')
        return newDate2 + '.177Z'
    }

    const updateStatus = (newStatusId: number, newStatus: string, step: string) => {
        let today = new Date()
        if (newStatus === "В корзине")
            setEditDate("...")
        if (newStatus === "В ожидании") {
            setEditDate("...")
        }
        if (newStatus === "Оплачен") {
            setPaidDate((step === "next") ? today.toLocaleString() : paidDate)
            setPaidDateD((step === "next") ? today.toJSON() : paidDateD)
            setEditDate((step === "next") ? today.toLocaleString() : paidDate)
        }
        if (newStatus === "Отправлен") {
            setSentDate((step === "next") ? today.toLocaleString() : sentDate)
            setSentDateD((step === "next") ? today.toJSON() : sentDateD)
            setEditDate((step === "next") ? today.toLocaleString() : sentDate)
        }
        if (newStatus === "Доставлен") {
            setDeliveredDate((step === "next") ? today.toLocaleString() : deliveredDate)
            setDeliveredDateD((step === "next") ? today.toJSON() : deliveredDateD)
            setEditDate((step === "next") ? today.toLocaleString() : deliveredDate)
        }
        axios.put('/orders/' + order.id.toString() + '/',
        {
            ...order,
            paid_date: paidDateD,
            sent_date: sentDateD,
            delivered_date: deliveredDateD,
            user: order.user,
            status: newStatusId
        }, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access,
        }})
        .then((response) => { updateProducts(newStatusId, paidDateD, sentDateD, deliveredDateD) })
    }

    const getLocalDate = (date: string) => {
        let newDate = new Date(date)
        return newDate.toLocaleString()
    }

    useEffect(() => {
        let status = getStatus()
        setPaidDate(status !== "В корзине" && status !== "В ожидании" ? getLocalDate(order.paid_date) : "...")
        setSentDate(status !== "В корзине" && status !== "В ожидании" && status !== "Оплачен" ? getLocalDate(order.sent_date) : "...")
        setDeliveredDate(getLocalDate(status !== "В корзине" && status !== "В ожидании" && status !== "Оплачен" && status !== "Отправлен" ? order.delivered_date : "..."))
        let date = getDate()
        setEditDate(date)
        axios('/userinfo/' + order.user.toString() + '/', {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access,
        }})
        .then((response) => {
            setUserName(response.data.username)
        })
    }, [])

    return (
        <div className="order">
            <div className="set" id="main_set">
                <div className="main_item">ID: {order.id}</div>
                <div className="item">{getPrice()} Р</div>
                {/*<div className="main_item">{order.products.length} шт.</div>*/}
                {user.is_staff && <div className="item">{userName}</div>}
                {editDate !== "..." && <div className="main_item">Дата изменения статуса: {editDate}</div>}
                {/*<div className="main_item">{editDate}</div>*/}
                {getStatus() !== 'В корзине' && <>
                    <div className="item">{getStatus()}</div>
                </>}

                {getStatus() === 'В корзине' && <>
                    <div className="item">Отменен</div>
                </>}
            </div>
            <div id="box_set">
                <div className="set" id="other_set">
                    <div className="item">Дата оплаты: {paidDate}</div>
                    <div className="main_item">Дата отправки: {sentDate}</div>
                    <div className="item">Дата доставки: {deliveredDate}</div>
                </div>
            </div>

            {!user.is_staff && getStatus() === 'Отправлен' && <>
                {getUpButtonName() !== "..." ?
                    <div className="blue_button"
                         onClick={nextStatus}
                    >
                        {getUpButtonName()}
                    </div> : ""
                }
            </>}
            {!user.is_staff && getStatus() === 'В ожидании' && <>
                {getDownButtonName() !== "..." ?
                    <div className="blue_button"
                         onClick={previousStatus}
                    >
                        {getDownButtonName()}
                    </div> : ""
                }
            </>}
            {user.is_staff && <>
                {getStatus() !== 'Отправлен' && <>
                    {getUpButtonName() !== "..." ?
                        <div className="blue_button"
                             onClick={nextStatus}
                        >
                            {getUpButtonName()}
                        </div> : ""
                    }
                </>}
                {getDownButtonName() !== "..." && getStatus() !== 'В корзине' ?
                    <div className="blue_button"
                         onClick={previousStatus}
                    >
                        {getDownButtonName()}
                    </div> : ""
                }
            </>}
        </div>
    )
}