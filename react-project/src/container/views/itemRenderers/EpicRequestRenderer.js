import { Checkbox } from '@material-ui/core'
import React from 'react'

const EpicRequestRenderer = props => {
	const handleChangeData = () => {
		const rowData = props.row.getData()
		if (rowData.epicRequest === 'Y') {
			rowData.epicRequest = 'N'
		} else {
			rowData.epicRequest = 'Y'
		}
		props.cell.refreshCell()
	}

	return (
		<div>
			<Checkbox
				id="epicChkBox"
				disabled={props.column.valueOfTab !== 0}
				checked={Boolean(props.row.rowPositionInfo.rowData.epicRequest === 'Y')}
				onClick={handleChangeData}
				styleName="checkBoxStyle"
			/>
		</div>
	)
}

export default EpicRequestRenderer
