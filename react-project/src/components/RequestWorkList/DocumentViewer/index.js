import React from 'react'
import './requestDoc.styles.scss'
import { Paper } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { showMessage } from '../../../AppConfig/store/actions/homeAction'

const DocumentViewer = ({ documentFileUrl, onClose }) => {
	const dispatch = useDispatch()

	const onUploadComplete = (event) => {
		var iframe = document.getElementById('iframe')
		var extension = iframe.src
		if (!extension.substring(extension.lastIndexOf(".")) === ".png" ||
			!extension.substring(extension.lastIndexOf(".")) === ".jpg" ||
			!extension.substring(extension.lastIndexOf(".")) === ".jpeg") {
			if (!iframe.contentWindow.length > 0) {
				dispatch(
					showMessage(
						"We can't open this file",
						'something went wrong',
						'OK',
						() => {
							onClose(false)
						}
					)
				)
			}
		}
	}
	return (
		<div className="request-doc-main-container">
			<Paper className="request-doc-innner-container">
				<iframe
					id="iframe"
					title="Document Frame"
					src={documentFileUrl}
					onLoad={(event) => onUploadComplete(event)}
					style={{ height: 'calc(100% - 5px)', width: 'calc(100% - 5px)' }}
				/>
			</Paper>
		</div>
	)
}

export default DocumentViewer
