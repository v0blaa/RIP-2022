import React from "react";
import "./Medicine.css";
import "../../MedicineStyles/Buttons.css";
import add from "../../images/add.svg";
import { ShortMedicineProps } from "../../MedicineTypes/MedicineTypes";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { userInfoAddProduct, userInfoFetcgingOrder } from "../../store/reducers/userInfoSlice";
import { medicineListDeleteMedicine } from "../../store/reducers/medicineListSlice";
import axios from "axios";

export const Medicine: React.FC<ShortMedicineProps> = ({...medicine}) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {token, order, user} = useAppSelector((state) => state.userInfoReducer)

    const createOrder = () => {
        let today = new Date()
        axios.post('/orders/', {
            count: 1,
            paid_date: today.toJSON(),
            sent_date: today.toJSON(),
            delivered_date: today.toJSON(),
            user: user.id,
            status: 1,
        }, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access,
        }})
        .then((orderResponse) => {
            axios.post('/products/', {
                count: 1,
                paid_date: today.toJSON(),
                sent_date: today.toJSON(),
                delivered_date: today.toJSON(),
                user: user.id,
                medicine: medicine.id,
                order: orderResponse.data.id,
                status: 1,
            }, {headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access,
            }})
            .then((productResponse) => {
                let newProducts = []
                newProducts.push({...productResponse.data, medicine: {...medicine}})
                dispatch(userInfoFetcgingOrder({...orderResponse.data, products: [...newProducts]}))
            })
        })
    }

    const addProduct = (e: any) => {
        if (token.access !== "")
        {
            if (order.id !== 0)
            {
                let index = order.products.findIndex((element) => element.medicine.id === medicine.id)
                if (index !== -1)
                {
                    axios.put('/products/' + order.products[index].id.toString() + '/', {
                        ...order.products[index], 
                        count: order.products[index].count + 1, 
                        medicine: medicine.id}
                        , {headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token.access,
                        }})
                    .then((response) => {
                        dispatch(userInfoAddProduct({...response.data, medicine: {...medicine}}))
                    })
                    .catch((error: any) => {})
                }
                else {
                    let today = new Date()
                    axios.post('/products/', {
                        count: 1,
                        paid_date: today.toJSON(),
                        sent_date: today.toJSON(),
                        delivered_date: today.toJSON(),
                        user: user.id,
                        medicine: medicine.id,
                        order: order.id,
                        status: 1,
                    }, {headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token.access,
                    }})
                    .then((response) => {
                        dispatch(userInfoAddProduct({...response.data, medicine: {...medicine}}))
                    })
                }
            }
            else createOrder()
        }
        else
            navigate('/login')
    }

    const goToEditPage = () => {
        navigate('/editpage/' + medicine.id.toString())
    }

    const deleteMedicine = () => {
        axios.delete('/medicine/' + medicine.id.toString() + '/', {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access,
        }})
        dispatch(medicineListDeleteMedicine(medicine.id))
    }

    return (
        <div className="medicine">
                <div className="name">
                    <div>
                    <Link
                        to={"/medicine/" + medicine.id.toString()}
                    >
                        {medicine.name}
                    </Link>
                    </div>
                    <div className="add_img" onClick={addProduct}>
                        <img src={add} alt="add" />
                    </div>
                </div>
            <div>
                <div className="farm_group">
                    {medicine.farm_group}
                </div>
                <div className="price">{medicine.price} Р</div>
                {user.is_staff ?
                    <div className="admin_buttons">
                        <div className="blue_button" onClick={goToEditPage}>
                            Изменить
                        </div>
                        <div className="blue_button" onClick={deleteMedicine}>
                            Удалить
                        </div>
                    </div>
                    : ""
                }
            </div>
        </div>
    )
}