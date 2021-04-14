import React from 'react'
import { useSelector } from 'react-redux'
import { UIComponent } from '../../../flexicious'
import ComboBox from '../../../shared/components/ComboBox'

const EmployeeSubGroup = props => {
	const employeeSubGroup = props.row.rowPositionInfo.rowData.employeeSubGroup
	const employeeSubgroupList = useSelector(
		state => state.workListState.workListmodel.lookupLists.employeeSubgroupList
	)

	const handleOnChange = event => {
		props.row.rowPositionInfo.rowData.employeeSubGroup = event.target.value
		props.cell.refreshCell()
		const container = props.cell.getGrid().getBodyContainer()
		if (container._inEdit) {
			container.endEdit(container.getEditor())
		}
	}

	return (
		<div>
			<ComboBox
				labelKey="employeeSubGroupName"
				valueKey="employeeSubGroupName"
				value={employeeSubGroup}
				dataProvider={employeeSubgroupList}
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
			coloumn: cell._coloumn,
			level: cell.level,
			grid: cell.level.grid
		}
		this.children = [<EmployeeSubGroup {...cellProps} />]
		return super.render()
	}
}

EmployeeSubGroup.editorWrapper = EditorWrapper

export default EmployeeSubGroup
