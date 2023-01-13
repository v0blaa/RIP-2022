import React, { useEffect, useState } from "react";
import "./MedicinePage.css";
import "../MedicineStyles/Titles.css";
import "../MedicineStyles/Buttons.css";
import { MedicineProps, FarmGroupProps } from "../MedicineTypes/MedicineTypes";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import axios from "axios";

export const MedicinePage: React.FC = ( ) => {

    const { id } = useParams();
    const [medicine, setMedicine] = useState<MedicineProps>();
    const [farmGroup, setFarmGroup] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setLoading] = useState(false)

    async function getMedicine() {
        try {
            setLoading(true)
            const response = await axios.get<MedicineProps>('/medicine/' + id + '/')
            setError("")
            setMedicine(response.data) 
            getFarmGroup(response.data.farm_group.toString())      
        }
        catch (error: any) { 
            setError("Данные не найдены")
            setLoading(false)
        }
    }

    async function getFarmGroup(farmId: string) {
        try {
            const response = await axios.get<FarmGroupProps>('/farm_groups/' + farmId + '/')
            setError("")
            setFarmGroup(response.data.name)
            setLoading(false)
        }
        catch (error: any) {
            setError("Данные не найдены")
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id != undefined && parseInt(id))
            getMedicine()
        else
            setError("Данные не найдены")
    }, [])

    return (
        <div>
        {error === "" && isLoading === false ? 
            <div className="all">
                <div className="page_title">
                    Товар
                </div>
                <div className="medicine_page">
                    <div className="m_header">
                        <div>{medicine?.name}</div>
                        <div className="button">{medicine?.price} Р</div>
                    </div>
                    <div className="m_farm_group">{farmGroup}</div>
                    <div className="info">
                        <div className="info_block">
                            <div className="info_title">
                                Показания к применению:
                            </div>
                            <div className="info_text">
                                {medicine?.indications_for_use}
                            </div>
                        </div>
                        <div className="info_block">
                            <div className="info_title">
                                ПРОТИВОПОКАЗАНИЯ:
                            </div>
                            <div className="info_text">
                                {medicine?.contraindications}
                            </div>
                        </div>
                        <div className="info_block">
                            <div className="info_title">
                                Другое:
                            </div>
                            <div className="info_text">
                                {medicine?.other_info}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        : isLoading === true ?
            <div className="loading"><Loading /></div>
        : <div className="page_title">{error}</div>}
        </div>
    )
}