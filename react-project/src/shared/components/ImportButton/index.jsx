import React from 'react'
import Button from '@material-ui/core/Button'

const ImportButton = props => {
	return (
		<Button
			variant="contained"
			color="primary"
			onClick={props.onClick}
			size="small"
			style={{ maxWidth: '30px', height: '20px', fontSize: 'xx-small' }}>
			import
		</Button>
	)
}

export default ImportButton
