// @flow
import React from 'react'
import { PagerControl } from '../../../flexicious'
import FilterListIcon from '@material-ui/icons/FilterList'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import SettingsIcon from '@material-ui/icons/Settings'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import GetAppIcon from '@material-ui/icons/GetApp'
import PrintIcon from '@material-ui/icons/Print'
import { Tooltip, IconButton } from '@material-ui/core'

// import Styles from './styles.scss'

/* eslint-disable no-underscore-dangle */
class CustomGridPager extends PagerControl {
	constructor(props) {
		super(props)
	}

	getClassNames() {
		return ['CustomGridPager', ...super.getClassNames()]
	}

	handleSaveSettings = event => {
		super.onSaveSettingsPopup()
	}

	handleExport = event => {
		this.grid.toolbarExcelHandlerFunction(event)
	}

	handleClearFilter = event => {
		this.grid.clearFilter()
	}

	handleRunFilter = event => {
		this.grid.processFilter()
	}

	handlePrint = event => {
		// this.grid.toolbarPrintHandlerFunction(event);
		// super.onPrint(event);
	}

	handleShowHideFilter = event => {
		this.grid.setFilterVisible(!this.grid.getFilterVisible())
		this.grid.rebuild()
		this.grid.rebuildPager()
	}

	render() {
		return (
			<div style={{ display: 'flex' }}>
				<div>
					<Tooltip title="Save Settings">
						<IconButton
							style={{
								padding: '7px 9px',
								margin: '4px',
								border: '1px solid #A0A0A0',
								borderRadius: '5px'
							}}
							onClick={event => this.handleSaveSettings(event)}>
							<SettingsApplicationsIcon color="action" />
						</IconButton>
					</Tooltip>
				</div>
				<div>
					<Tooltip title="Show/Hide Filter">
						<IconButton
							style={{
								padding: '7px 9px',
								margin: '4px',
								border: '1px solid #A0A0A0',
								borderRadius: '5px'
							}}
							onClick={event => this.handleShowHideFilter(event)}>
							<FilterListIcon color="action" />
						</IconButton>
					</Tooltip>
				</div>
				<div>
					<Tooltip title="Run Filter">
						<IconButton
							style={{
								padding: '7px 9px',
								margin: '4px',
								border: '1px solid #A0A0A0',
								borderRadius: '5px'
							}}
							onClick={event => this.handleRunFilter(event)}>
							<AutorenewIcon color="action" />
						</IconButton>
					</Tooltip>
				</div>
				<div>
					<Tooltip title="Clear Filter">
						<IconButton
							style={{
								padding: '7px 9px',
								margin: '4px',
								border: '1px solid #A0A0A0',
								borderRadius: '5px'
							}}
							onClick={event => this.handleClearFilter(event)}>
							<ClearAllIcon color="action" />
						</IconButton>
					</Tooltip>
				</div>
				{/* <div>
          <Tooltip title="Print">
            <IconButton
              style={{
                padding: "7px 9px",
                margin: "4px",
                border: "1px solid #A0A0A0",
                borderRadius: "5px",
              }}
              onClick={(event) => this.handlePrint(event)}
            >
              <PrintIcon color="action" />
            </IconButton>
          </Tooltip>
        </div> */}
				<div>
					<Tooltip title="Export">
						<IconButton
							style={{
								padding: '7px 9px',
								margin: '4px',
								border: '1px solid #A0A0A0',
								borderRadius: '5px'
							}}
							onClick={event => this.handleExport(event)}>
							<GetAppIcon color="action" />
						</IconButton>
					</Tooltip>
				</div>
			</div>
		)
	}
}

export default CustomGridPager
