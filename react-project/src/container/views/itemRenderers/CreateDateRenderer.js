import React from 'react'
import { UIComponent } from '../../../flexicious'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'

const CreateDateRenderer = props => {
	const handleDateChange = event => {
		props.row.rowPositionInfo.rowData.createDate = event
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
		this.children = [<CreateDateRenderer {...cellProps} />]
		return super.render()
	}
}
CreateDateRenderer.editorWrapper = EditorWrapper

export default CreateDateRenderer
