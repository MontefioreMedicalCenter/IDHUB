import React from 'react'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'

const DateOfBirthRenderer = props => {
	const handleDateChange = date => {
		props.row.rowPositionInfo.rowData.dateOfBirth = date
		props.cell.refreshCell()
	}

	return (
		<MaterialDatePicker
			keyboard
			color=" "
			format={'DD/MM/YYYY'}
			key={props.row.rowPositionInfo.rowData.worklistId}
			InputProps={{
				inputProps: {
					style: {
						height: '30px',
						padding: '5px',
						width: '100%',
						fontSize: 'small'
					}
				}
			}}
			selectedDate={new Date(props.row.rowPositionInfo.rowData.dateOfBirth)}
			style={{
				minWidth: 100
			}}
			onDateChange={handleDateChange}
		/>
	)
}

export default DateOfBirthRenderer
