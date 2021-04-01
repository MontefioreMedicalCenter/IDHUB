// import { TextField } from "@material-ui/core";
import React from "react";
import { TextInput } from "../../../flexicious";

const SsnItemRender = (props) => {


    return (
        <div>
            <TextInput
                value={props.row.rowPositionInfo.rowData.ssn}
                inputProps={{ maxLength: 5 }}
                displayAsPassword={true}
                editable={false}
                text={props.row.rowPositionInfo.rowData.ssn}
                maxChars={11}
                restrict="0-9"
            />

        </div>
    )

}

export default SsnItemRender;