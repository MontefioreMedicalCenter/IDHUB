import React from 'react'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'

const StartDateRenderer = props => {
	const handleDateChange = date => {
		props.row.rowPositionInfo.rowData.dateOfBirth = date
		props.cell.refreshCell()
	}

	return (
		<MaterialDatePicker
			keyboard
			color=" "
			format={'MM/DD/YY'}
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
			selectedDate={new Date(props.row.rowPositionInfo.rowData.startDate)}
			style={{
				minWidth: 100,
				padding: '0px'
			}}
			onDateChange={handleDateChange}
		/>
	)
}

export default StartDateRenderer
