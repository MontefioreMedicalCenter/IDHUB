import { Checkbox } from '@material-ui/core'
import React from 'react'

const EpfRequestRenderer = (props) => {

    const handleChangeData = () => {
        const rowData = props.row.getData()
        if (rowData.epfRequest === "Y") {
            rowData.epfRequest = "N"
        } else {
            rowData.epfRequest = "Y"
        }
        props.grid.refreshGrid();
    }
    return (
        <div>
            <Checkbox
                id="epfChkBox"
                // disabled={props.tabValue === 0}
                checked={Boolean(props.row.rowPositionInfo.rowData.epfRequest === "Y")}
                onClick={handleChangeData}
            />
        </div>
    )
}

export default EpfRequestRenderer