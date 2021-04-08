import React from 'react'
import Box from './Box'
const VBox = ({ children, ...rest }) => (
	<Box direction="column" {...rest}>
		{children}
	</Box>
)
export default VBox
