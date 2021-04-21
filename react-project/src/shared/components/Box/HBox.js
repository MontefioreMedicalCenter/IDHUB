import React from 'react'
import Box from './Box'
const HBox = ({ children, ...rest }) => (
	<Box direction="row" {...rest}>
		{children}
	</Box>
)
export default HBox
