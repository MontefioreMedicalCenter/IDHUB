import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import { useHistory } from 'react-router-dom'

const StyledTabs = withStyles({
	indicator: {
		height: props => props.customStyle.indicatorHeight,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3,
		backgroundColor: props => props.customStyle.indicatorColor
	},
	flexContainer: {
		width: props => (props.customStyle.centered ? 'fit-content' : '100%'),
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	root: {
		minHeight: 'unset'
	}
})((props) => {
	const { customStyle, ...rest } = props;
	return (
		<Tabs
			{...rest}
			textColor="primary"
			TabIndicatorProps={{ children: <div /> }}
		/>
	)
}
)

const StyledTab = withStyles(theme => ({
	root: {
		textTransform: props => props.customStyle.textTransform,
		color: props => props.customStyle.tabColor,
		fontWeight: theme.typography.fontWeightRegular,
		width: '25%',
		minHeight: '35px',
		maxWidth: 'unset',
		'&:focus': {
			opacity: 1
		}
	}
}))(
	(props) => {
		const { customStyle, ...rest } = props;
		return <Tab style={{ outline: 0 }} disableRipple {...rest} />;
	}
)

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	padding: {
		padding: theme.spacing(0)
	},
	demo: {
		backgroundColor: props => props.customStyle.backgroundColor,
		boxShadow: props => props.customStyle.boxShadow,
		width: props => (props.customStyle.centered ? 'fit-content' : '100%'),
		marginLeft: 'auto',
		marginRight: 'auto'
	}
}))

function CustomizedTabs(props) {
	const history = useHistory()

	const classes = useStyles(props)

	const handleCallToRouter = (event, value) => {
		history.push(value)
	}
	return (
		<div className={classes.root}>
			<div className={classes.demo}>
				<StyledTabs
					variant={props.variant}
					customStyle={{
						indicatorHeight: props.customStyle.indicatorHeight,
						centered: props.customStyle.centered,
						containerPadding: props.customStyle.containerPadding,
						indicatorColor: props.customStyle.indicatorColor
					}}
					value={history.location.pathname}
					onChange={handleCallToRouter}
					aria-label="styled tabs example">
					{props.tabList
						? props.tabList.map((tab, index) => (
								<StyledTab
									key={index}
									customStyle={{
										tabColor: props.customStyle.tabColor,
										textTransform: props.customStyle.textTransform
									}}
									label={
										tab.badge ? (
											<Badge
												invisible={!tab.badge.active}
												badgeContent={'!'}
												color="secondary"
												variant="dot">
												{tab.label}
											</Badge>
										) : (
											tab.label
										)
									}
									value={tab.path}></StyledTab>
						  ))
						: ''}
				</StyledTabs>
				<Typography className={classes.padding} />
			</div>
		</div>
	)
}

export default CustomizedTabs
