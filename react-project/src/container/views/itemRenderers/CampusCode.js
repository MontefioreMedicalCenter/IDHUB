import React from 'react'
import { useSelector } from 'react-redux'
import { UIComponent } from '../../../flexicious'
import ComboBox from '../../../shared/components/ComboBox'
import { getActiveLookup } from '../../../shared/utils'

const CampusCode = props => {
	const campusCode = props.row.rowPositionInfo.rowData.campusCode
	const campusCodeList = useSelector(
		state => getActiveLookup(state.workListState.workListmodel.lookupLists.campusCodeList)
	)

	const handleOnChange = event => {
		props.row.rowPositionInfo.rowData.campusCode = event.target.value
		props.cell.refreshCell()
		const container = props.cell.getGrid().getBodyContainer()
		if (container._inEdit) {
			container.endEdit(container.getEditor())
		}
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
		this.children = [<CampusCode {...cellProps} />]
		return super.render()
	}
}
CampusCode.editorWrapper = EditorWrapper

export default CampusCode
