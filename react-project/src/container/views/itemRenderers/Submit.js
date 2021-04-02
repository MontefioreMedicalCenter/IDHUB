import React from 'react'
import { Button } from "@material-ui/core"
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

const Submit = () => {
    return (
        <Button>
            <CheckCircleTwoToneIcon fontSize="small" style={{ fill: '#008000' }} />
        </Button>
    )
}

export default Submit