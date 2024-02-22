import React from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import IdWorklistGroup from "../../../vo/worklist/IdWorklistGroup";
import IdWorklist from "../../../vo/worklist/IdWorklist";

// import { useSelector } from 'react-redux'

const Remove = props => {
	// const tabValue = useSelector(state => state.workListState.tabValue)
	const onDelete = () => {
		props.column.handleDelete(props)
	}

	if (props.cell.rowInfo && props.cell.rowInfo.getIsDataRow()){
	 
	if((props.row.getData().constructorName=='IdWorklist' && props.row.getData().worklistGroup.worklistStatus == "Processed")||(props.row.getData().constructorName=='IdWorklistGroup' && props.row.getData().worklistStatus == "Processed")){

		return <div />
		
	} else {
		return (
			<Button onClick={onDelete} style={{height:"100%"}}>
				<DeleteIcon fontSize="small" />
			</Button>
		)
	}
}
}

export default Remove
