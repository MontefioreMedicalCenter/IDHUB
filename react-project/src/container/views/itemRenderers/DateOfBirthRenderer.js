import React from 'react'
import { UIComponent } from '../../../flexicious'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'

const DateOfBirthRenderer = props => {
	const handleDateChange = date => {
		props.row.rowPositionInfo.rowData.dateOfBirth = date
		props.cell.refreshCell()
		const container = props.cell.getGrid().getBodyContainer()
		if (container._inEdit) {
			container.endEdit(container.getEditor())
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
						height: '30px',
						padding: '5px',
						width: '100%',
						fontSize: 'small'
					}
				}
			}}
			selectedDate={new Date(props.row.rowPositionInfo.rowData.dateOfBirth || null)}
			style={{
				minWidth: 100
			}}
			onDateChange={handleDateChange}
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
