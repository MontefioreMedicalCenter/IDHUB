import React from 'react'
import { Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

const Save = props => {
	const onSave = () => {
		props.column.handleSave(props)
	}
	if (props.cell.rowInfo && props.cell.rowInfo.getIsDataRow()) {
		return (
			<Button onClick={onSave} style={{height:"100%"}}>
				<SaveIcon fontSize="small" />
			</Button>
		)
	} else {
		return <div />
	}
}

export default Save
