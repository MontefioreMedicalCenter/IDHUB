import React from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
// import { useSelector } from 'react-redux'

const Remove = props => {
	// const tabValue = useSelector(state => state.workListState.tabValue)
	const onDelete = () => {
		props.column.handleDelete(props)
	}

	if (props.cell.rowInfo && props.cell.rowInfo.getIsDataRow() && props.row.getData().worklistStatus !== "Processed") {
		return (
			<Button onClick={onDelete} style={{height:"100%"}}>
				<DeleteIcon fontSize="small" />
			</Button>
		)
	} else {
		return <div />
	}
}

export default Remove
