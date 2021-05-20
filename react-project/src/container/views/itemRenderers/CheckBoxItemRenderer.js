import { Checkbox } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from '../../../AppConfig/store/actions/homeAction'
import { UIComponent } from '../../../flexicious'

const CheckBoxItemRenderer = props => {
	const dispatch = useDispatch()
	const tabValue = useSelector(state => state.workListState.tabValue)
	const handleChangeData = () => {
		const rowData = props.row.getData()
		const dataField = props.column.getDataField()

		if (dataField === 'epicRequest') {
			if (
				rowData[dataField] === 'N' &&
				rowData.employeeSubGroup === 'Volunteer'
			) {
				dispatch(
					showMessage(
						'',
						'For EPIC access, contact Sherri Oustalet at soustale@montefiore.org',
						'OK',
						() => {},
						() => {}
					)
				)
				rowData[dataField] = 'N'
			}else {
				if (rowData[dataField] === 'Y') {
					rowData[dataField] = 'N'
				} else {
					rowData[dataField] = 'Y'
				}
			}
		} else {
			if (rowData[dataField] === 'Y') {
				rowData[dataField] = 'N'
			} else {
				rowData[dataField] = 'Y'
			}
		}

		props.cell.refreshCell()
		const container = props.cell.getGrid().getBodyContainer()
		if (container._inEdit) {
			container.endEdit(container.getEditor())
		}
	}

	return (
		<div style={{visibility: props.column.getDataField() === "noSSN" && props.row.getData().constructorName !== 'IdWorklist' ? "hidden" : "visible" }}>
			<Checkbox
				id="ChkBox"
				disabled={tabValue !== 0}
				checked={Boolean(
					props.row.rowPositionInfo.rowData[props.column.getDataField()] === 'Y'
				)}
				onClick={handleChangeData}
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
		this.children = [<CheckBoxItemRenderer {...cellProps} />]
		return super.render()
	}
}
CheckBoxItemRenderer.editorWrapper = EditorWrapper
export default CheckBoxItemRenderer
