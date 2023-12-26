import axios from "axios"
import { Entity } from "../config/main_entity"

const BASE_URL = 'http://185.244.172.108:8081'

export interface CRUDdata {
    rowName: string,
    salary?: number,
    mimExploitation?: number,
    machineOperatorSalary?: number,
    materials?: number,
    mainCosts?: number,
    supportCosts?: number,
    equipmentCosts?: number,
    overheads?: number,
    estimatedProfit?: number,
    parentId?: number | null
}

export interface FullData extends CRUDdata {
    id?: number
    total?: number,
    child?: FullData[],
}

export async function createRow (data: CRUDdata) {
    if (!data.rowName) return;
    if (!data.parentId) data.parentId = null;

    try {
        var localData = JSON.parse(localStorage.getItem('data') || '{}') as FullData[];
        
        await axios.post(`${BASE_URL}/v1/outlay-rows/entity/${Entity.id}/row/create`, data);
        const newObject = await axios.get(`${BASE_URL}/v1/outlay-rows/entity/${Entity.id}/row/list`);
        localData = newObject.data;
        localStorage.setItem('data', JSON.stringify(localData));

        return localData;
    } catch(err) {console.log(err)}
}

export async function getRows() {
    try {
        const result = await axios.get(`${BASE_URL}/v1/outlay-rows/entity/${Entity.id}/row/list`);
        const data = result.data;
        localStorage.setItem('data', JSON.stringify(data));
        return data;
    } catch(err) {console.log(err)}
}

export async function deleteRow(id: number) {
    try {
        await axios.delete(`${BASE_URL}/v1/outlay-rows/entity/${Entity.id}/row/${id}/delete`);
        
        const localData = JSON.parse(localStorage.getItem('data') || '{}');
        const newData = localData.filter((item: { id: number }) => item.id !== id);
        localStorage.setItem('data', JSON.stringify(newData));

        return (await axios.get(`${BASE_URL}/v1/outlay-rows/entity/${Entity.id}/row/list`)).data;
    } catch (err) {console.log(err)}
}

export async function updateRow(id:number, data: CRUDdata) {
    try {
        await axios.post(`${BASE_URL}/v1/outlay-rows/entity/${Entity.id}/row/${id}/update`, data);
        const refreshedData = await getRows();
        localStorage.setItem('data', JSON.stringify(refreshedData))
        return refreshedData;
    } catch (err) {console.log(err)}
}