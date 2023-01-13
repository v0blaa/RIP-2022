import React, { useState, useEffect } from "react";
import Select from 'react-select';
import "./Ordering.css";
import { FarmGroupProps } from "../../MedicineTypes/MedicineTypes";
import { useAppDispatch, useAppSelector } from "../../store";
import { medicinListUpdateFarmGroup, medicinListUpdatePrice } from "../../store/reducers/medicineListSlice";

export const Ordering: React.FC = () => {

    const dispatch = useAppDispatch();

    const [farmGroups, setfarmGroups] = useState<Array<{value: string, label: string}>>([]);
    const [selectedFarmGroup, setSelectedFarmGroup] = useState({value: "", label: "Все группы"});
    const [minPrice, setMinPrice] = useState(useAppSelector((state) => state.medicineReducer.minPrice))
    const [maxPrice, setMaxPrice] = useState(useAppSelector((state) => state.medicineReducer.maxPrice))

    const handleTypeFarmGroup = (e: any) => {
        setSelectedFarmGroup(e.value)
        dispatch(medicinListUpdateFarmGroup(e.value))
    }

    const onKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            dispatch(medicinListUpdatePrice({minPrice: minPrice, maxPrice: maxPrice}))
        }
    }

    const changeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(e.target.value)
    }
    
    const changeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(e.target.value)
    }

    useEffect(() => {
        fetch('/farm_groups/')
        .then((response) => {
            return response.json()
        })
        .then((data: Array<FarmGroupProps>) => {
            let newArray: Array<{value: string, label: string}> = [];
            newArray.push({value: "", label: "Все группы"})
            data.map((element: FarmGroupProps, index: number) => {
                newArray.push({
                    value: element.id.toString(),
                    label: element.name
                })
            })
            setfarmGroups(newArray)
        })
    }, [])

    return (
        <div className="ordering" onKeyDown={onKeyDown}>
            <div className="farm_group">
                <Select
                    defaultValue={selectedFarmGroup}
                    onChange={handleTypeFarmGroup}
                    options={farmGroups}
                    isSearchable={true}
                />
            </div>
            <div className="min_max"> 
                <div className="price">
                    <input 
                        type="number"
                        placeholder="0 Р"
                        value={minPrice}
                        onChange={changeMinPrice}
                        onKeyDown={onKeyDown}
                    />
                </div>
                <div className="tire">
                    -
                </div>
                <div className="price">
                    <input 
                        type="number"
                        placeholder="0 Р"
                        value={maxPrice}
                        onChange={changeMaxPrice}
                        onKeyDown={onKeyDown}
                    />
                </div>
            </div>
        </div>
    )
}