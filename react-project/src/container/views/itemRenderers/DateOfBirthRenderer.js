import moment from 'moment'
import React, { useEffect } from 'react'
import { UIComponent } from '../../../flexicious'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'

const DateOfBirthRenderer = props => {
	const handleDateChange = date => {
		var dateFormat = 'MM-DD-YY'
		var cell = props.grid.getCurrentEditingCell()
		props.grid.clearErrorByObject(cell.rowInfo.getData())
		var valResult = moment(
			moment(date).format(dateFormat),
			dateFormat,
			true
		).isValid()
		var now = new Date()
		var hundyeardt = new Date(
			now.getFullYear() - 100,
			now.getMonth(),
			now.getDate()
		)
		var tenyeardt = new Date(
			now.getFullYear() - 10,
			now.getMonth(),
			now.getDate()
		)
		if (!valResult) {
			props.grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid DOB date'
			)
		}
		if (date > tenyeardt || date < hundyeardt) {
			props.grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid DOB date'
			)
		} else {
			props.row.rowPositionInfo.rowData.dateOfBirth = date
			props.cell.refreshCell()
			const container = props.cell.getGrid().getBodyContainer()
			if (container._inEdit) {
				container.endEdit(container.getEditor())
			}
		}
	}

	// wrote this fuction so that user don't have to tap twice to get the focus.
	useEffect(() => {
		document.getElementsByClassName('MuiInputBase-adornedEnd')[0].click()
	},[])


	return (
		<MaterialDatePicker
			keyboard
			color=" "
			format={'MM/DD/YYYY'}
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
