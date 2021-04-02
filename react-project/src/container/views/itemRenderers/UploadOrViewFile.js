import React from 'react'
import { Button } from "@material-ui/core"
import FolderIcon from '@material-ui/icons/Folder';

const UploadOrViewFile = () => {
    return (
        <Button>
            <FolderIcon fontSize="small" style={{ fill: '#1daed6' }} />
        </Button>
    )
}
export default UploadOrViewFile