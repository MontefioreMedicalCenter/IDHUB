/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
import { MenuItem, Select } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import {
	Add,
	// ArrowLeft,
	// ArrowRight,
	// ClearAll,
	// FilterList,
	GetApp,
	// Refresh,
	Settings,
	SettingsApplications,
	// SkipNext,
	// SkipPrevious,
	// Sync
} from '@material-ui/icons'
import React from 'react'
// import FolderIcon from '@material-ui/icons/Folder'
import {
	Constants,
	ExtendedFilterPageSortChangeEvent,
	FlexDataGrid,
	FlexDataGridEvent,
	UIUtils
} from '../../../../../../flexicious'
import Tooltip from '@material-ui/core/Tooltip';
import sort from '../../../../../../assets/images/sort.png'
import add from '../../../../../../assets/images/add.png'
import foldericon from '../../../../../../assets/images/folder-documents-icon.png'
import refresh from '../../../../../../assets/images/refresh.png'
import filterShowHide from '../../../../../../assets/images/filterShowHide.png'
import filter from '../../../../../../assets/images/filter.png'
import clearFilter from '../../../../../../assets/images/clearFilter.png'
import decrease from '../../../../../../assets/images/collapse.png'
import expand from '../../../../../../assets/images/expand.png'
import expandAll from '../../../../../../assets/images/expandall.png'
import collapseAll from '../../../../../../assets/images/collapseall.png'
import firstPageArrow from '../../../../../../assets/images/firstPage.png'
import prevPage from '../../../../../../assets/images/prevPage.png'
import nextPage from '../../../../../../assets/images/nextPage.png'
import lastPage from '../../../../../../assets/images/lastPage.png'

/**
 * Toolbar that sits on top of the datagrid component
 * @constructor
 * @class PagerControl
 * @namespace flexiciousNmsp
 *
 */
export default class ToolbarImpl extends React.Component {
	getClassNames() {
		return ['PagerControl', 'UIComponent', 'IExtendedPager']
	}

	getPageSize() {
		return this.props.pager._pageSize
	}

	setPageSize(val) {
		this.props.pager._pageSize = val
	}

	getPageIndex() {
		return this.props.pager._pageIndex
	}

	setPageIndex(val) {
		if (this.props.pager._pageIndex !== val) {
			this.props.pager._pageIndex = val
			this.onPageChanged()
			this.props.pager.dispatchEvent(new FlexDataGridEvent('pageIndexChanged'))
		}
	}

	setTotalRecords(val) {
		this.props.pager._totalRecords = val
		this.setPageIndex(0)
		this.props.pager.dispatchEvent(new FlexDataGridEvent('reset'))
		this.refresh()
	}

	getTotalRecords() {
		return this.props.pager._totalRecords
	}

	/**
	 * Default handler for the First Page Navigation Button
	 */
	onImgFirstClick() {
		this.props.pager._pageIndex = 0
		this.onPageChanged()
	}

	/**
	 * Default handler for the Previous Page Navigation Button
	 */
	onImgPreviousClick() {
		if (this.props.pager._pageIndex > 0) {
			this.props.pager._pageIndex--
			this.onPageChanged()
		}
	}

	/**
	 * Default handler for the Next Page Navigation Button
	 */
	onImgNextClick() {
		if (this.props.pager._pageIndex < this.getPageCount() - 1) {
			this.props.pager._pageIndex++
			this.onPageChanged()
		}
	}

	/**
	 * Default handler for the Last Page Navigation Button
	 */
	onImgLastClick() {
		if (this.props.pager._pageIndex < this.getPageCount() - 1) {
			this.props.pager._pageIndex = this.getPageCount() - 1
			this.onPageChanged()
		}
	}

	/**
	 * Default handler for the Page Change Combo Box
	 */
	onPageCbxChange(event) {
		this.props.pager._pageIndex = parseInt(event.target.value) - 1
		this.onPageChanged()
		this.refresh()
	}

	/**
	 * Default handler for the Page Change Event
	 */
	onPageChanged() {
		this.refresh()
		if (this.props.pager.doDispatchEvents)
			this.props.pager.dispatchEvent(
				new ExtendedFilterPageSortChangeEvent(
					ExtendedFilterPageSortChangeEvent.PAGE_CHANGE
				)
			)
		this.setState({ timeStamp: new Date() })
	}

	/**
	 * Sets the page index to 1(0), dispatches the reset event.
	 */
	reset() {
		this.props.pager._pageIndex = 0
		this.getPageDropdown().selectedIndex = 0
		this.props.pager.dispatchEvent(new FlexDataGridEvent('reset'))
	}

	getPageStart() {
		return this.props.pager._totalRecords === 0
			? 0
			: this.props.pager._pageIndex * this.props.pager._pageSize + 1
	}

	getPageEnd() {
		const val = (this.props.pager._pageIndex + 1) * this.props.pager._pageSize

		return val > this.props.pager._totalRecords
			? this.props.pager._totalRecords
			: val
	}

	getPageCount() {
		return this.getPageSize() > 0
			? Math.ceil(this.getTotalRecords() / this.getPageSize())
			: 0
	}

	/**
	 * Default handler for the Word Export Button. Calls
	 * ExtendedExportController.instance().doexport(grid,ExportOptions.create(ExportOptions.DOC_EXPORT))
	 */
	onWordExport() {
		const grid = this.props.pager.grid
		grid.toolbarWordHandlerFunction()
	}

	/**
	 * Default handler for the Word Export Button. Calls
	 * ExtendedExportController.instance().doexport(grid,ExportOptions.create())
	 */
	onExcelExport() {
		const grid = this.props.pager.grid
		grid.toolbarExcelHandlerFunction()
	}

	/**
	 * Default handler for the Print Button. Calls
	 * var po:PrintOptions=PrintOptions.create();
	 * po.printOptionsViewrenderer = new ClassFactory(ExtendedPrintOptionsView);
	 * ExtendedPrintController.instance().print(grid,po)
	 */
	onPrint() {
		const grid = this.props.pager.grid
		grid.toolbarPrintHandlerFunction()
	}

	/**
	 * Default handler for the Print Button. Calls
	 * var po:PrintOptions=PrintOptions.create(true);
	 * po.printOptionsViewrenderer = new ClassFactory(ExtendedPrintOptionsView);
	 * ExtendedPrintController.instance().print(grid,po)
	 */
	onPdf() {
		const grid = this.props.pager.grid
		grid.toolbarPdfHandlerFunction()
	}

	/**
	 * Default handler for the Clear Filter Button.
	 * Calls grid.clearFilter()
	 */
	onClearFilter() {
		const grid = this.props.pager.grid
		grid.clearFilter()
	}

	/**
	 * Default handler for the Process Filter Button.
	 * Calls grid.processFilter()
	 */
	onProcessFilter() {
		const grid = this.props.pager.grid
		grid.processFilter()
	}

	/**
	 * Default handler for the Show Hide Filter Button.
	 * Calls grid.filterVisible=!grid.filterVisible;nestedGrid.placeSections()
	 */
	onShowHideFilter() {
		const grid = this.props.pager.grid
		grid.setFilterVisible(!grid.getFilterVisible())
		grid.rebuild()
	}

	/**
	 * Default handler for the Show Hide Filter Button.
	 * Calls grid.filterVisible=!grid.filterVisible;nestedGrid.placeSections()
	 */
	onShowHideFooter() {
		const grid = this.props.pager.grid
		grid.footerVisible = !grid.footerVisible
		grid.placeSections()
	}

	/**
	 * Default handler for the Settings Popup
	 * Calls var popup:SaveSettingsPopup=new SaveSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
	 */
	onShowSettingsPopup() {
		const grid = this.props.pager.grid
		const popup = grid.popupFactorySettingsPopup.newInstance()

		popup.setGrid(grid)
		popup.showDialog()
	}

	/**
	 * Default handler for the OPen Settings Popup
	 * Calls var popup:OpenSettingsPopup=new OpenSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
	 */
	onOpenSettingsPopup() {
		const grid = this.props.pager.grid
		const popup = grid.popupFactoryOpenSettingsPopup.newInstance()

		popup.setGrid(grid)
		popup.showDialog()
	}

	/**
	 * Default handler for the Save Settings Popup
	 * Calls var popup:SaveSettingsPopup=new SaveSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
	 */
	onSaveSettingsPopup() {
		const grid = this.props.pager.grid
		const popup = grid.popupFactorySaveSettingsPopup.newInstance()

		popup.setGrid(grid)
		popup.showDialog()
	}
	expandToLevel(lvl) {
		const grid = this.props.pager.grid
		grid.expandToLevel(lvl)
	}
	getMaxDepth() {
		const grid = this.props.pager.grid
		return grid.getMaxDepth()
	}
	render() {
		const grid = this.props.pager.grid
		let gridId = grid.id

		gridId += '_'

		const topLevelToolbarButtons = []

		if (!this.props.pager.level) {
			return <div />
		}
		if (!this.linesep) {
			this.linesep = 1
		}
		var linesep = this.linesep
		if (!grid) return

		if (this.props.pager.level.getNestDepth() === 1) {
			if (grid.enableDrillDown) {
				topLevelToolbarButtons.push(
					<span key="1">
						{grid.showAddEmployee && (
							<>
								<span
									key={gridId + 'btnAddEmployee'}
									className={'pagerDiv  iconCell'}
									id={gridId + 'btnAddEmployee'}
									onClick={this.executeToolbarAction.bind(
										this,
										'Add Employee'
									)}>
									<Tooltip title="Add Non-Employee">
										<IconButton className={'imageButtonSize'} style={{ marginTop: "5px" }}>
											<img alt={Add} src={add} />
										</IconButton>
									</Tooltip>
								</span>
								<span
									key={gridId + 'btnAddDocument'}
									className={'pagerDiv iconCell'}
									id={gridId + 'btnAddDocument'}
									onClick={this.executeToolbarAction.bind(
										this,
										'Document Library'
									)}>
									<Tooltip title="Document Library">
										<IconButton
											className={'imageButtonSize'}
											style={{ marginTop: '3px' }}
										>
											{/* <FolderIcon fontSize="large" /> */}
											<img alt={foldericon} src={foldericon} />
										</IconButton>
									</Tooltip>
								</span>
							</>
						)}
						{grid.showRefresh && <span
							key={gridId + 'btnAddRefresh'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnAddRefresh'}
							onClick={this.executeToolbarAction.bind(this, 'Refresh')}>
							<Tooltip title="Refresh">
								<IconButton className={'imageButtonSize'} style={{ marginTop: "8px" }}>
									{/* <Refresh fontSize="large" />  */}
									<img alt={refresh} src={refresh} />
								</IconButton>
							</Tooltip>
						</span>}
						<span className={'pagerDiv lineSep'}>&nbsp;</span>

						<span
							key={gridId + 'btnCollapseOne'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnCollapseOne'}
							onClick={grid.expandUp.bind(grid)}>
							<Tooltip title="Collapse">
								<IconButton className={'imageButtonSize'} style={{ marginTop: "8px" }}>
									<img alt={decrease} src={decrease} />
								</IconButton>
							</Tooltip>
						</span>

						<span
							key={gridId + 'btnExpandOne'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnExpandOne'}
							onClick={grid.expandDown.bind(grid)}>
							<Tooltip title="Expand">
								<IconButton className={'imageButtonSize'} style={{ marginTop: "8px" }}>
									<img alt={expand} src={expand} />
								</IconButton>
							</Tooltip>
						</span>
						<span className={'pagerDiv lineSep'}>&nbsp;</span>
						<span
							key={gridId + 'btnCollapseAll'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnCollapseAll'}
							onClick={grid.collapseAll.bind(grid)}>
							<Tooltip title="Collapse All">
								<IconButton className={'imageButtonSize'} style={{ marginTop: "8px" }}>
									<img alt={collapseAll} src={collapseAll} />
								</IconButton>
							</Tooltip>
						</span>

						<span
							key={gridId + 'btnExpandAll'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnExpandAll'}
							onClick={grid.expandAll.bind(grid)}>
							<Tooltip title="Expand All">
								<IconButton className={'imageButtonSize'} style={{ marginTop: "8px" }}>
									<img alt={expand} src={expandAll} />
								</IconButton>
							</Tooltip>
						</span>
						<span
							key={gridId + 'linesep' + linesep++}
							className={'pagerDiv lineSep'}>
							&nbsp;
						</span>
					</span>
				)
			}

			if (grid.enableMultiColumnSort) {
				topLevelToolbarButtons.push(
					<span key="2">
						<span
							key={gridId + 'btnSort'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnSort'}
							onClick={this.onMultiColumnSort.bind(this)}>
							<IconButton className={'imageButtonSize'} style={{ marginTop: "8px" }}>
								<img
									alt={Constants.PGR_BTN_SORT_TOOLTIP}
									className={'imageButtonSort'}
									src={sort}
									tabIndex={0}
									title={Constants.PGR_BTN_SORT_TOOLTIP}
								/>
							</IconButton>
						</span>
						<span
							key={gridId + 'linesep' + linesep++}
							className={'pagerDiv lineSep'}>
							&nbsp;
						</span>
					</span>
				)
			}
			//not yet supported

			if (grid.enablePreferencePersistence) {
				topLevelToolbarButtons.push(
					<span key="3">
						<span
							key={gridId + 'btnSettings'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnSettings'}
							onClick={this.onShowSettingsPopup.bind(this)}>
							<IconButton
								style={{ width: '40px', height: '40px' }}
								title={Constants.PGR_BTN_SETTINGS_TOOLTIP}>
								<Settings className={'imageButtonSettings'}>{ }</Settings>
								{/* <img tabIndex={0} src={grid.getThemeToolbarIconFolder() + "/settings.png"} 
                            className={"imageButtonSettings"}
                                alt={Constants.PGR_BTN_SETTINGS_TOOLTIP} title={Constants.PGR_BTN_SETTINGS_TOOLTIP} /> */}
							</IconButton>
						</span>
					</span>
				)
				if (grid.enableMultiplePreferences) {
					topLevelToolbarButtons.push(
						<span key="4">
							<span
								key={gridId + 'btnSettings'}
								className={'pagerDiv  iconCell'}
								id={gridId + 'btnSettings'}
								onClick={this.onOpenSettingsPopup.bind(this)}>
								<IconButton
									style={{ width: '40px', height: '40px' }}
									title={Constants.PGR_BTN_OPEN_SETTINGS_TOOLTIP}>
									<Settings className={'imageButtonOpenSettings'}>{ }</Settings>
								</IconButton>
							</span>
						</span>
					)
				}

				topLevelToolbarButtons.push(
					<span key="5">
						<span
							key={gridId + 'btnSaveSettings'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnSaveSettings'}
							onClick={this.onSaveSettingsPopup.bind(this)}>
							<IconButton
								style={{ width: '40px', height: '40px' }}
								title={Constants.PGR_BTN_SAVE_SETTINGS_TOOLTIP}>
								<SettingsApplications className={'imageButtonSaveSettings'}>
									{ }
								</SettingsApplications>
							</IconButton>
						</span>
						<span
							key={gridId + 'linesep' + linesep++}
							className={'pagerDiv lineSep'}>
							&nbsp;
						</span>
					</span>
				)
			}

			if (this.props.pager.level.getEnableFilters()) {
				topLevelToolbarButtons.push(
					<span key="6">
						<span
							key={gridId + 'btnFilterShowHide'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnFilterShowHide'}
							onClick={this.onShowHideFilter.bind(this)}>
							<IconButton
								style={{ width: '20px', height: '40px' }}>
								{/* filterShowHide */}
								{/* <FilterList className={'imageButtonFilterShowHide'} /> */}
								<Tooltip title={Constants.PGR_BTN_FILTER_TOOLTIP}>
									<img alt={filterShowHide} src={filterShowHide} />
								</Tooltip>
							</IconButton>

						</span>
					</span>
				)
				topLevelToolbarButtons.push(
					<span key="7">
						<span
							key={gridId + 'btnFilter'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnFilter'}
							onClick={this.onProcessFilter.bind(this)}>
							<IconButton
								style={{ width: '20px', height: '40px' }}>
								{/* <Sync className={'imageButtonFilter'} /> */}
								<Tooltip title={Constants.PGR_BTN_RUN_FILTER_TOOLTIP}>
									<img alt={filter} src={filter} />
								</Tooltip>
							</IconButton>
						</span>
					</span>
				)
				topLevelToolbarButtons.push(
					<span key="8">
						<span
							key={gridId + 'btnClearFilter'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnClearFilter'}
							onClick={this.onClearFilter.bind(this)}>
							<IconButton
								style={{ width: '20px', height: '40px' }}>
								{/* <ClearAll className={'imageButtonClearFilter'} /> */}
								{/* clearFilter */}
								<Tooltip title={Constants.PGR_BTN_CLEAR_FILTER_TOOLTIP}>
									<img alt={clearFilter} src={clearFilter} />
								</Tooltip>
							</IconButton>
						</span>
						<span
							key={gridId + 'linesep' + linesep++}
							className={'pagerDiv lineSep'}>
							&nbsp;
						</span>
					</span>
				)
			}
			if (grid.enablePrint) {
				topLevelToolbarButtons.push(
					<span key="9">
						<span
							key={gridId + 'btnPrint'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnPrint'}
							onClick={this.onPrint.bind(this)}>
							<IconButton className={'imageButtonSize'}>
								<img
									alt={Constants.PGR_BTN_PRINT_TOOLTIP}
									className={'imageButtonPrint'}
									src={grid.getThemeToolbarIconFolder() + '/print.png'}
									tabIndex={0}
									title={Constants.PGR_BTN_PRINT_TOOLTIP}
								/>
							</IconButton>
						</span>
					</span>
				)
			}
			if (grid.enablePdf) {
				topLevelToolbarButtons.push(
					<span key="10">
						<span
							key={gridId + 'btnPdf'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnPdf'}
							onClick={this.onPdf.bind(this)}>
							<IconButton className={'imageButtonSize'}>
								<img
									alt={Constants.PGR_BTN_PDF_TOOLTIP}
									className={'imageButtonPdf'}
									src={grid.getThemeToolbarIconFolder() + '/pdf.png'}
									tabIndex={0}
									title={Constants.PGR_BTN_PDF_TOOLTIP}
								/>
							</IconButton>
						</span>
					</span>
				)
			}
			if (grid.enablePrint || grid.enablePdf) {
				topLevelToolbarButtons.push(
					<span
						key={gridId + 'linesep' + linesep++}
						className={'pagerDiv lineSep'}>
						&nbsp;
					</span>
				)
			}

			// if (grid.enableExport) {
			//     topLevelToolbarButtons.push(
			//         <span key="11">
			//             <span key={gridId + "btnWord"} id={gridId + "btnWord"} className={"pagerDiv  iconCell"}>
			//                 <IconButton className={"imageButtonSize"}>
			//                     <img tabIndex={0} src={grid.getThemeToolbarIconFolder() + "/word.png"} className={"imageButtonWord"}
			//                         alt={Constants.PGR_BTN_WORD_TOOLTIP} title={Constants.PGR_BTN_WORD_TOOLTIP} />
			//                 </IconButton>
			//             </span>
			//         </span>);
			// }
			if (grid.enableExport) {
				topLevelToolbarButtons.push(
					<span key="12">
						<span
							key={gridId + 'btnExcel'}
							className={'pagerDiv  iconCell'}
							id={gridId + 'btnExcel'}
							onClick={this.onExcelExport.bind(this)}>
							<IconButton
								style={{ width: '40px', height: '40px' }}
								title={Constants.PGR_BTN_EXCEL_TOOLTIP}>
								<GetApp className={'imageButtonExcel'} />
							</IconButton>
						</span>
					</span>
				)
			}
		}
		const options = []

		for (let i = 1; i <= this.getPageCount(); i++) {
			const option = {}

			option.value = i
			option.text = i
			option.selected = this.props.pager._pageIndex + 1 === i ? 'selected' : ''
			options.push(option)
		}

		const val = (
			<div
				className={'pagerControl flexiciousGridPager cellRenderer'}
				style={{ display: 'flex', overflow: 'auto', justifyContent: 'space-between' }}>
				<span
					key={gridId + 'pagerTable'}
					className={'pagerTable'}
					style={{
						float: 'left',
						height: this.props.pager.getHeight() + 'px',
						maxWidth: '600px'
					}}>
					{this.props.pager.level.enablePaging ? (
						<span key="pageInfo" className={'pagerDiv pageInfo'}>
							{' '}
							{`${Constants.PGR_ITEMS} ${this.getPageStart()} ${Constants.PGR_TO
								} ${this.getPageEnd()} ${Constants.PGR_OF
								} ${this.getTotalRecords()}. ${Constants.PGR_PAGE
								} ${this.getPageIndex() + 1} ${Constants.PGR_OF
								} ${this.getPageCount()} `}
						</span>
					) : null}

					{this.props.pager.level.enablePaging ? (
						<span
							key={gridId + 'btnFirstPage'}
							className={'pagerDiv iconCell firstPage'}
							id={gridId + 'btnFirstPage'}
							onClick={this.onImgFirstClick.bind(this)}>
							<IconButton
								alt={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP}
								className={'imageButtonFirstPage imageButtonSize'}
								disabled={this.getPageIndex() === 0}
								tabIndex="0"
								title={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP}
								style={{ marginTop: "7px" }}>
								{' '}
								{/* <SkipPrevious color="primary" />{' '} */}
								{/* <img alt='firstPageArrow' src={firstPageArrow} /> */}
								<img tabIndex='0' src={firstPageArrow} className={"imageButtonFirstPage"}
                        alt={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP} title={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP} />
							</IconButton>
							{/* <img tabIndex='0' src={grid.getThemeToolbarIconFolder() + "/firstPage.png"} className={"imageButtonFirstPage"}
                        alt={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP} title={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP} /> */}
						</span>
					) : null}

					{this.props.pager.level.enablePaging ? (
						<span
							key={gridId + 'btnPreviousPage'}
							className={'pagerDiv iconCell prevPage'}
							id={gridId + 'btnPreviousPage'}
							onClick={this.onImgPreviousClick.bind(this)}>
							<IconButton
								alt={Constants.PGR_BTN_PREV_PAGE_TOOLTIP}
								className={'imageButtonPrevPage imageButtonSize'}
								disabled={this.getPageIndex() === 0}
								tabIndex="0"
								title={Constants.PGR_BTN_PREV_PAGE_TOOLTIP}
								style={{ marginTop: "7px" }}>
								{' '}
								{/* <ArrowLeft color="primary"/>{' '} */}
								<img alt='prevPage' src={prevPage} />
							</IconButton>
							{/* <img tabIndex='0' src={grid.getThemeToolbarIconFolder() + "/prevPage.png"} className={"imageButtonPrevPage"}
                        alt={Constants.PGR_BTN_PREV_PAGE_TOOLTIP} title={Constants.PGR_BTN_PREV_PAGE_TOOLTIP} /> */}
						</span>
					) : null}

					{this.props.pager.level.enablePaging ? (
						<span
							key={gridId + 'btnNextPage'}
							className={'pagerDiv iconCell nextPage'}
							id={gridId + 'btnNextPage'}
							onClick={this.onImgNextClick.bind(this)}>
							<IconButton
								alt={Constants.PGR_BTN_NEXT_PAGE_TOOLTIP}
								className={'imageButtonNextpage imageButtonSize'}
								disabled={this.getPageIndex() >= this.getPageCount() - 1}
								tabIndex="0"
								title={Constants.PGR_BTN_NEXT_PAGE_TOOLTIP}
								style={{ marginTop: "7px" }}>
								{' '}
								{/* <ArrowRight color="primary"/>{' '} */}
								<img alt='nextPage' src={nextPage} />
							</IconButton>
							{/* <img tabIndex='0' src={grid.getThemeToolbarIconFolder() + "/nextPage.png"} className={"imageButtonNextPage"}
                        alt={Constants.PGR_BTN_NEXT_PAGE_TOOLTIP} title={Constants.PGR_BTN_NEXT_PAGE_TOOLTIP} /> */}
						</span>
					) : null}

					{this.props.pager.level.enablePaging ? (
						<span
							key={gridId + 'btnLastPage'}
							className={'pagerDiv iconCell lastPage'}
							id={gridId + 'btnLastPage'}
							onClick={this.onImgLastClick.bind(this)}>
							<IconButton
								alt={Constants.PGR_BTN_LAST_PAGE_TOOLTIP}
								className={'imageButtonLastPage imageButtonSize'}
								disabled={this.getPageIndex() >= this.getPageCount() - 1}
								tabIndex="0"
								title={Constants.PGR_BTN_LAST_PAGE_TOOLTIP}
								style={{ marginTop: "7px" }}>
								{' '}
								{/* <SkipNext color="primary"/>{' '} */}
								<img alt='lastPage' src={lastPage} />
							</IconButton>
							{/* <img tabIndex='0' src={grid.getThemeToolbarIconFolder() + "/lastPage.png"} className={"imageButtonLastPage"}
                        alt={Constants.PGR_BTN_LAST_PAGE_TOOLTIP} title={Constants.PGR_BTN_LAST_PAGE_TOOLTIP} /> */}
						</span>
					) : null}

					{this.props.pager.level.enablePaging ? (
						<span
							key={gridId + 'linesep' + linesep++}
							className={'pagerDiv lineSep'}>
							&nbsp;
						</span>
					) : null}

					{this.props.pager.level.enablePaging ? (
						<span
							key={gridId + 'lblGotoPage'}
							className={'pagerDiv  gotoPage'}
							id={gridId + 'lblGotoPage'}>
							{Constants.PGR_LBL_GOTO_PAGE_TEXT}{' '}
							<Select
								className={'pageDropdown'}
								value={this.props.pager._pageIndex + 1}
								onChange={this.onPageCbxChange.bind(this)}>
								{options.map((opt, i) => {
									return (
										<MenuItem key={i} value={opt.value}>
											{opt.text}
										</MenuItem>
									)
								})}
							</Select>{' '}
						</span>
					) : null}

					{this.props.pager.level.enablePaging ? (
						<span
							key={gridId + 'linesep' + linesep++}
							className={'pagerDiv lineSep'}>
							&nbsp;
						</span>
					) : null}
				</span>
				<span
					key={gridId + 'pagerTable2'}
					className={'pagerTable'}
					style={{
						float: 'right',
						height: this.props.pager.getHeight() + 'px',
						maxWidth: '625px'
					}}>
					{topLevelToolbarButtons}
				</span>
			</div>
		)

		return val
		//return val;
	}

	componentDidMount() {
		if (!this.props.pager.level) {
			return
		}
		const grid = this.props.pager.grid
		this.refresh()
		grid.addEventListener(this, FlexDataGrid.EVENT_CHANGE, this.refresh)
	}
	componentWillUnmount() {
		const grid = this.props.pager.grid
		grid.removeEventListener(FlexDataGrid.EVENT_CHANGE, this.refresh)
	}
	enableDisableButton(button, enabled) {
		button.enabled = enabled
		if (button.enabled) {
			UIUtils.detachClass(button, 'disabled')
		} else {
			UIUtils.attachClass(button, 'disabled')
			const img = UIUtils.findFirstElementByTagName(button, 'IMG')

			if (img && img.hasOwnProperty('className')) {
				UIUtils.detachClass(img, 'over')
				//grid.domElement.focus();
			}
		}
	}

	rebuild() {
		this.invalidateDisplayList()
	}

	refresh() {
		this.setState({ timeStamp: new Date() })
	}

	onMultiColumnSort() {
		const grid = this.props.pager.grid
		grid.multiColumnSortShowPopup()
	}

	executeToolbarAction(code, e) {
		const data = e
		e.code = code
		const grid = this.props.pager.grid
		grid.toolbarActionExecutedFunction &&
			grid.toolbarActionExecutedFunction(data)
		grid.rebuild() //when we refresh the grid remains filtered but the filter value no longer displayed. 
	}
}
