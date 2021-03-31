import { Checkbox } from "@material-ui/core";
import React from "react";

const EpicRequestRenderer = (props) => {

    return (
        <div>
            <Checkbox
                id="epicChkBox"
                checked={Boolean(props.row.rowPositionInfo.rowData.epicRequest === "Y")}
                // enabled={(props.row.rowPositionInfo.rowData.edit === true)} //this.outerDocument.searchTb.viewStack.selectedIndex === 0 &&
                // visible="{this.data is IdWorklist?true:false}"
                // selected="{data.epicRequest=='Y'?true:false}"

                onClick={() => Boolean(props.row.rowPositionInfo.rowData.epicRequest === "Y") ? props.row.rowPositionInfo.rowData.epicRequest = "N" : props.row.rowPositionInfo.rowData.epicRequest = "Y"}
                styleName="checkBoxStyle"
            // change="epicChkBox_changeHandler(event)"
            />
        </div>
    )
}

export default EpicRequestRenderer;