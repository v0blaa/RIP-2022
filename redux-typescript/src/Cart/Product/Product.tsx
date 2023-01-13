import React from "react";
import "../../MedicineStyles/Buttons.css"
import { useAppDispatch, useAppSelector } from "../../store";
import { FullProductProps } from "../../MedicineTypes/MedicineTypes";
import { userInfoAddProduct, userInfoDeleteOrder, userInfoDeleteProduct } from "../../store/reducers/userInfoSlice";
import axios from "axios";

export const Product: React.FC<FullProductProps> = ({...product}) => {

    const dispatch = useAppDispatch()

    const {token, user, order} = useAppSelector((state) => state.userInfoReducer)

    const deleteOrder = () => {
        axios.delete('/orders/' + product.order.toString() + '/', {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access,
        }})
        dispatch(userInfoDeleteOrder())
    }

    const DecCount = () => {
        if (order.products.length === 1 && order.products[0].count === 1)
            deleteOrder()
        else {
            if (product.count === 1)
                axios.delete('/products/' + product.id.toString() + '/', {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.access,
                }})
            else {
                let needProduct = {...product, count: product.count - 1, medicine: product.medicine.id}
                axios.put('/products/' + product.id.toString() + '/', {...needProduct}, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.access,
                }})
            }
            dispatch(userInfoDeleteProduct(product.id))
        }
    }

    const IncCount = () => {
        axios.put('/products/' + product.id.toString() + '/', {...product, count: product.count + 1, medicine: product.medicine.id}, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access,
        }})
        .then((response) => {
            dispatch(userInfoAddProduct({...product, count: product.count + 1}))
        })
    }

    return (
        <div className="product">
            <div>
                <div>{product.medicine.name}</div>
                <div>{product.medicine.farm_group}</div>
                <div>{product.count}</div>
                <div>{product.medicine.price}</div>
            </div>
            <div>
                <div className="blue_button" onClick={DecCount}>-</div>
                <div className="blue_button" onClick={IncCount}>+</div>
            </div>
        </div>
    )
}