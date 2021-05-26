import React from 'react'
import { toast } from 'react-toastify'
import { UIComponent } from '../../../flexicious'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'

const DateOfBirthRenderer = props => {
	const handleDateChange = date => {
		var now = new Date()
		var frmDate = new Date(
			now.getFullYear() - 100,
			now.getMonth(),
			now.getDate()
		)
		var toDate = new Date(
			now.getFullYear() - 10,
			now.getMonth(),
			now.getDate()
		)
		if(date > frmDate && date < toDate)
		{props.row.rowPositionInfo.rowData.dateOfBirth = date
		props.cell.refreshCell()
		const container = props.cell.getGrid().getBodyContainer()
		if (container._inEdit) {
			container.endEdit(container.getEditor())
		}}else{
			toast.warning("Invalid DOB date")
		}
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
						height: '24px',
						// padding: '5px',
						minWidth: '60px',
						width: '100%',
						fontSize: '12px'
					}
				}
			}}
			selectedDate={props.row.rowPositionInfo.rowData.dateOfBirth ? new Date(props.row.rowPositionInfo.rowData.dateOfBirth) : null}
			style={{
				minWidth: "100%"
			}}
			onDateChange={(date) => handleDateChange(date)}
			
		/>
	)
}

class EditorWrapper extends UIComponent {
	render() {
		const cell = this.cell
		const cellProps = {
			cell: cell,
			row: cell.rowInfo,
			column: cell._column,
			level: cell.level,
			grid: cell.level.grid
		}
		this.children = [<DateOfBirthRenderer {...cellProps} />]
		return super.render()
	}
}
DateOfBirthRenderer.editorWrapper = EditorWrapper

export default DateOfBirthRenderer
