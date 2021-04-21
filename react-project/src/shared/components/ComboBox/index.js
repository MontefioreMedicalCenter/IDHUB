import React from 'react'
import { MenuItem, FormControl, Select, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(0.5),
		minWidth: 90,
		width: '100%'
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	root: {
		fontSize: '13px'
	}
}))

const ComboBox = ({
	value,
	onChange,
	dataProvider,
	valueKey = 'value',
	labelKey = 'label'
}) => {
	const classes = useStyles()

	return (
		<FormControl className={classes.formControl}>
			<Select
				classes={{
					root: classes.root
				}}
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={value}
				onChange={onChange}>
				{(dataProvider || []).map(item => {
					return (
						<MenuItem name={item.label} value={item[valueKey]}>
							{item[labelKey]}
						</MenuItem>
					)
				})}
			</Select>
		</FormControl>
	)
}

export default ComboBox
