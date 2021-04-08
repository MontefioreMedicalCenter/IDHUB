import React from 'react'
import { useSelector } from 'react-redux'
import ComboBox from '../../../shared/components/ComboBox'

const Department = props => {
	const department = props.row.rowPositionInfo.rowData.department
	const departmentList = useSelector(
		state => state.workListState.workListmodel.lookupLists.departmentList
	)

	const handleOnChange = event => {
		props.row.rowPositionInfo.rowData.department = event.target.value
		props.cell.refreshCell()
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

export default Department
