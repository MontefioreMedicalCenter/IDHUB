// @flow
// FIXME: Add correct types where FlowFixMe's have been used

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

type BoxProps = {
	children?: Array,
	classes?: Object,
	inlineStyle: Object,
	spacing?: Number
}

const styles = {
	root: {
		flexGrow: 0
	}
}

const BoxComp = ({
	children,
	classes,
	inlineStyle,
	spacing,
	...rest
}: BoxProps) => (
	<Grid
		className={classes.root}
		container
		item
		spacing={spacing}
		style={inlineStyle}
		{...rest}>
		{children}
	</Grid>
)

BoxComp.defaultProps = {
	children: [],
	classes: {},
	inlineStyle: {},
	spacing: 0
}

const Box = withStyles(styles)(BoxComp)
export default Box
