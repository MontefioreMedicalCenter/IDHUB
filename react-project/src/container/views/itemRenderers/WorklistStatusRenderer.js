import { Tooltip, withStyles } from '@material-ui/core'
import React from 'react'
import dialog_warning from '../../../assets/images/dialog_warning.png'

const styles = {
	statusContainer: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: '3px'
	},
	tooltipContainer: {
		width: 500,
		height: 400,
		display: 'flex',
		flexDirection: 'column'
	},
	tooltipContent: {
		padding: 10,
		height: '100%',
		width: 'calc(100% - 20px)',
		background: '#FFFFE5'
	},
	tooltipheader: {
		padding: 10,
		borderBottom: '1px solid black'
	}
}

const HtmlTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: '#FFFF99',
		opacity: 0.9,
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 500,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid black',
		padding: 0
	}
}))(Tooltip)

const WorklistStatusRenderer = props => {
	const selectedRequest =
		props.cell.rowInfo.getData().constructor.name === 'IdWorklist'

	const statusList = props.cell.rowInfo.getData().worklistStatus
	if (
		(props.cell.rowInfo.getIsDataRow() &&
			props.cell.level.getNestDepth() !== 1) ||
		selectedRequest
	) {
		return (
			<div style={styles.statusContainer}>
				{statusList}
				{statusList === 'OnHold' && (
					<HtmlTooltip
						title={
							<div style={styles.tooltipContainer}>
								<span style={styles.tooltipheader}>WorkList Error</span>
								<span style={styles.tooltipContent}>
									{props.cell.rowInfo.getData().errorMessage}
								</span>
							</div>
						}>
						<img
							id="dialog_warning"
							alt="dialog_warning"
							src={dialog_warning}
						/>
					</HtmlTooltip>
				)}
			</div>
		)
	} else {
		return <div style={styles.statusContainer}>{statusList}</div>
	}
}

export default WorklistStatusRenderer
