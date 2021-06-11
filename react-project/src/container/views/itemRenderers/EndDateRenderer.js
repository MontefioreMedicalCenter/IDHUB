import moment from 'moment'
import React, { useEffect } from 'react'
import { UIComponent } from '../../../flexicious'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'

const EndDateRenderer = props => {
	const handleDateChange = date => {
		var valSuccess = true
		var dateFormat = 'MM/DD/YY'
		var cell = props.grid.getCurrentEditingCell()
		var startdt = props.row.rowPositionInfo.rowData.startDate
		var valResult = moment(
			moment(date).format(dateFormat),
			dateFormat,
			true
		).isValid()
		if (startdt === null || startdt === undefined) {
			props.grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid End date'
			)
			valSuccess = false
			return valSuccess
		} else {
			var now = new Date()
			var nowMMDDYYY = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate()
			)
			var nextyeardt = new Date(
				now.getFullYear() + 5,
				now.getMonth(),
				now.getDate()
			)
		}
		if (!valResult) {
			valSuccess = false
			props.grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid end date'
			)
		}
		if (date < nowMMDDYYY) {
			valSuccess = false
			props.grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid End date'
			)
		}
		else if (startdt > date) {
			valSuccess = false
			props.grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid End date'
			)
		} else if (date > nextyeardt) {
			valSuccess = false
			props.grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid End date'
			)
		} 
		else 
		{
			const now = new Date();
			const dateData = new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getDate(),
				now.getHours()
			)
			props.row.rowPositionInfo.rowData.endDate = dateData
			props.cell.refreshCell()
			const container = props.cell.getGrid().getBodyContainer()
			if (container._inEdit) {
				container.endEdit(container.getEditor())
			}
		}
		// return valSuccess
	}

	useEffect(() => {
		document.getElementsByClassName('MuiInputBase-adornedEnd')[0].click()
	},[])

	return (
		<MaterialDatePicker
			keyboard
			color=" "
			format={'MM/DD/YYYY'}
			// error={false}
			key={`${props.row.rowPositionInfo.rowData.sourceUniqueId}2`}
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
			selectedDate={props.row.rowPositionInfo.rowData.endDate? new Date(props.row.rowPositionInfo.rowData.endDate) : null }
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
		this.children = [<EndDateRenderer {...cellProps} />]
		return super.render()
	}
}
EndDateRenderer.editorWrapper = EditorWrapper

export default EndDateRenderer
