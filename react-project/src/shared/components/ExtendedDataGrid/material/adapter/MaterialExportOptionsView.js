/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
import {
	FormControl,
	FormControlLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
	Typography
} from '@material-ui/core'
import React from 'react'
import {
	BaseEvent,
	Constants,
	ExportOptions,
	PrintExportOptions,
	ToolbarAction,
	UIComponent,
	UIUtils
} from '../../../../../flexicious'
import MaterialCheckBoxColumn from '../grid/MaterialCheckBoxColumn'
import MaterialDataGrid from '../grid/MaterialDataGrid'
import MaterialDataGridColumn from '../grid/MaterialDataGridColumn'

/**
 * A ExportOptionsView that which can be used within the filtering/binding infrastructure.
 * @constructor
 * @class ExportOptionsView
 * @namespace flexiciousNmsp
 */
export default class MaterialExportOptionsView extends UIComponent {
	constructor() {
		super({}, 'div')
		this.attachClass('flexiciousGrid')
		this.setWidth(800)
		this.exportOptions = new ExportOptions()
	}

	/**
	 *
	 * @return {Array}
	 */
	getClassNames() {
		return ['ExportOptionsView', 'UIComponent']
	}

	setGrid(val) {
		this.grid = val
		this.enablePaging = val.getEnablePaging()
		this.pageCount =
			val.getPageSize() > 0
				? Math.ceil(val.getTotalRecords() / val.getPageSize())
				: 1
		this.selectedObjectsCount = val.getSelectedObjectsTopLevel().length

		const items = this.grid.getExportableColumnsAtAllLevel(this.exportOptions)

		this.itemsToShow = []

		for (const col of items) {
			if (col.getVisible()) {
				this.itemsToShow.push(col)
			}
		}
	}
	onOK(domElement) {
		this.exportOptions.printExportOption = this.pageSelection

		const pgFrom = this.pageFrom
		const pgTo = this.pageTo

		if (this.pageSelection === PrintExportOptions.PRINT_EXPORT_SELECTED_PAGES) {
			if (
				pgFrom >= 1 &&
				pgTo >= 1 &&
				pgFrom <= this.pageCount &&
				pgTo <= this.pageCount &&
				pgFrom <= pgTo
			) {
				this.exportOptions.pageFrom = pgFrom
				this.exportOptions.pageTo = pgTo
				this.close(Constants.ALERT_OK)
			} else {
				window.alert(
					"Please ensure that the 'page from' is less than or equal to 'page to'"
				)
			}
		} else {
			this.close(Constants.ALERT_OK)
		}
	}

	close(dialogResult) {
		const closeEvent = new BaseEvent(Constants.EVENT_CLOSE)

		closeEvent.detail = dialogResult
		this.dispatchEvent(closeEvent)
		this.grid.removePopup(this.popup)
		//UIUtils.removePopUp(this);
	}

	onCancel(evt) {
		this.grid.removePopup(this.popup)
	}

	showDialog() {
		const actions = [
			ToolbarAction.create(
				this.exportOptions.openNewWindow
					? Constants.PRT_BTN_PRINT_LABEL
					: Constants.EXP_BTN_EXPORT_LABEL,
				this.onOK.bind(this),
				true
			),
			ToolbarAction.create(
				Constants.EXP_BTN_CANCEL_LABEL,
				this.onCancel.bind(this),
				true
			)
		]

		this.popup = UIUtils.addPopUp(
			this.render(),
			this.grid,
			false,
			null,
			Constants.SETTINGS_POPUP_TITLE,
			actions
		)
		this.grid.addPopup(this.popup)
	}

	/**
	 * Initializes the auto complete and watermark plugins
	 */
	render() {
		return (
			<div key="exportdiv">
				<Typography style={{ margin: 10, fontSize: 20 }}>Settings</Typography>
				<div key="columnsDiv" style={{ float: 'left', margin: 10 }}>
					<Typography>{Constants.EXP_LBL_COLS_TO_EXPORT_TEXT}</Typography>

					<MaterialDataGrid
						key="columnsGrid"
						dataProvider={this.exportOptions.availableColumns}
						enableActiveCellHighlight={false}
						height={300}
						selectedKeyField={'name'}
						selectedKeys={
							this.itemsToShow.length
								? UIUtils.extractPropertyValues(
										this.itemsToShow,
										'uniqueIdentifier'
								  )
								: UIUtils.extractPropertyValues(this.availableColumns, 'name')
						}
						showSpinnerOnFilterPageSort={false}
						width={300}
						onChange={evt => {
							this.exportOptions.columnsToExport = evt.grid.getSelectedObjects()
							if (
								this.exportOptions.columnsToExport.length === 1 &&
								this.exportOptions.columnsToExport[0].name === 'All'
							) {
								this.exportOptions.columnsToExport = []
							}
						}}>
						<MaterialCheckBoxColumn type={'checkbox'} />
						<MaterialDataGridColumn
							dataField={'headerText'}
							headerText={Constants.EXP_LBL_COLS_TO_EXPORT_TEXT}
						/>
					</MaterialDataGrid>
					<div style={{ margin: '5px' }}>
						<Typography className={'LBL_EXPORT_FORMAT'}>
							{' '}
							{Constants.EXP_LBL_EXPORT_FORMAT_TEXT}
						</Typography>
						<Select
							value={this.exportOptions.getExporterName()}
							onChange={this.handleChange.bind(this)}>
							{this.exportOptions.exporters.map((exporter, i) => {
								return (
									<MenuItem
										key={'option' + i}
										name={i}
										value={exporter.getName()}>
										{exporter.getName()}
									</MenuItem>
								)
							})}
						</Select>
					</div>
					<div
						key="optionsDiv"
						style={{
							float: 'right',
							width: 370,
							padding: 20,
							display: 'none'
						}}>
						<FormControl>
							<RadioGroup
								defaultValue={PrintExportOptions.PRINT_EXPORT_CURRENT_PAGE}
								name="pageSelection"
								onChange={(evt, newValue) => {
									this.pageSelection = newValue
								}}>
								<FormControlLabel
									control={
										<Radio
											className={'flxsExportpaging RBN_CURRENT_PAGE'}
											name="currentPage"
										/>
									}
									label={Constants.EXP_RBN_CURRENT_PAGE_LABEL}
									value={PrintExportOptions.PRINT_EXPORT_CURRENT_PAGE}
								/>
								<FormControlLabel
									control={
										<Radio
											className={'flxsExportpaging RBN_ALL_PAGES'}
											name="allPages"
										/>
									}
									label={Constants.EXP_RBN_ALL_PAGES_LABEL}
									value={PrintExportOptions.PRINT_EXPORT_ALL_PAGES}
								/>
								<FormControlLabel
									control={
										<Radio
											className={'flxsExportpaging rbnSelectedRecords'}
											disabled={this.selectedObjectsCount === 0}
										/>
									}
									label={
										Constants.SELECTED_RECORDS +
										' (' +
										(this.selectedObjectsCount === 0
											? 'None Selected)'
											: this.selectedObjectsCount + ' selected)')
									}
									value={PrintExportOptions.PRINT_EXPORT_SELECTED_RECORDS}
								/>
								<FormControlLabel
									control={
										<Radio
											className={'flxsExportpaging RBN_SELECT_PGS'}
											name="selectedPage"
										/>
									}
									label={Constants.EXP_RBN_SELECT_PGS_LABEL}
									value={PrintExportOptions.PRINT_EXPORT_SELECTED_PAGES}
								/>
							</RadioGroup>
						</FormControl>

						<TextField
							key="fromPage"
							name="fromPage"
							style={{ width: 150, margin: 5 }}
							onChange={(evt, newValue) => {
								this.pageTo = newValue
							}}
						/>
						<label> {Constants.PGR_TO} </label>
						<TextField
							key="toPage"
							name="toPage"
							style={{ width: 150, margin: 5 }}
							onChange={(evt, newValue) => {
								this.pageFrom = newValue
							}}
						/>
						<label>{this.pageCount}</label>
					</div>
				</div>
			</div>
		)
	}
	handleChange(evt) {
		for (let i = 0; i < this.exportOptions.exporters.length; i++) {
			if (this.exportOptions.exporters[i].getName() === evt.target.value) {
				this.exportOptions.exporter = this.exportOptions.exporters[i]
				break
			}
		}

		this.grid.removePopup(this.popup)
		this.showDialog() //we have to do this because we are not a react component, we are a flexicious UIComponent who's lifecycle is managed by the grid.
		//So we need to remove oursevles from the virtual dom and re-add it - end result is the same, just that this is the only
		//easy way to tell the grid our VDOm has changed, and the grid needs to re-render
	}
}

MaterialExportOptionsView.prototype.typeName = MaterialExportOptionsView.typeName =
	'MaterialExportOptionsView' //for quick inspection
