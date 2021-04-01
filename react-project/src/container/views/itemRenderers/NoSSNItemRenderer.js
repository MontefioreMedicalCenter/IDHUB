import { Checkbox } from "@material-ui/core";
import React from "react";

const NoSSNItemRenderer = (props) => {
    const handleChangeData = () => {
        const rowData = props.row.getData()
        if (rowData.noSsn === "Y") {
            rowData.noSsn = "N"
        } else {
            rowData.noSsn = "Y"
        }
        props.grid.refreshGrid();
    }

    return (
        <div>
            <Checkbox
                id="nossnChkBox"
                // disabled={props.tabValue === 0}
                checked={Boolean(props.row.rowPositionInfo.rowData.noSsn === "Y")}
                onClick={handleChangeData}
            />
        </div>
    )
}

export default NoSSNItemRenderer;