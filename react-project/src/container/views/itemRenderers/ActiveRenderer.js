import React from 'react'
import { Checkbox } from '@material-ui/core'
import { UIComponent } from '../../../flexicious'
import { useDispatch } from 'react-redux'
import { showMessage } from '../../../AppConfig/store/actions/homeAction'
import { toast } from 'react-toastify'

const ActiveRenderer = props => {
	const dispatch = useDispatch()

	const activeChk_click = event => {
		// TODO Auto-generated method stub
		var tcbx = event.target
		var cell = props.cell
		var data = cell.rowInfo.getData()
		var msg = ''
		if (data.edit) {
			toast.warning('Please save the change first !')
		} else {
			if (tcbx.checked) {
				data.userActiveFlag = 1
				msg = 'activated'
			} else {
				data.userActiveFlag = 0
				msg = 'de-activated'
			}
			dispatch(
				showMessage(
					'Confirm Activate',
					'The use is ' + msg + '. Do you want to save it?',
					'YES_NO',
					() => {
						props.column.saveHandle(data, 2)
					},
					() => {}
				)
			)
		}
		props.cell.refreshCell()
	}

	return (
		<div>
			<Checkbox
				id="activeChkBox"
				onClick={activeChk_click}
				checked={props.row.getData().userActiveFlag === 1}
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
		this.children = [<ActiveRenderer {...cellProps} />]
		return super.render()
	}
}
ActiveRenderer.editorWrapper = EditorWrapper
export default ActiveRenderer
