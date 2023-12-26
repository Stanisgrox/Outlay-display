import { useEffect, useRef, useState } from "react"
import { CRUDdata, FullData, createRow, getRows, updateRow } from "../../functions/api-wrapper"
import { TableInput } from "./input"

interface IProps {
    row: FullData
    deletedRow: any
    dispatchersNum: React.Dispatch<React.SetStateAction<number>>[]
    dispatcherStr: React.Dispatch<React.SetStateAction<string>>
    recursionLevel?: number
    refresher: React.Dispatch<React.SetStateAction<FullData[] | undefined>>
}


export const EditableRow = (props: IProps) => {
    const rowName = useRef(null);
    const salary = useRef(null);
    const equipmentCosts = useRef(null);
    const overheads = useRef(null);
    const estimatedProfit = useRef(null);
    //Children
    const newRowTemplate = useRef(null);

    const _rowName = useRef(null);
    const _salary = useRef(null);
    const _equipmentCosts = useRef(null);
    const _overheads = useRef(null);
    const _estimatedProfit = useRef(null);

    //Main state
    const [editingRow, setEditingRow] = useState(false);
    const [buttonExpanded, setButtonExpanded] = useState(false);
    //Children state
    const [editingChildren, setEditingChildren] = useState(false);

    let nameInput = rowName.current;
    let salaryInput = salary.current;
    let equipmentCostsInput = equipmentCosts.current;
    let overheadsInput = overheads.current;
    let estimatedProfitInput = estimatedProfit.current;


    useEffect(() => {
        nameInput = rowName.current;
        salaryInput = salary.current;
        equipmentCostsInput = equipmentCosts.current;
        overheadsInput = overheads.current;
        estimatedProfitInput = estimatedProfit.current;
    }, []);

    function onBlur (event: React.FocusEvent<HTMLInputElement>) {

        const data: CRUDdata = {
            rowName: (nameInput as unknown as HTMLInputElement)!.value,
            salary: Number((salaryInput as unknown as HTMLInputElement)!.value),
            equipmentCosts: Number((equipmentCostsInput as unknown as HTMLInputElement)!.value),
            overheads: Number((overheadsInput as unknown as HTMLInputElement)!.value),
            estimatedProfit: Number((estimatedProfitInput as unknown as HTMLInputElement)!.value),
            mimExploitation: 0,
            machineOperatorSalary: 0,
            materials: 0,
            mainCosts: 0,
            supportCosts: 0
        }

        const id = Number(props.row.id);
        updateRow(id, data)
        setEditingRow(false)
    }

    let recursivity: number
    if (!props.recursionLevel) recursivity = 0
    else recursivity = props.recursionLevel;

    function createRowTemplate () {
        (newRowTemplate.current as unknown as HTMLTableRowElement).style.display  = "table-row";
    }

    async function uploadRow (key: string) {

        const parentId = key === 'base'? null : Number(key);
        
        const data: CRUDdata = {
            rowName: (_rowName.current as unknown as HTMLInputElement)!.value,
            salary: Number((_salary.current as unknown as HTMLInputElement)!.value),
            equipmentCosts: Number((_equipmentCosts.current as unknown as HTMLInputElement)!.value),
            overheads: Number((_overheads.current as unknown as HTMLInputElement)!.value),
            estimatedProfit: Number((_estimatedProfit.current as unknown as HTMLInputElement)!.value),
            parentId: parentId,
            mimExploitation: 0,
            machineOperatorSalary: 0,
            materials: 0,
            mainCosts: 0,
            supportCosts: 0,
        }
        return await createRow(data);
    }

    async function onEnter(event: React.KeyboardEvent<HTMLInputElement>, key: string) {
        if (event.key === 'Enter') {
            const newData = await uploadRow(key);
            (newRowTemplate.current as unknown as HTMLTableRowElement).style.display  = "none";
            props.refresher(newData);
            setEditingRow(false);
        } else return;
    }

    function ButtonHover (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (editingChildren || editingRow) return;
        setButtonExpanded(true);
    }

    return (
        <>
            <tr className="bordered-B" key = {props.row.id}>
                <td 
                    className="tablecontent"
                    style={{
                        paddingLeft: `${12 + recursivity * 20}px`
                    }}
                >
                    <div 
                        className="button-wrapper flex"
                        onMouseOver={(e) => ButtonHover(e)}
                        onMouseOut={() => setButtonExpanded(false)}
                        style={{
                            background: buttonExpanded? '' : 'none'
                        }}
                    >
                        <button onClick={() => createRowTemplate()}>
                            <img src="/assets/file-ico.svg" alt="ico" />
                        </button>
                        <button 
                            onClick={() => props.deletedRow(props.row.id!)}
                            style={{
                                display: buttonExpanded? '' : 'none'
                            }}
                        >
                            <img src="/assets/trash-ico.svg" alt="ico" />
                        </button>
                    </div>
                </td>
                <td className="tablecontent">
                    <TableInput
                        readOnly = {!editingRow}
                        defaultValue = {props.row.rowName}
                        onClick = {() => setEditingRow(true)}
                        onBlur = {(e) => onBlur(e)}
                        onChange = {e => props.dispatcherStr(e.target.value)}
                        innerref = {rowName} 
                    />
                </td>
                <td className="tablecontent">
                    <TableInput
                        type = "number"
                        readOnly = {!editingRow}
                        defaultValue = {props.row.salary}
                        onClick = {() => setEditingRow(true)}
                        onBlur = {(e) => onBlur(e)}
                        onChange = {e => props.dispatchersNum[0](Number (e.target.value))}
                        innerref = {salary}  
                    />
                </td>
                <td className="tablecontent">
                    <TableInput
                        type = "number"
                        readOnly = {!editingRow}
                        defaultValue = {props.row.equipmentCosts}
                        onClick = {() => setEditingRow(true)}
                        onBlur = {(e) => onBlur(e)}
                        onChange = {e => props.dispatchersNum[1](Number (e.target.value))}
                        innerref = {equipmentCosts}  
                    />
                </td>
                <td className="tablecontent">
                    <TableInput
                        type = "number"
                        readOnly = {!editingRow}
                        defaultValue = {props.row.overheads}
                        onClick = {() => setEditingRow(true)}
                        onBlur = {(e) => onBlur(e)}
                        onChange = {e => props.dispatchersNum[2](Number (e.target.value))}
                        innerref = {overheads}  
                    />
                </td>
                <td className="tablecontent">
                    <TableInput
                        type = "number"
                        readOnly = {!editingRow}
                        defaultValue = {props.row.estimatedProfit}
                        onClick = {() => setEditingRow(true)}
                        onBlur = {(e) => onBlur(e)}
                        onChange = {e => props.dispatchersNum[3](Number (e.target.value))}
                        innerref = {estimatedProfit}  
                    />
                </td>
            </tr>

            <tr 
                className="bordered-B"
                style={{
                    display: 'none'
                }}
                ref = {newRowTemplate}
            >
                <td 
                    className="tablecontent"
                    style={{
                        paddingLeft: `${12 + (recursivity + 1) * 20}px`
                    }}
                >
                    <button>
                        <img src = "/assets/file-ico.svg" alt = "ico" />
                    </button>
                </td>
                <td className="tablecontent">
                    <TableInput
                        placeholder = "Статья работы"
                        innerref = {_rowName}
                        onKeyDown={e => onEnter(e, props.row.id?.toString()!)}
                        onClick = {() => setEditingChildren(true)}
                    />
                </td>
                <td className="tablecontent">
                    <TableInput
                        type = "number"
                        placeholder = "Основная з/п"
                        innerref = {_salary}
                        onKeyDown={e => onEnter(e, props.row.id?.toString()!)}
                        onClick = {() => setEditingChildren(true)}
                    />
                </td>
                <td className="tablecontent">
                    <TableInput
                        type = "number"
                        placeholder = "Оборудование"
                        innerref = {_equipmentCosts}
                        onKeyDown={e => onEnter(e, props.row.id?.toString()!)}
                        onClick = {() => setEditingChildren(true)} 
                    />
                </td>
                <td className="tablecontent">
                    <TableInput
                        type = "number"
                        placeholder = "Накладные расходы"
                        innerref = {_overheads}
                        onKeyDown={e => onEnter(e, props.row.id?.toString()!)}
                        onClick = {() => setEditingChildren(true)}  
                    />
                </td>
                <td className="tablecontent">
                    <TableInput
                        type = "number"
                        placeholder = "Сметная прибыль"
                        innerref = {_estimatedProfit}
                        onKeyDown={e => onEnter(e, props.row.id?.toString()!)}
                        onClick = {() => setEditingChildren(true)} 
                    />
                </td>
            </tr>
        </>
    )
}