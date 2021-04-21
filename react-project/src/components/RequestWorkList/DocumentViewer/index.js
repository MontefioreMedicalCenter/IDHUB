import React from 'react'
import './requestDoc.styles.scss'
import { Paper } from '@material-ui/core'

const DocumentViewer = ({ documentFileUrl }) => {
	return (
		<div className="request-doc-main-container">
			<Paper className="request-doc-innner-container">
				<iframe
					title="Document Frame"
					src={documentFileUrl}
					style={{ height: 'calc(100% - 5px)', width: 'calc(100% - 5px)' }}
				/>
			</Paper>
		</div>
	)
}

export default DocumentViewer
