import React from 'react'
import { Button } from '@material-ui/core'
import dropbox from '../../../assets/images/dropbox.png'
import accept from '../../../assets/images/accept.png'

const Submit = props => {
	const onSubmit = () => {
		props.column.handleSubmit(props)
	}

	if (
		props.cell.rowInfo.getIsDataRow() &&
		props.cell.level.getNestDepth() === 1
	) {
		if (
			props.cell.rowInfo.getData().worklistStatus === 'Ready' ||
			props.cell.rowInfo.getData().worklistStatus === 'Rejected'
		) {
			return (
				<Button onClick={onSubmit} style={{height:"100%"}} >
					<img id="accept" alt="accept" src={accept} />
				</Button>
			)
		} else if (props.cell.rowInfo.getData().worklistStatus === 'Processed') {
			return (
				<Button onClick={onSubmit} style={{height:"100%"}} >
					<img id="dropbox" alt="dropbox" src={dropbox} />
				</Button>
			)
		}
	}
	return null
}

export default Submit
