import React from 'react'
import { useSelector } from 'react-redux'
import ComboBox from '../../../shared/components/ComboBox'

const CampusCode = props => {
	const campusCode = props.row.rowPositionInfo.rowData.campusCode
	const campusCodeList = useSelector(
		state => state.workListState.workListmodel.lookupLists.campusCodeList
	)

	const handleOnChange = event => {
		props.row.rowPositionInfo.rowData.campusCode = event.target.value
		props.cell.refreshCell()
	}

	return (
		<div>
			<ComboBox
				labelKey="campusCodeName"
				valueKey="campusCodeName"
				value={campusCode}
				dataProvider={campusCodeList}
				onChange={handleOnChange}
			/>
		</div>
	)
}

export default CampusCode
