import React from 'react'
import './advanceDialog.style.scss'
import { Modal, Paper, withStyles } from '@material-ui/core'
import { Cancel } from '@material-ui/icons'

const styles = theme => ({
	dialogContent: {
		margin: theme.spacing(0.5),
		height: '100%'
	},
	dialogActionsRoot: {
		display: 'flex',
		padding: '8px 4px'
	},
	paperWidthMd: {
		'@media (max-height:850px)': {
			maxHeight: 'calc(100% - 20px) !important'
		}
	},
	paperWidthLg: {
		'@media (max-height:850px)': {
			maxHeight: 'calc(100% - 20px) !important'
		}
	},
	borderAround: {
		border: `${theme.spacing(0.1)}px solid grey`
	},
	modal: {
		display: 'flex',
		padding: theme.spacing(1),
		alignItems: 'center',
		justifyContent: 'center'
	}
})

const AdvanceDialog = ({
	open,
	handleClose,
	classes,
	headerTitle,
	bodyRenderer
}) => {
	return (
		<Modal
			open={open}
			classes={{
				paperWidthMd: classes.paperWidthMd,
				paperWidthLg: classes.paperWidthLg
			}}
			className={classes.modal}
			PaperComponent={Paper}
			onClose={handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description">
			<Paper className="dialog-paper-container">
				<div className="dialog-header-container">
					<span className="dialog-header-title">{headerTitle}</span>
					<Cancel style={{ fill: 'white' }} onClick={handleClose} />
				</div>
				{bodyRenderer}
			</Paper>
		</Modal>
	)
}

export default withStyles(styles)(AdvanceDialog)
