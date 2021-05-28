import React from 'react'
import { useSelector } from 'react-redux'
import { UIComponent } from '../../../flexicious'
import ComboBox from '../../../shared/components/ComboBox'
import { getActiveLookup } from '../../../shared/utils'

const Title = props => {
	const title = props.row.rowPositionInfo.rowData.title
	const titleList = useSelector(
		state => getActiveLookup(state.workListState.workListmodel.lookupLists.titleList)
	)

	const handleOnChange = event => {
		props.row.rowPositionInfo.rowData.title = event.target.value
		props.cell.refreshCell()
		const container = props.cell.getGrid().getBodyContainer()
		if (container._inEdit) {
			container.endEdit(container.getEditor())
		}
	}

	return (
		<div>
			<ComboBox
				labelKey="titleName"
				valueKey="titleName"
				value={title}
				dataProvider={titleList}
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
		this.children = [<Title {...cellProps} />]
		return super.render()
	}
}
Title.editorWrapper = EditorWrapper

export default Title
