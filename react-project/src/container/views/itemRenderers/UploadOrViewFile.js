import React from 'react'
import { Button } from "@material-ui/core"
import FolderIcon from '@material-ui/icons/Folder';

const UploadOrViewFile = (props) => {
    if (props.cell.rowInfo.getIsDataRow() && props.cell.level.getNestDepth() === 1) {
        if (props.cell.rowInfo.getData().worklistStatus !== 'OnHold') {
            return (
                <Button>
                    <FolderIcon fontSize="small" style={{ fill: '#1daed6' }} />
                </Button>
            )
        } else {
            return null
        }
    } return null

}
export default UploadOrViewFile