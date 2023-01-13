import React from "react";

export type FarmGroupProps = {
    id: number,
    name: string,
}

export type StatusProps = {
    id: number,
    name: string,
}

export type MedicineProps = {
    id: number,
    name: string,
    indications_for_use: string,
    contraindications: string,
    other_info: string,
    price: number,
    count: number,
    farm_group: number,
}

export type ShortMedicineProps = {
    id: number,
    name: string,
    price: number,
    count: number,
    farm_group: string,
}

export type MedicineComponentProps = {
    medicine: MedicineProps,
    farm_group: string,
}

export type OrderProps = {
    id: number,
    count: number,
    paid_date: string,
    sent_date: string,
    delivered_date: string,
    user: number,
    status: number,
}

export type ProductProps = {
    id: number,
    count: number,
    paid_date: string,
    sent_date: string,
    delivered_date: string,
    user: number,
    medicine: number,
    order: number,
    status: number,
}

export type FullProductProps = {
    id: number,
    count: number,
    paid_date: string,
    sent_date: string,
    delivered_date: string,
    user: number,
    medicine: ShortMedicineProps,
    order: number,
    status: number,
}

export type FullOrderProps = {
    id: number,
    count: number,
    paid_date: string,
    sent_date: string,
    delivered_date: string,
    user: number,
    status: number,
    products: Array<FullProductProps>
}

export type UserProps = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    is_staff: boolean,
}

export type TokenProps = {
    access: string,
    refresh: string
}

