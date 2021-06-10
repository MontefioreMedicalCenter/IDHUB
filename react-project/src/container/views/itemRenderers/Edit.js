import React from 'react'
import { Button } from '@material-ui/core'
import Edit from '../../../assets/images/Edit-active.png'
import InActive from '../../../assets/images/Edit-inactive.png'

const edit = props => {
	const onEdit = () => {
		props.column.handleEdit(props)
	}

	if (props.cell) {
		if (props.cell.rowInfo && props.cell.rowInfo.getIsDataRow()) {
			return (
				<Button onClick={onEdit} style={{ height: '100%' }}>
					<img
						id="Edit"
						alt="Edit"
						src={props.cell.rowInfo.getData().edit ? Edit : InActive}
					/>
				</Button>
			)
		} else {
			return (
				<div />
			)
		}
	}
}

export default edit
