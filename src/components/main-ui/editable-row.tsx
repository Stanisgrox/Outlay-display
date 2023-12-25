import { useEffect, useRef, useState } from "react"
import { CRUDdata, FullData, updateRow } from "../../functions/api-wrapper"
import { TableInput } from "./input"

interface IProps {
    row: FullData
    deletedRow: any
    dispatchersNum: React.Dispatch<React.SetStateAction<number>>[]
    dispatcherStr: React.Dispatch<React.SetStateAction<string>>
}


export const EditableRow = (props: IProps) => {
    const rowName = useRef(null);
    const salary = useRef(null);
    const equipmentCosts = useRef(null);
    const overheads = useRef(null);
    const estimatedProfit = useRef(null);

    const [editingRow, setEditingRow] = useState(false);


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


    return(
        <tr className="bordered-B" key = {props.row.id} >
            <td className="tablecontent">
                <div className="button-wrapper flex">
                    <button>
                        <img src="/assets/file-ico.svg" alt="ico" />
                    </button>
                    <button onClick={() => props.deletedRow(props.row.id!)}>
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
    )
}