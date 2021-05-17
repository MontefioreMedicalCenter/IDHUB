import React from 'react'
import { UIComponent } from '../../../flexicious'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'

const StartDateRenderer = props => {
	const handleDateChange = date => {
		props.row.rowPositionInfo.rowData.startDate = date
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
