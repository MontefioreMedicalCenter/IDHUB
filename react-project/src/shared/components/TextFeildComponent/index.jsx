import React from 'react'
import TextField from '@material-ui/core/TextField'

const TextFeildComponent = props => {
	return (
		<React.Fragment>
			<TextField
				id={props.id}
				label={props.label}
				type={props.type}
				value={props.value}
				onChange={props.onChange}
				error={props.error || false}
			/>
		</React.Fragment>
	)
}

export default TextFeildComponent
