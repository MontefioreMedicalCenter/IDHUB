import React from 'react'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'

const CreateDateRenderer = props => {
	const handleDateChange = event => {
		props.row.rowPositionInfo.rowData.dateOfBirth = event
		props.cell.refreshCell()
	}

	return (
		<MaterialDatePicker
			keyboard
			color=" "
			format={'DD/MM/YYYY'}
			key={props.row.rowPositionInfo.rowData.createDate}
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
			selectedDate={new Date(props.row.rowPositionInfo.rowData.createDate)}
			style={{
				minWidth: 100
			}}
			onDateChange={handleDateChange}
		/>
	)
}

export default CreateDateRenderer
