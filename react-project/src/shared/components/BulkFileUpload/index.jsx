import { Checkbox } from "@material-ui/core"
import React from "react"
import ImportButton from "../ImportButton"

const BulkFileUpload = () => {
    return (
        <div>
            Bulk import: <input type="textfield" placeholder="browse.." disabled /> &nbsp; As Group <Checkbox size="small" color="primary" /> &nbsp; <ImportButton />
        </div>
    )
}

export default BulkFileUpload