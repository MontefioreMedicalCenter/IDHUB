import React from 'react'
import { useSelector } from 'react-redux'
import { UIComponent } from '../../../flexicious'
import ComboBox from '../../../shared/components/ComboBox'

const Department = props => {
	const department = props.row.rowPositionInfo.rowData.department
	const departmentList = useSelector(
		state => state.workListState.workListmodel.lookupLists.departmentList
	)

	const handleOnChange = event => {
		props.row.rowPositionInfo.rowData.department = event.target.value
		props.cell.refreshCell()
		const container = props.cell.getGrid().getBodyContainer()
		if (container._inEdit) {
			container.endEdit(container.getEditor())
		}
	}

	return (
		<div>
			<ComboBox
				labelKey="departmentName"
				valueKey="departmentName"
				value={department}
				dataProvider={departmentList}
				onChange={handleOnChange}
			/>
		</div>
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
		this.children = [<Department {...cellProps} />]
		return super.render()
	}
}
Department.editorWrapper = EditorWrapper

export default Department
