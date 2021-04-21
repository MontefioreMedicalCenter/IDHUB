import React from 'react'
import { Button } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import { useDispatch } from 'react-redux'
import { setDocumentLibrary } from '../../../AppConfig/store/actions/workListSheet'
import {
	showDelete,
	showUpload
} from '../../../AppConfig/store/actions/documentLibrary'

const UploadOrViewFile = props => {
	const dispatch = useDispatch()

	const handleClick = () => {
		const rowData = props.row.getData()

		if (rowData.worklistStatus !== 'Processed') {
			dispatch(showDelete(true))
			dispatch(showUpload(true))
		}
		dispatch(setDocumentLibrary(rowData.fileList))
		props.column.documentClick(props)
	}

	if (
		props.cell.rowInfo.getIsDataRow() &&
		props.cell.level.getNestDepth() === 1
	) {
		if (props.cell.rowInfo.getData().worklistStatus !== 'OnHold') {
			return (
				<Button onClick={handleClick}>
					<FolderIcon fontSize="small" style={{ fill: '#1daed6' }} />
				</Button>
			)
		} else {
			return null
		}
	}
	return null
}
export default UploadOrViewFile
