import { Checkbox } from "@material-ui/core";
import React from "react";
// import { RowInfo } from "../../../flexicious";

const NoSSNItemRenderer = (props) => {
    return (
        <div>
            <Checkbox
                id="nossnChkBox"
                checked={props.row.rowPositionInfo.rowData.noSSN === 'Y' ? true : false}
                visible={props.row.rowPositionInfo.rowData.IdWorklist ? true : false}
            />
        </div>
    )
}

export default NoSSNItemRenderer;