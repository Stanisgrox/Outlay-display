import { useEffect, useState } from "react"
import { CRUDdata, deleteRow, getRows } from "../../api-wrapper";
import { WorkHeader } from "../work-header";
import { TableInput } from "./input";

export const TableCanvas = () => {
    const [data, setData] = useState<CRUDdata[]>();

    useEffect(() => {
        async function updateData() {
            let temp = await getRows();
            setData(temp);
        }

        updateData();
    },[])
    
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
                        {data?.map((row: CRUDdata) => (
                            <tr className="bordered-B" key = {row.id}>
                                <td className="tablecontent">
                                    <div>
                                        <img src="/assets/file-ico.svg" alt="ico" />
                                        <img src="/assets/trash-ico.svg" alt="ico" onClick={() => deleteRow(row.id!)}/>
                                    </div>
                                </td>
                                <td className="tablecontent">
                                    {row.rowName}
                                </td>
                                <td className="tablecontent">
                                    {row.salary}
                                </td>
                                <td className="tablecontent">
                                    {row.equipmentCosts}
                                </td>
                                <td className="tablecontent">
                                    {row.overheads}
                                </td>
                                <td className="tablecontent">
                                    {row.estimatedProfit}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bordered-B">
                            <td className="tablecontent">
                            </td>
                            <td className="tablecontent">
                                <TableInput />
                            </td>
                            <td className="tablecontent">
                                <TableInput />
                            </td>
                            <td className="tablecontent">
                                <TableInput />
                            </td>
                            <td className="tablecontent">
                                <TableInput />
                            </td>
                            <td className="tablecontent">
                                <TableInput />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}