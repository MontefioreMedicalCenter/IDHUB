import { Button, Checkbox } from '@material-ui/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showMessage } from '../../../AppConfig/store/actions/homeAction'
import WorklistService from '../../../service/cfc/WorklistService'
import MontefioreUtils from '../../../service/utils/MontefioreUtils'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'
import './requestSearch.scss'

const RequestorSearch = ({ findWorklist, valueOfTab, setWorkList, dataGrid }) => {
	var now = new Date()
	var currentDate = now.getDate()
	var currentMonth = now.getMonth()
	var currentYear = now.getFullYear()
	var lastMonth = new Date(currentYear, currentMonth - 1, currentDate)

	const wlservice = WorklistService.getInstance()

	const dispatch = useDispatch()
	const fileName = useRef(null)
	const [groupCheckbox, setGroupCheckbox] = useState(true)
	const [startDate, setStartDate] = useState(lastMonth)
	const [endDate, setEndDate] = useState(now)
	const [firstName, setFirstName] = useState('')
	const [lastName, setlastName] = useState('')
	const [errorTxt, setErrorTxt] = useState('')

	var file = null

	const refreshTab = useCallback(() => {
		if(dataGrid) {
			dataGrid.clearAllFilters();
			dataGrid.refreshCells();
			if(valueOfTab === 0 ) {
				dataGrid.showAddEmployee = true
				findWorklist();
			} else {
				dataGrid.showAddEmployee = false
				dataGrid.setDataProvider([])
			}
		}
	}, [valueOfTab, dataGrid, findWorklist])

	useEffect(() => {
		refreshTab(valueOfTab)
		// eslint-disable-next-line
	}, [valueOfTab])


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
				String(groupCheckbox),
				loadWorklistFromSpreadsheetResultEvent,
				MontefioreUtils.showError
			)
		}
	}

	const loadWorklistFromSpreadsheetResultEvent = resp => {
		findWorklist()
		setErrorTxt(resp.result.message)
	}

	const handleStartDateChange = date => {
		setStartDate(date)
	}

	const handleEndDateChange = date => {
		setEndDate(date)
	}

	const findProcessedWorklists = event => {
		var MS_PER_DAY = 1000 * 60 * 60 * 24
		var dateDiff = new Date(startDate.getTime() - endDate.getTime())
		var difference = Math.abs(Math.round(dateDiff.getTime() / MS_PER_DAY))
		if (startDate === null || endDate === null || startDate > endDate) {
			alert(
				'Processed Start and End Dates are required and Start Date should be less than End Date.'
			)
			return
		} else if (difference > 180) {
			alert('Please select Date Range within six months.')
			return
		}
		wlservice.findProcessedWorklistGroups(
			startDate,
			endDate,
			firstName,
			lastName,
			resultHandler,
			MontefioreUtils.showError
		)
	}

	const resultHandler = resp => {
		resp.result && setWorkList({ workList: resp.result })
	}

	const clearSearch = () => {
		setStartDate(lastMonth)
		setEndDate(new Date())
		setFirstName('')
		setlastName('')
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
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div className="upload-inner-container">
						Processed Date &nbsp; From: &nbsp;
						<MaterialDatePicker
							keyboard
							color=" "
							format={'MM/DD/YYYY'}
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
							selectedDate={startDate}
							onDateChange={handleStartDateChange}
							style={{
								minWidth: 100
							}}
						/>
						&nbsp; To: &nbsp;
						<MaterialDatePicker
							keyboard
							color=" "
							format={'MM/DD/YYYY'}
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
							selectedDate={endDate}
							onDateChange={handleEndDateChange}
							style={{
								minWidth: 100
							}}
						/>
						&nbsp; First Name &nbsp;
						<input
							type="text"
							style={{ width: '70px' }}
							onChange={e => setFirstName(e.target.value)}
							value={firstName}
						/>
						&nbsp; Last Name &nbsp;
						<input
							type="text"
							style={{ width: '70px' }}
							onChange={e => setlastName(e.target.value)}
							value={lastName}
						/>
						&nbsp; Processed{' '}
						<Checkbox
							size="small"
							color="primary"
							checked={true}
						/>{' '}
					</div>
					<div className="button">
						<Button
							variant="contained"
							color="primary"
							size="small"
							onClick={findProcessedWorklists}
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
							onClick={clearSearch}
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
