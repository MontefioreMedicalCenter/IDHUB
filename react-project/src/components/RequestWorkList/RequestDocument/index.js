import React from 'react';
import './requestDoc.styles.scss'
import { Paper } from '@material-ui/core';

const RequestDocument = () => {
    return (
        <div className="request-doc-main-container" >
            <Paper className="request-doc-innner-container">
                <div className="filename-header">File Name</div>
            </Paper>
        </div>

    )
}

export default RequestDocument;