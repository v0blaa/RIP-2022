import axios from "axios";
import React from "react";
import "../../MedicineStyles/Buttons.css"
import "../../MedicineStyles/Titles.css"
import { FullProductProps } from "../../MedicineTypes/MedicineTypes";
import { useAppDispatch, useAppSelector } from "../../store";
import { userInfoDeleteOrder } from "../../store/reducers/userInfoSlice";
import { Product } from "../Product/Product";

export const OrderList: React.FC = () => {

    const dispatch = useAppDispatch()
    const {order, token} = useAppSelector((state) => state.userInfoReducer)

    const getOrderCount = () => {
        if (order.id !== 0)
            return order.products.reduce((sum, element) => sum + element.count, 0)
    }

    const buyProduct = (product: FullProductProps) => {
        axios.put('/products/' + product.id.toString() + '/', {...product, medicine: product.medicine.id, status: 2}, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access,
        }})
    }

    const buyProducts = () => {
        order.products.map((element: FullProductProps, index: number) => {
            buyProduct(element)
        })
    }

    const buyOrder = () => {
        axios.put('/orders/' + order.id.toString() + '/', {...order, count: getOrderCount(), status: 2}, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access,
        }})
        buyProducts()
        dispatch(userInfoDeleteOrder())
    }

    return (
        <div className="order_list">
            <div className="block">
                {order.products.length === 0 ?
                    <div className="gray_title">Товаров нет</div>
                    :
                    order.products.map((element: FullProductProps, index: number) => {
                    return <Product {...element} key={index} />
                })}
            </div>
            { order.id !== 0 ? 
                <div className="blue_button" onClick={buyOrder}>
                    Оплатить
                </div>
                : ""
            }
        </div>
    )
}