import React from 'react'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'

const EndDateRenderer = props => {
	const handleDateChange = date => {
		props.row.rowPositionInfo.rowData.endDate = date
		props.cell.refreshCell()
	}

	return (
		<MaterialDatePicker
			keyboard
			color=" "
			format={'MM/DD/YYYY'}
			key={`${props.row.rowPositionInfo.rowData.sourceUniqueId}2`}
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
			selectedDate={new Date(props.row.rowPositionInfo.rowData.endDate)}
			style={{
				minWidth: 100
			}}
			onDateChange={handleDateChange}
		/>
	)
}

export default EndDateRenderer
