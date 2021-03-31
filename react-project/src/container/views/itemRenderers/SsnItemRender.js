import React from "react";
import { TextInput } from "../../../flexicious";

const SsnItemRender = (props) => {
    return (
        <div>
            <TextInput
                text={props.row.rowPositionInfo.rowData.ssn}
                // visible="{this.data is IdWorklist?true:false}"
                maxChars="11"
                restrict="0-9"
                displayAsPassword="true"
                // focusIn="if (editable) this.displayAsPassword = false;"
                // focusOut="if (!editable) this.displayAsPassword = true;"
                editable="false"
                borderVisible="false"
            // contentBackgroundColor="{(this.data as IdWorklist).worklistGroup.workLists.length==1?0xe1eef7:0xffffff}"
            />
        </div>
    )

}

export default SsnItemRender;