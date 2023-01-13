import React, {useEffect, useState} from "react";
import { useAppSelector } from "../store";
import "./EditPage.css";
import "../MedicineStyles/Buttons.css";
import "../MedicineStyles/Inputs.css";
import "../MedicineStyles/Titles.css";
import { useParams } from "react-router-dom";
import { MedicineProps } from "../MedicineTypes/MedicineTypes";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialState: MedicineProps = {
    id: 0,
    name: "",
    indications_for_use: "",
    contraindications: "",
    other_info: "",
    price: 0,
    count: 0,
    farm_group: 1,
}

export const EditPage: React.FC = () => {

    const {id} = useParams();
    const navigate = useNavigate()

    const [medicine, setMedicine] = useState<MedicineProps>(initialState);
    const [editStatus, setEditStatus] = useState("no changes");
    const {token, user} = useAppSelector((state) => state.userInfoReducer)

    useEffect(() => {
        if (user.is_staff === false)
            navigate('/')
        let newMedicine = {...medicine}
        if (id !== "0")
        {
            axios('/medicine/' + id + '/', {headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access,
            }})
            .then((response) => {setMedicine({...response.data})})
        }
        setMedicine(newMedicine)
        setEditStatus("no changes")
    }, [])

    const createChanges = (method: string) => {
        let url = "/medicine/"
        url += (method === "put") ? id + "/" : "";
        let needMedicine = {...medicine}
        if (id === "0") {
            let {id: _, ...rest} = needMedicine
        }
        if (method === "post")
        {
            axios.post(url, {...needMedicine}, {headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access,
            }})
            .then((response) => {
                setMedicine({...response.data})
                setEditStatus("ok")
            })
            .catch((error) => {
                if (error.toString() === "Error: wrong data")
                    setEditStatus("wrong data")
            })
        }
        if (method === "put")
        {
            axios.put(url, {...needMedicine}, {headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access,
            }})
            .then((response) => {
                setMedicine({...response.data})
                setEditStatus("ok")
            })
            .catch((error) => {
                if (error.toString() === "Error: wrong data")
                    setEditStatus("wrong data")
            })
        }
    }

    const clickButton = () => {
        if (id === "0")
            createChanges("post")
        else
            createChanges("put")
    }

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        medicine.name = e.target.value
        setMedicine({...medicine})
    }

    const changeIndic = (e: React.ChangeEvent<HTMLInputElement>) => {
        medicine.indications_for_use = e.target.value
        setMedicine({...medicine})
    }

    const changeContr = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        medicine.contraindications = e.target.value
        setMedicine({...medicine})
    }

    const changeOther = (e: React.ChangeEvent<HTMLInputElement>) => {
        medicine.other_info = e.target.value
        setMedicine({...medicine})
    }

    const changeFarmGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
        medicine.farm_group = parseInt(e.target.value)
        setMedicine({...medicine})
    }

    const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        medicine.price = parseInt(e.target.value)
        setMedicine({...medicine})
    }

    const changeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        medicine.count = parseInt(e.target.value)
        setMedicine({...medicine})
    }

    return (
        <div className="edit_page">
            <div className="page_title">
                {id === "0" ? "Добавление" : "Изменение"}
            </div>
            {editStatus === "no changes" ? 
                ""
                    :
                editStatus === "ok" ?
                    <div className="shadow_title">Изменения успешно внесены</div> 
                    :
                editStatus === "wrong data" ?
                    <div className="wrong_title">Формат данных некорректен</div> 
                    :
                ""
            }
            <div className="edit_block">
                <div className="edit_left">
                    {id !== "0" ? <div className="option_title">ID:</div> : ""}
                    <div className="option_title">Название:</div>
                    <div className="option_title">Показания к использованию:</div>
                    <div className="option_title" id="desc">Противопоказания:</div>
                    <div className="option_title">Другое:</div>
                    <div className="option_title">Группа:</div>
                    <div className="option_title">Цена:</div>
                    <div className="option_title">Количество:</div>
                </div>
                <div className="edit_right">
                        {id !== "0" ? <div className="option_title">{id}</div> : ""}
                    <div className="basic_input">
                        <input 
                            type="text"
                            placeholder="Название"
                            value={medicine.name}
                            onChange={changeName}
                        />
                    </div>
                    <div className="basic_input">
                        <input 
                            type="text"
                            placeholder="Показания к использованию"
                            value={medicine.indications_for_use}
                            onChange={changeIndic}
                        />
                    </div>
                    <div className="basic_textarea" id="desc">
                        <textarea
                            placeholder="Противопоказания"
                            value={medicine.contraindications}
                            onChange={changeContr}
                        />
                    </div>
                    <div className="basic_input">
                        <input 
                            type="text"
                            placeholder="Другое"
                            value={medicine.other_info}
                            onChange={changeOther}
                        />
                    </div>
                    <div className="basic_input">
                        <input 
                            type="number"
                            placeholder="Группа"
                            value={medicine.farm_group}
                            onChange={changeFarmGroup}
                        />
                    </div>
                    <div className="basic_input">
                        <input 
                            type="number"
                            placeholder="Цена"
                            value={medicine.price}
                            onChange={changePrice}
                        />
                    </div>
                    <div className="basic_input">
                        <input 
                            type="number"
                            placeholder="Количество"
                            value={medicine.count}
                            onChange={changeCount}
                        />
                    </div>
                </div>
            </div>
            <div className="blue_button" onClick={clickButton}>
                {id === "0" ? "Добавить" : "Изменить"}
            </div>
        </div>
    )
}