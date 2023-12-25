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

    var localData = JSON.parse(localStorage.getItem('data') || '{}') as FullData[];

    if (data.parentId != null) {
        const parent = localData.find(element => element.id === data.parentId);
        if (!parent) return;
        if (!parent.child) parent.child = [];

        const newObject = await axios.post(`${BASE_URL}/v1/outlay-rows/entity/${Entity.id}/row/create`, data);
        parent.child.push(newObject.data.current as FullData);
        localData = localData.filter(item => item.id !== data.parentId)
        localData.push(parent);
    } else {
        const newObject = await axios.post(`${BASE_URL}/v1/outlay-rows/entity/${Entity.id}/row/create`, data);
        localData.push(newObject.data.current);
    }
    localStorage.setItem('data', JSON.stringify(localData));
    return localData;
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
        return newData;
    } catch (err) {console.log(err)}
}