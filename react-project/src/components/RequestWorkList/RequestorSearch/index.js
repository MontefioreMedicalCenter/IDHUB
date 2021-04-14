import { Button, Checkbox } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showMessage } from '../../../AppConfig/store/actions/homeAction'
import WorklistService from '../../../service/cfc/WorklistService'
import MontefioreUtils from '../../../service/utils/MontefioreUtils'
import './requestSearch.scss'

const RequestorSearch = ({ findWorklist }) => {
	const dispatch = useDispatch()
	const fileName = useRef(null)
	const [groupCheckbox, setGroupCheckbox] = useState(true)
	const [errorTxt, setErrorTxt] = useState("")

	var file = null

	const LocateFile = () => {
		const ele = document.getElementById('uploaderBulkDocs')

		if (ele) {
			ele.onchange = e => onFileSelect(e)
			ele.click()
		}
	}

	const onFileSelect = event => {
		file = event.target
		if (
			file.files[0].name.indexOf('.xlsx') < 0 ||
			file.files[0].name.indexOf('.xls') < 0
		) {
			dispatch(
				showMessage(
					'Cancel Upload',
					'Bulk Import File should be an Excel File!. Please review and upload again.',
					'OK',
					() => {},
					() => {}
				)
			)
			return
		}
		if (file.files[0]) {
			fileName.current.innerText = file.files[0].name
			fileName.current.style.color = 'black'
			fileName.current.style.fontStyle = 'italic'
		}
	}

	const onLoadComplete = () => {
		dispatch(
			showMessage(
				'Confirm Upload',
				'Are you sure you want to upload this file?',
				'YES_NO',
				onConfirm,
				() => {}
			)
		)
	}

	const onConfirm = () => {
		setErrorTxt("")
		if (file && file.files) {
			WorklistService.getInstance().loadWorklistFromSpreadsheet(
				file.files,
				groupCheckbox,
				loadWorklistFromSpreadsheetResultEvent,
				MontefioreUtils.showError
			)
		}
	}

	const loadWorklistFromSpreadsheetResultEvent = resp => {
		findWorklist()
		setErrorTxt(resp.result)
	}

	return (
		<div className="upload-container">
			<span className="error-txt">{errorTxt}</span>
			<div className="upload-inner-container">
				Bulk import:{' '}
				<div ref={fileName} className="upload-file-name" onClick={LocateFile}>
					<span>browse...</span>
				</div>
				<input
					id="uploaderBulkDocs"
					accept={'.xls, .xlsx'}
					style={{ display: 'none' }}
					type="file"
				/>{' '}
				&nbsp; As Group{' '}
				<Checkbox
					size="small"
					color="primary"
					checked={groupCheckbox}
					onChange={(e, value) => {
						setGroupCheckbox(value)
					}}
				/>{' '}
				&nbsp;{' '}
				<Button
					variant="contained"
					color="primary"
					onClick={onLoadComplete}
					size="small"
					style={{ maxWidth: '30px', height: '20px', fontSize: 'xx-small' }}>
					import
				</Button>
			</div>
		</div>
	)
}

export default RequestorSearch
