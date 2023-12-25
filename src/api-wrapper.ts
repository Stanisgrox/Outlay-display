import axios from "axios"
import { Entity } from "./config/main_entity"

const BASE_URL = 'http://185.244.172.108:8081'

export interface CRUDdata {
    equipmentCosts?: number
    estimatedProfit?: number,
    machineOperatorSalary?: number
    mainCosts?: number
    materials?: number
    mimExploitation?: number
    overheads?: number
    parentId?: number | null
    rowName: string
    id?: number
    salary?: number
    supportCosts?: number
}

export async function createRow (data: CRUDdata) {
    if (!data.rowName) return;
    if (!data.parentId) data.parentId = null;

    const result = await axios.post(`${BASE_URL}/v1/outlay-rows/entity/${Entity.id}/row/create`, data)
    console.log(result);
    return result;
}

export async function getRows() {
    try {
        const result = await axios.get(`${BASE_URL}/v1/outlay-rows/entity/${Entity.id}/row/list`)
        return result.data;
    } catch(err) {console.log(err)}
}

export async function deleteRow(id: number) {
    console.log('Clicked')
    try {
        const result = await axios.delete(`${BASE_URL}/v1/outlay-rows/entity/${Entity.id}/row/${id}/delete`)
        return result.data;
    } catch (err) {console.log(err)}
}