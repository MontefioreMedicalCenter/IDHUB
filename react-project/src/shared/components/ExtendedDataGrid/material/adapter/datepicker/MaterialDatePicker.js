// @flow
// FIXME: Add correct types where FlowFixMe's have been used

import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import DateUtils from '@date-io/moment'
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import { toast } from 'react-toastify'

// import Toolbar from "@material-ui/core/Toolbar";
// const toolbar = <Toolbar />; //needed to import toolbar dor date picker

type ColorType = 'primary' | 'contrast'

type Props = {
	color: ColorType,
	classes: Object,
	label: string,
	selectedDate?: Date,
	onDateChange: (date: Date) => any
}

const styles = theme => ({
	contrastScheme: {
		margin: 10,
		'& label': {
			color: `${theme.palette.primary.contrastText} !important`
		},
		'& div': {
			color: `${theme.palette.primary.contrastText}`
		},
		'& div:hover:not(.MuiInput-disabled):not(.MuiInput-focused):not(.MuiInput-error):before': {
			borderBottomColor: `${theme.palette.primary.contrastText}`
		},
		'& div:before': {
			borderBottomColor: `${theme.palette.primary.contrastText}`
		},
		'& div:after': {
			borderBottomColor: `${theme.palette.primary.contrastText}`
		}
	},
	primaryScheme: {
		margin: 10,
		'& label': {
			color: `${theme.palette.primary.main} !important`
		},
		'& div': {
			color: `${theme.palette.primary.main}`
		},
		'& div:hover:not(.MuiInput-disabled):not(.MuiInput-focused):not(.MuiInput-error):before': {
			borderBottomColor: `${theme.palette.primary.main}`
		},
		'& div:before': {
			borderBottomColor: `${theme.palette.primary.main}`
		},
		'& div:after': {
			borderBottomColor: `${theme.palette.primary.main}`
		}
	}
})

class MaterialDatePicker extends React.PureComponent<Props> {
	constructor(props) {
		super(props)
		this.state = {
			selected: props.selectedDate,
			changed: false
		}
	}

	static defaultProps = {
		color: 'primary',
		format: 'MM/DD/YYYY',
		selectedDate: new Date(),
		disableOnBlur: false
	}

	handleOnChange = date => {
		const { selected } = this.state
		if (date && selected && selected.toDateString() === date.toDateString()) {
			return
		}

		const { onDateChange } = this.props

		if (onDateChange) {
			onDateChange(date)
		}

		this.setState({
			selected: date,
			changed: true
		})
	}

	hadleonkeyup = (e) => {
		if (e.target.value && e.keyCode === 9) {
			let enteredDate = e.target.value
			let dateCheck = enteredDate.split("/")
			if ((dateCheck[2] && dateCheck[2].length <= 3) || dateCheck.length !== 3) {
				this.dateFormat(e)
			} else if (dateCheck.length === 3) {
				this.handleOnChange(new Date(e.target.value))
			}
		}
	}

	dateFormat = (e) => {
		var value = e.target.value
		setTimeout(() => {
			if(document.getElementsByClassName('MuiPopover-root').length< 1) {
				let enteredDate = value
				let dateCheck = enteredDate.split("/")
				if ((dateCheck[2] && dateCheck[2].length <= 3) || dateCheck.length !== 3) {
					toast.warning("Enter Date in MM/DD/YYYY format")
				}
			}
		}, 300)
	}

	static getDerivedStateFromProps = (newProps, prevState) => {
		const { selected, changed } = prevState
		const { selectedDate } = newProps

		if (selected !== selectedDate) {
			const stateObj = { changed: false }

			if (!changed) {
				stateObj.selected = selectedDate
			}

			return stateObj
		}

		return null
	}

	render = () => {
		const { classes, color, label, ...more } = this.props
		const { selected } = this.state

		return (
			<MuiPickersUtilsProvider utils={DateUtils}>
				<InlineDatePicker
					invalidDateMessage="Enter Date in MM/DD/YYYY format"
					className={classNames({
						[classes.primaryScheme]: color === 'primary',
						[classes.contrastScheme]: color === 'contrast'
					})}
					key={this.props.key}
					color="primary"
					label={label}
					value={selected}
					clearable		
					onChange={w => this.handleOnChange(w ? w.toDate(): null)}
					onKeyDown={(e) => this.hadleonkeyup(e)}
					onBlurCapture={(e) => { !this.props.disableOnBlur && this.dateFormat(e)}}
					{...more}
				/>
			</MuiPickersUtilsProvider>
		)
	}
}

export default withStyles(styles)(MaterialDatePicker)
