import moment from 'moment'
import React from 'react'
import { UIComponent } from '../../../flexicious'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'

const StartDateRenderer = props => {
	const handleDateChange = date => {
		var valSuccess = true
		var dateFormat = 'MM/DD/YY'
		var cell = props.grid.getCurrentEditingCell()
		var enddt = props.row.rowPositionInfo.rowData.endDate
		if (cell == null || date == null) {
			return valSuccess
		}
		props.grid.clearErrorByObject(cell.rowInfo.getData())
		var valResult = moment(
			moment(date).format(dateFormat),
			dateFormat,
			true
		).isValid()
		if(!valResult){
			props.grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid Start date'
			)
		}
		else if (enddt && enddt < date) {
			props.grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid Start date'
			)
		} else {
			props.row.rowPositionInfo.rowData.startDate = date
			props.cell.refreshCell()
			const container = props.cell.getGrid().getBodyContainer()
			if (container._inEdit) {
				container.endEdit(container.getEditor())
			} 
		}
		// return valSuccess		
	}

	return (
		<MaterialDatePicker
			keyboard
			color=" "
			format={'MM/DD/YY'}
			error={false}
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
			selectedDate={props.row.rowPositionInfo.rowData.startDate? new Date(props.row.rowPositionInfo.rowData.startDate ): null}
			style={{
				minWidth: 100,
				padding: '0px'
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
		this.children = [<StartDateRenderer {...cellProps} />]
		return super.render()
	}
}
StartDateRenderer.editorWrapper = EditorWrapper
export default StartDateRenderer
