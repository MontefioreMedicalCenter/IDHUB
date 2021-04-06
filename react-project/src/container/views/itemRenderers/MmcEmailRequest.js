import { Checkbox } from '@material-ui/core'
import React from 'react'

const MmcEmailRequest = (props) => {
    const handleChangeData = () => {
        const rowData = props.row.getData()
        if (rowData.mmcEmailRequest === "Y") {
            rowData.mmcEmailRequest = "N"
        } else {
            rowData.mmcEmailRequest = "Y"
        }
        props.cell.refreshCell();
    }
    return (
        <div>
            <Checkbox
                id="mmcEmailChkBox"
                disabled={props.column.valueOfTab !== 0}
                checked={Boolean(props.row.rowPositionInfo.rowData.mmcEmailRequest === "Y")}
                onClick={handleChangeData}
            />

        </div>
    )
}

export default MmcEmailRequest