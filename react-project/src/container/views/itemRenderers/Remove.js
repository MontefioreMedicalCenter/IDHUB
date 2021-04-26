import React from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useSelector } from 'react-redux'

const Remove = props => {
	const tabValue = useSelector(state => state.workListState.tabValue)
	const onDelete = () => {
		props.column.handleDelete(props)
	}

	if (props.cell.rowInfo.getIsDataRow()) {
		return (
			<Button disabled={tabValue === 1} onClick={onDelete}>
				<DeleteIcon fontSize="small" />
			</Button>
		)
	} else {
		return <div />
	}
}

export default Remove
