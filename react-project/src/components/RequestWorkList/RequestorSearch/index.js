import { Button, Checkbox } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showMessage } from '../../../AppConfig/store/actions/homeAction'
import WorklistService from '../../../service/cfc/WorklistService'
import MontefioreUtils from '../../../service/utils/MontefioreUtils'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'
import './requestSearch.scss'

const RequestorSearch = ({ findWorklist, valueOfTab }) => {
	const dispatch = useDispatch()
	const fileName = useRef(null)
	const [groupCheckbox, setGroupCheckbox] = useState(true)
	const [errorTxt, setErrorTxt] = useState('')

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
		setErrorTxt('')
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
			{valueOfTab === 0 ? (
				<div className="upload-inner-container">
					Bulk import:{' '}
					<div ref={fileName} className="upload-file-name" onClick={LocateFile}>
						<span>browse...</span>
					</div>
					<input
						id="uploaderBulkDocs"
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
			) : (
				<div style={{display: 'flex', alignItems: 'center'}}>
					<div className="upload-inner-container">
						Processed Date &nbsp; From:{' '}
						<MaterialDatePicker
							keyboard
							color=" "
							format={'DD/MM/YYYY'}
							InputProps={{
								inputProps: {
									style: {
										height: '30px',
										padding: '5px',
										width: '75px',
										fontSize: 'small'
									}
								}
							}}
							style={{
								minWidth: 100
							}}
						/>
						&nbsp; To:{' '}
						<MaterialDatePicker
							keyboard
							color=" "
							format={'DD/MM/YYYY'}
							InputProps={{
								inputProps: {
									style: {
										height: '30px',
										padding: '5px',
										width: '75px',
										fontSize: 'small'
									}
								}
							}}
							style={{
								minWidth: 100
							}}
						/>
						&nbsp; First Name &nbsp;
						<input type="text" style={{ width: '70px' }} />
						&nbsp; Last Name &nbsp;
						<input type="text" style={{ width: '70px' }} />
						&nbsp; Processed{' '}
						<Checkbox
							size="small"
							color="primary"
							checked={groupCheckbox}
							onChange={(e, value) => {
								setGroupCheckbox(value)
							}}
						/>{' '}
					</div>
					<div className="button">
						<Button
							variant="contained"
							color="primary"
							size="small"
							style={{
								maxWidth: '30px',
								height: '20px',
								fontSize: 'xx-small'
							}}>
							Search
						</Button>
						&nbsp;
						<Button
							variant="contained"
							color="primary"
							size="small"
							style={{
								maxWidth: '30px',
								height: '20px',
								fontSize: 'xx-small'
							}}>
							Clear
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}

export default RequestorSearch
