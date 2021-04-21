import React from 'react'
import Button from '@material-ui/core/Button'

const ButtonComponent = props => {
	return (
		<Button
			variant="contained"
			color="primary"
			onClick={props.onClick}
			{...props}>
			Login
		</Button>
	)
}

export default ButtonComponent
