import React from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const Remove = props => {
	const onDelete = () => {
		props.column.handleDelete(props)
	}

	if (props.cell.rowInfo.getIsDataRow()) {
		return (
			<Button onClick={onDelete}>
				<DeleteIcon fontSize="small" />
			</Button>
		)
	} else {
		return <div />
	}
}

export default Remove
