// @flow
// FIXME: Add correct types where FlowFixMe's have been used

import {
	Button,
	Checkbox,
	FormControl,
	FormGroup,
	InputLabel,
	MenuItem,
	NativeSelect,
	Select,
	Paper,
	FormHelperText
} from '@material-ui/core'
import { SelectProps } from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React, { Fragment, SyntheticEvent } from 'react'
import { HBox } from '../Box'
import Styles from './index.module.scss'
import UUID from 'uuid'

const NONE = '[NONE]'

type OutlinedComponentType = {
	classes: Object,
	color?: 'primary' | 'contrast',
	label?: String,
	children: *
}

const OutlinedComponent = withStyles(theme => ({
	outlined: {
		padding: theme.spacing(0.5),
		borderRadius: 3
		// margin: `${theme.spacing.unit * 0.5}px ${theme.spacing.unit * 0.75}px`,
	},
	legend: {
		fontSize: '0.75rem',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		lineHeight: 1
	},
	primaryScheme: {
		border: `1px solid #c4c4c4`
	},
	contrastScheme: {
		border: `1px solid ${theme.palette.primary.contrastText}`
	}
}))(({ classes, color, label, children }: OutlinedComponentType) => (
	<Fragment>
		<fieldset
			className={classNames(classes.outlined, {
				[classes[`${color}Scheme`]]: true
			})}>
			{label && <legend className={classes.legend}>{label}</legend>}
			{children}
		</fieldset>
	</Fragment>
))

OutlinedComponent.defaultProps = {
	color: 'primary'
}

type OkCancelPaperProps = {
	classes: Object,
	enableOkCancel?: Boolean,
	listRef?: element => any,
	onOk: (event: SyntheticEvent) => any,
	onCancel: (event: SyntheticEvent) => any,
	maxHeight: Number
}

const OkCancelPaperComponent = withStyles(theme => ({
	okCancelContainer: {
		width: '100%',
		pointerEvents: 'none',
		borderTop: `0.5px solid ${theme.palette.grey[300]}`,
		padding: 5
	}
}))(
	({
		children,
		classes,
		maxHeight,
		enableOkCancel,
		onCancel,
		onOk,
		listRef,
		...otherProps
	}) => {
		const handleOnOk = event => {
			if (onOk) {
				onOk(event)
			}
			event.stopPropagation()
			event.nativeEvent.stopImmediatePropagation()
		}

		const handleOnCancel = event => {
			if (onCancel) {
				onCancel(event)
			}
			event.stopPropagation()
			event.nativeEvent.stopImmediatePropagation()
		}

		const OkCancelButtons = enableOkCancel ? (
			<HBox className={classes.okCancelContainer} justify="flex-end">
				<FormGroup row style={{ width: 'fit-content' }}>
					<Button
						key={'cancel'}
						style={{ pointerEvents: 'all' }}
						onClick={handleOnCancel}
						color="default">
						Cancel
					</Button>
					<Button
						key={'okay'}
						style={{ pointerEvents: 'all' }}
						onClick={handleOnOk}
						color="primary">
						OK
					</Button>
				</FormGroup>
			</HBox>
		) : null

		return (
			<Paper {...otherProps}>
				<div
					ref={listRef}
					style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight }}>
					{children}
				</div>
				{OkCancelButtons}
			</Paper>
		)
	}
)

OkCancelPaperComponent.defaultProps = {
	enableOkCancel: false,
	listRef: null,
	maxHeight: 'max-content'
}

type Props = {
	SelectProps?: SelectProps,
	OkCancelPaperProps?: OkCancelPaperProps,
	data?: String,
	dataLabel?: String,
	colorField?: String,
	enableColorField?: Boolean,
	label?: String,
	classes: Object,
	dataProvider?: Array<Object>,
	emptySelect?: Boolean | String,
	selectAllLabel?: String,
	showSelectAll?: Boolean,
	enableNativeMode?: Boolean,
	fullWidth?: Boolean,
	selectedItem?: Object,
	selectedItems?: Array<Object>,
	fixedTheme?: Boolean,
	selectInlineStyle: Object,
	enableMultiSelect?: Boolean,
	outline?: Boolean,
	enableShrink?: Boolean,
	OutlinedComponentProps?: Object,
	isRequired?: Boolean,
	onSelect?: (event: any, selectedItem: Object | Array<Object>) => void
}

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		minWidth: 10
	},
	formControlMargin: {
		margin: theme.spacing.unit
	},
	select: {
		fontSize: '13px',
		'&:focus': {
			backgroundColor: 'unset'
		}
	},
	selectEmpty: {
		// marginTop: theme.spacing.unit * 2,
	},
	defaultInput: {
		fontSize: '0.813em'
	},
	input: {
		color: `${theme.palette.primary.contrastText}`,
		'&:hover:not(.MuiInput-disabled):not(.MuiInput-focused):not(.MuiInput-error):before': {
			borderBottomColor: `${theme.palette.primary.contrastText}`
		},
		'&:before': {
			borderBottom: `1px solid ${theme.palette.primary.contrastText}`
		},
		'&:after': {
			borderBottom: `2px solid ${theme.palette.primary.contrastText}`
		}
	},
	inputLabel: {
		color: `${theme.palette.primary.contrastText}`
	},
	dropDownArrow: {
		color: `${theme.palette.primary.contrastText}`
	},
	zeroPadding: {
		padding: 0
	},
	menuItemFocused: {
		backgroundColor: `${theme.palette.grey[300]}`
	},
	inputLabelFormControl: {
		fontSize: '0.875em',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		width: '70%'
	},
	shrinkInputLabel: {
		width: '100%'
	},
	menuPaper: {
		maxHeight: 450
	}
})

class AdvancedComboBox extends React.Component<Props> {
	static defaultProps = {
		label: '',
		colorField: 'color',
		data: 'value',
		dataLabel: 'label',
		dataProvider: [],
		emptySelect: false,
		showSelectAll: false,
		selectAllLabel: 'All',
		enableColorField: false,
		enableNativeMode: false,
		fullWidth: true,
		SelectProps: {},
		selectedItem: null,
		selectedItems: null,
		fixedTheme: false,
		selectInlineStyle: {},
		enableMultiSelect: false,
		outline: false,
		OutlinedComponentProps: {},
		OkCancelPaperProps: {},
		isRequired: false
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			selected:
				props.selectedItems || (props.selectedItem ? [props.selectedItem] : []),
			changed: false,
			selectAll: true,
			open: false,
			rootKey: UUID(),
			lastPressedKey: '',
			nextMatchIndex: -1
		}
	}
	actualSelectedItems = allSelectedItems => {
		const { enableMultiSelect } = this.props
		if (allSelectedItems && allSelectedItems.length > 0) {
			return enableMultiSelect ? allSelectedItems : allSelectedItems[0]
		}
		return null
	}

	toggleSelect = (event, value) => {
		let { selected } = this.state
		const { dataProvider, enableMultiSelect, onSelect, data } = this.props
		const stateObj = {}
		if (selected === null) {
			selected = []
		}
		const newSelected = enableMultiSelect === true ? [...selected] : []
		const currentIndex = newSelected
			? newSelected.findIndex(item => item[data] === value[data])
			: -1

		if (currentIndex === -1) {
			newSelected.push(value)
		} else {
			newSelected.splice(currentIndex, 1)
		}

		if (!enableMultiSelect) {
			if (onSelect) {
				onSelect(event, this.actualSelectedItems(newSelected))
			}
		}

		if (enableMultiSelect) {
			stateObj.selectAll = newSelected.length === dataProvider.length
		}

		this.setState({ selected: newSelected, changed: true, ...stateObj })
	}

	handleOnSelectAll = (event, value) => {
		let { selected, selectAll } = this.state
		const { enableMultiSelect } = this.props
		let newSelected =
			enableMultiSelect === true && selected ? [...selected] : []

		for (var i = value.length - 1; i >= 0; i--) {
			if (!selectAll) {
				newSelected.push(value[i])
			} else {
				newSelected = []
			}
		}

		// if (onSelect) {
		//     onSelect(event, this.actualSelectedItems(newSelected));
		// }

		this.setState({
			selected: newSelected,
			selectAll: !selectAll,
			changed: true
		})
	}

	handleOnClickOK = event => {
		const { onSelect } = this.props
		if (onSelect) {
			onSelect(event, this.actualSelectedItems(this.state.selected))
		}
		this.setState({ open: false })
	}

	handleOnClickCancel = () => {
		this.setState({ open: false })
	}

	handleOnChange = (event: Event) => {
		// eslint-disable-next-line
		const source = this.props.enableNativeMode
			? event.currentTarget.selectedOptions[0]
			: event.currentTarget
		const nodeId = source.getAttribute('data-id')
		if (nodeId) {
			this.toggleSelect(event, this.props.dataProvider[Number(nodeId)])
		}
		if (nodeId === null) {
			this.handleOnSelectAll(event, this.props.dataProvider)
		}

		this.setState({
			lastPressedKey: '',
			nextMatchIndex: -1,
			focusedItem: null
		})
	}

	handleOnKeyUp = event => {
		let { key } = event
		key = key.toLowerCase()
		const { dataLabel, dataProvider } = this.props
		const { lastPressedKey, nextMatchIndex } = this.state
		const matched = dataProvider.filter(
			item =>
				item[dataLabel] && item[dataLabel].toLowerCase().indexOf(key) === 0
		)

		const stateObj = { changed: true }
		if (matched.length) {
			stateObj.nextMatchIndex =
				lastPressedKey === key && matched.length - 1 > nextMatchIndex
					? nextMatchIndex + 1
					: 0
			stateObj.focusedItem = matched[stateObj.nextMatchIndex]
		} else {
			stateObj.nextMatchIndex = -1
			stateObj.focusedItem = null
		}
		stateObj.lastPressedKey = key

		this.setState(stateObj)
	}

	isChecked = (items, item) => {
		if (items) {
			for (let i = 0; i < items.length; i++) {
				if (
					items[i] === item ||
					items[i][this.props.data] === item[this.props.data]
				) {
					return true
				}
			}
		}

		return false
	}

	focusListItem = focusedItem => {
		const { dataProvider } = this.props
		if (focusedItem && this.menuListEl) {
			const listItem = this.menuListEl.querySelector(
				'[data-id="' + dataProvider.indexOf(focusedItem) + '"]'
			)
			if (listItem) {
				listItem.focus()
			}
		}
	}

	getColor = item => {
		item = item || {}
		const { colorField, enableColorField, theme } = this.props
		let buttonColor = {}

		const bgColor = item[colorField] || '#FFFFFF'

		if (enableColorField) {
			buttonColor = {
				backgroundColor: bgColor,
				color: theme.palette.getContrastText(bgColor)
			}
		}

		return buttonColor
	}

	static getDerivedStateFromProps = (newProps, prevState) => {
		const { selected, changed } = prevState
		let { selectedItem, selectedItems } = newProps
		selectedItems = selectedItems || (selectedItem ? [selectedItem] : null)
		if (selected !== selectedItems) {
			const stateObj = { changed: false }
			if (!changed) {
				stateObj.selected = selectedItems
			}
			return stateObj
		} else if (changed) {
			return { changed: false }
		}

		return null
	}

	componentDidUpdate = () => {
		this.focusListItem(this.state.focusedItem)
	}

	OkCancelPaper = props => (
		<OkCancelPaperComponent
			{...props}
			listRef={div => {
				this.menuListEl = div
			}}
			onOk={this.handleOnClickOK}
			onCancel={this.handleOnClickCancel}
			enableOkCancel={this.props.enableMultiSelect}
			{...this.props.OkCancelPaperProps}
		/>
	)

	renderSelectedValues = selected => {
		const { dataLabel, emptySelect, showSelectAll, selectAllLabel } = this.props
		const { selectAll } = this.state
		if (showSelectAll) {
			if (selectAll) {
				return selectAllLabel
			} else if (selected.length === 0) {
				return emptySelect
					? emptySelect === true
						? 'Select'
						: emptySelect
					: ''
			}
		}

		return selected.map(item => item[dataLabel]).join(', ')
	}

	renderOptions = (item, index) => {
		const {
			classes,
			data,
			dataLabel,
			enableMultiSelect,
			enableNativeMode
		} = this.props
		const { selected, focusedItem } = this.state
		const value = item[data] || NONE

		const buttonColor = this.getColor(item)

		return enableNativeMode ? (
			<option
				key={index}
				value={value}
				data-id={index}
				style={{ ...buttonColor }}>
				{item[dataLabel]}
			</option>
		) : (
			<MenuItem
				className={classNames({
					[classes.menuItemFocused]: item === focusedItem
				})}
				key={index}
				value={value}
				data-id={index}
				style={{
					...buttonColor,
					fontSize: '13px',
					whiteSpace: 'pre-line',
					height: 'max-content'
				}}>
				{enableMultiSelect && (
					<Checkbox
						checked={this.isChecked(selected, item)}
						color="primary"
						tabIndex={-1}
						disableRipple
						className={classes.zeroPadding}
					/>
				)}
				{item[dataLabel]}
			</MenuItem>
		)
	}

	renderNativeSelect = () => {
		const {
			classes,
			data,
			dataProvider,
			emptySelect,
			enableMultiSelect,
			fullWidth,
			label,
			fixedTheme,
			selectInlineStyle
		} = this.props
		const { selected } = this.state

		const overriddenClasses = {}
		if (!fixedTheme) {
			overriddenClasses.select = classes.select
			overriddenClasses.icon = classes.dropDownArrow
		}
		return (
			<NativeSelect
				value={
					selected ? selected.map(item => item[data]).join(', ') : undefined
				}
				onChange={this.handleOnChange}
				name={label}
				classes={overriddenClasses}
				className={classNames(classes.selectEmpty, {
					[classes.input]: !fixedTheme
				})}
				fullWidth={fullWidth}
				style={{ ...selectInlineStyle }}
				multiple={enableMultiSelect}>
				{emptySelect && (
					<option value="">
						{typeof emptySelect === 'boolean' ? 'Select' : emptySelect}
					</option>
				)}
				{(dataProvider || []).map(this.renderOptions)}
			</NativeSelect>
		)
	}
	handleFocus = () => {
		if (
			this.inputRef &&
			this.inputRef.node &&
			this.inputRef.node.previousSibling
		)
			this.inputRef.node.previousSibling.focus()
	}
	renderSelect = () => {
		const {
			classes,
			data,
			dataLabel,
			dataProvider,
			emptySelect,
			showSelectAll,
			enableMultiSelect,
			fullWidth,
			fixedTheme,
			outline,
			selectInlineStyle,
			SelectProps
		} = this.props
		const { selected } = this.state

		const overriddenClasses = {}
		overriddenClasses.select = classes.select
		if (!fixedTheme) {
			overriddenClasses.icon = classes.dropDownArrow
		}

		let buttonColor = {}

		if (!enableMultiSelect && selected && selected.length > 0) {
			buttonColor = this.getColor(selected[0])
		} else {
			buttonColor = this.getColor(null)
		}

		let emptyItem = null

		if (emptySelect) {
			emptyItem = {}
			emptyItem[data] = NONE
			emptyItem[dataLabel] =
				typeof emptySelect === 'boolean' ? 'Select' : emptySelect
			emptyItem = [emptyItem]
		}
		const cbx = (
			<Select
				{...SelectProps}
				MenuProps={{
					classes: {
						paper: classes.menuPaper
					},
					PaperProps: {
						component: this.OkCancelPaper
					}
				}}
				inputProps={{
					className: classes.defaultInput
				}}
				inputRef={node => {
					this.inputRef = node
				}}
				value={selected && selected.length > 0 ? selected : emptyItem || []}
				onChange={this.handleOnChange}
				onClose={() => {
					document.removeEventListener('keyup', this.handleOnKeyUp)
					this.setState({ open: false, focusedItem: null })
				}}
				onOpen={() => {
					document.addEventListener('keyup', this.handleOnKeyUp)
					this.setState({ open: true })
				}}
				multiple={enableMultiSelect}
				open={this.state.open}
				name={'advancedComboBox'}
				classes={overriddenClasses}
				className={classNames({
					[classes.selectEmpty]: emptySelect && !outline,
					[classes.fullWidth]: fullWidth,
					[classes.input]: !fixedTheme
				})}
				disableUnderline={outline}
				renderValue={this.renderSelectedValues}
				style={{ ...buttonColor, ...selectInlineStyle }}>
				{!showSelectAll && emptySelect && (
					<MenuItem key="emptySelect" value={emptyItem[0][data]}>
						{emptyItem[0][dataLabel]}
					</MenuItem>
				)}
				{showSelectAll && (
					<MenuItem value={0} key={`${this.state.selectAll}`}>
						<Checkbox
							color="primary"
							checked={this.state.selectAll}
							value={this.state.selectAll}
							tabIndex={-1}
							disableRipple
							className={this.props.classes.zeroPadding}
						/>
						{'Select All'}
					</MenuItem>
				)}
				{(dataProvider || []).map(this.renderOptions)}
			</Select>
		)
		return (
			<React.Fragment>
				{this.props.focusable ? (
					<div>
						<input
							type={'text'}
							style={{ width: '4px', height: '4px' }}
							onFocus={this.handleFocus}></input>
						{cbx}{' '}
					</div>
				) : (
					cbx
				)}
			</React.Fragment>
		)
	}

	render = () => {
		const {
			classes,
			disabled,
			outline,
			isRequired,
			enableNativeMode,
			OutlinedComponentProps,
			fullWidth,
			label,
			fixedTheme,
			enableShrink = true
		} = this.props

		const children = [
			<div
				key={this.state.rootKey}
				className={classNames(classes.root, { [Styles.fullWidth]: fullWidth })}>
				<FormControl
					className={classNames(classes.formControl, {
						[Styles.fullWidth]: fullWidth,
						[classes.formControlMargin]: !outline
					})}>
					{!outline && label && (
						<InputLabel
							shrink={enableShrink}
							disableAnimation
							focused={false}
							classes={{
								formControl: classes.inputLabelFormControl,
								shrink: classes.shrinkInputLabel
							}}
							className={classNames({ [classes.inputLabel]: !fixedTheme })}>
							{label}
						</InputLabel>
					)}
					{enableNativeMode ? this.renderNativeSelect() : this.renderSelect()}
				</FormControl>
			</div>
		]

		return (
			<div className={classNames({ [Styles.disabled]: disabled })}>
				{outline ? (
					<OutlinedComponent {...OutlinedComponentProps} label={label}>
						{children}
					</OutlinedComponent>
				) : (
					children[0]
				)}
				{isRequired && (
					<FormHelperText style={{ padding: '0px 0px 0px 18px' }}>
						*Required
					</FormHelperText>
				)}
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(AdvancedComboBox)
