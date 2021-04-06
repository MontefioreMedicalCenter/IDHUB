import { Checkbox } from '@material-ui/core'
import React from 'react'

const EpcsHardTokenRequest = (props) => {
    const handleChangeData = () => {
        const rowData = props.row.getData()
        if (rowData.epcsHardTokenRequest === "Y") {
            rowData.epcsHardTokenRequest = "N"
        } else {
            rowData.epcsHardTokenRequest = "Y"
        }
        props.cell.refreshCell();
    }
    return (
        <div>
            <Checkbox
                id="epcsChkBox"
                disabled={props.column.valueOfTab !== 0}
                checked={Boolean(props.row.rowPositionInfo.rowData.epcsHardTokenRequest === "Y")}
                onClick={handleChangeData}
            />
        </div>
    )
}

export default EpcsHardTokenRequest