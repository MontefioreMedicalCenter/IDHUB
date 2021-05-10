import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		zIndex: '999999 !important'
	}
}))

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialog(props) {
	const classes = useStyles()

	const handleClickCancel = () => {
		props.onCancel()
		props.onClose()
	}

	const handleSubmit = () => {
		props.onClose()
		props.onOk()
	}
	const { action } = props

	return (
		<div>
			<Dialog
				open={props.onOk ? true : false}
				TransitionComponent={Transition}
				classes={{
					root: classes.root
				}}
				keepMounted
				onClose={props.onClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{props.content}
					</DialogContentText>
				</DialogContent>
				{action && (
					<DialogActions>
						<Button onClick={handleSubmit} color="primary">
							{' '}
							{action.split('_')[0]}{' '}
						</Button>
						{action.split('_')[1] && (
							<Button onClick={handleClickCancel} color="primary">
								{' '}
								{action.split('_')[1]}{' '}
							</Button>
						)}
					</DialogActions>
				)}
			</Dialog>
		</div>
	)
}
