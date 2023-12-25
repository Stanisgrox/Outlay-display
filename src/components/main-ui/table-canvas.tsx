import { useEffect, useState } from "react"
import { CRUDdata, FullData, createRow, deleteRow, getRows } from "../../functions/api-wrapper";
import { WorkHeader } from "../work-header";
import { TableInput } from "./input";
import { EditableRow } from "./editable-row";

interface TreeProps {
    data: FullData [] | undefined
    deletedRow: any
    dispatchersNum: any[]
    setrowName: any
    recursionLevel: number
}

interface TreeItemProps extends Omit<TreeProps, 'data'> {
    row: FullData
}

function RenderTree (props: TreeProps) {
    return (
        <>
            {props.data?.map((row) => (
                <>
                    <TreeItem 
                        row = {row}
                        deletedRow = {props.deletedRow} 
                        dispatchersNum = {[props.dispatchersNum[0], props.dispatchersNum[1], props.dispatchersNum[2],props.dispatchersNum[3]]}
                        setrowName = {props.setrowName}
                        recursionLevel = {props.recursionLevel}
                        key = {row.id} 
                    />
                    {Array.isArray(row.child) && 
                        <RenderTree 
                            data = {row.child}
                            deletedRow = {props.deletedRow} 
                            dispatchersNum = {[props.dispatchersNum[0], props.dispatchersNum[1], props.dispatchersNum[2],props.dispatchersNum[3]]}
                            setrowName = {props.setrowName}
                            recursionLevel = {props.recursionLevel + 1}
                        />
                    }                  
                </>
            ))}
        </>
    )
}

function TreeItem (props: TreeItemProps) {
    return (
        <>
            <EditableRow 
                row = {props.row} 
                deletedRow = {props.deletedRow} 
                key = {props.row.id}
                dispatchersNum = {[props.dispatchersNum[0], props.dispatchersNum[1], props.dispatchersNum[2],props.dispatchersNum[3]]}
                dispatcherStr = {props.setrowName}
                recursionLevel = {props.recursionLevel} 
            />
            
        </>
    )
}


export const TableCanvas = () => {
    const [data, setData] = useState<FullData[]>();
    const [rowName, setrowName] = useState('');
    const [salary, setsalary] = useState(0);
    const [equipmentCosts, setequipmentCosts] = useState(0);
    const [overheads, setoverheads] = useState(0);
    const [estimatedProfit, setestimatedProfit] = useState(0);

    useEffect(() => {
        async function updateData() {
            let temp = await getRows();
            setData(temp);
        }

        updateData();
    },[])

    async function uploadRow (key: string) {

        const parentId = key === 'base'? null : Number(key);

        const data: CRUDdata = {
            rowName: rowName,
            salary: salary,
            equipmentCosts: equipmentCosts,
            overheads: overheads,
            estimatedProfit: estimatedProfit,
            parentId: parentId,
            mimExploitation: 0,
            machineOperatorSalary: 0,
            materials: 0,
            mainCosts: 0,
            supportCosts: 0
        }

        const newdata = await createRow(data);
        setData(newdata);
    }

    async function deletedRow(id: number | string) {
        setData(await deleteRow(Number (id)));
    }
    
    async function onEnter(event: React.KeyboardEvent<HTMLInputElement>, key: string) {
        if (event.key === 'Enter') {
            uploadRow(key);
        } else return;
    }

    return (
        <div>
            <WorkHeader />
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr className = "bordered-B table-captions innactive-text">
                            <td className = "tableheader">
                                Уровень
                            </td>
                            <td className = "tableheader">
                                Наименование работ
                            </td>
                            <td className = "tableheader">
                                Основная з/п
                            </td>
                            <td className = "tableheader">
                                Оборудование
                            </td>
                            <td className = "tableheader">
                                Накладные расходы
                            </td>
                            <td className = "tableheader">
                                Сметная прибыль
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <RenderTree 
                            data={data}
                            deletedRow = {deletedRow} 
                            dispatchersNum = {[setsalary, setequipmentCosts, setoverheads, setestimatedProfit]}
                            setrowName = {setrowName}
                            recursionLevel = {0}
                        />
                    </tbody>
                    <tfoot>
                        <tr className="bordered-B">
                            <td className="tablecontent">
                                <button id = "base-send" onClick = {() => uploadRow('base')} >
                                    <img src = "/assets/file-ico.svg" alt = "ico" />
                                </button>
                            </td>
                            <td className="tablecontent">
                                <TableInput 
                                    placeholder = "Статья работы" 
                                    id = "base-rowName"
                                    onChange = {e => setrowName(e.target.value)}
                                    onKeyDown={e => onEnter(e, 'base')} 
                                />
                            </td>
                            <td className="tablecontent">
                                <TableInput
                                    type = "number" 
                                    placeholder = "Основная з/п" 
                                    id = "base-salary"
                                    onChange = {e => setsalary(Number(e.target.value))}
                                    onKeyDown={e => onEnter(e, 'base')}   
                                />
                            </td>
                            <td className="tablecontent">
                                <TableInput
                                    type = "number"  
                                    placeholder = "Оборудование" 
                                    id = "base-equipmentCosts"
                                    onChange = {e => setequipmentCosts(Number(e.target.value))}
                                    onKeyDown={e => onEnter(e, 'base')}  
                                />
                            </td>
                            <td className="tablecontent">
                                <TableInput 
                                    type = "number" 
                                    placeholder = "Накладные расходы" 
                                    id = "base-overheads"
                                    onChange = {e => setoverheads(Number(e.target.value))}
                                    onKeyDown={e => onEnter(e, 'base')}  
                                />
                            </td>
                            <td className="tablecontent">
                                <TableInput 
                                    type = "number" 
                                    placeholder = "Сметная прибыль" 
                                    id = "base-estimatedProfit"
                                    onChange = {e => setestimatedProfit(Number(e.target.value))}
                                    onKeyDown={e => onEnter(e, 'base')}   
                                />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}