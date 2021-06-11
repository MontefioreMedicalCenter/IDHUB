import React from 'react';

import { UIComponent, Constants, UIUtils, FlexDataGridEvent } from "../../../flexicious"
import IconButton from '@material-ui/core/IconButton'
import add from '../../../../src/assets/images/add.png'//filterShowHide
import filterShowHide from '../../../../src/assets/images/filterShowHide.png'
import filter from '../../../../src/assets/images/filter.png'
import clearFilter from '../../../../src/assets/images/clearFilter.png'//clearFilter//
import word from '../../../../src/assets/images/word.png'
import exporte from '../../../../src/assets/images/export.png'
import firstPageArrow from '../../../../src/assets/images/firstPage.png'
import prevPage from '../../../../src/assets/images/prevPage.png'
import nextPage from '../../../../src/assets/images/nextPage.png'
import lastPage from '../../../../src/assets/images/lastPage.png'
import { Tooltip } from '@material-ui/core';
/*eslint-disable */
/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */

/**
 * A JavaScript only version of the Pager control that significantly cuts down on
 * initialization time. It does so by using pure ActionScript opposed to MXML,
 * not using as many nested HBoxes, and not using plain events instead databindings to modify appearance.
 * @constructor
 * @class PagerControl
 * @namespace flexiciousNmsp
 * 
 */
class WrapperEvent extends FlexDataGridEvent {

}
flexiciousNmsp.WrapperEvent = WrapperEvent;
export default class PagerControl extends UIComponent {
    constructor() {
        super({}, "span")
        this.addEventListener(this, Constants.EVENT_CLICK,
            function (e) {
                if (e.triggerEvent.target.className.includes('toolbarButtonIconCell')) {
                    if (e.triggerEvent.target.className.includes('disabled')) return;
                    const children = UIUtils.findElementsWithClassName(this.domElement, "toolbarButtonIconCell");
                    const actionIdx = children.indexOf(e.triggerEvent.target);
                    const action = this.grid.toolbarActions[actionIdx];
                    this.grid.runToolbarAction(action, e.triggerEvent.target, this);
                }
            }
        )
        this.attachClass("flexiciousGridPager");

        this._pageIndex = 0;
        this._totalRecords = 0;
        this._pageSize = 10;

        this.level = null;
        this.rowInfo = null;
        this.grid = null;
    }

    getClassNames() {
        return ["PagerControl", "UIComponent", "IExtendedPager"];
    }

    getPageSize() {
        return this._pageSize;
    }

    setPageSize(val) {
        this._pageSize = val;
    }

    getPageIndex() {
        return this._pageIndex;
    }

    setPageIndex(val) {
        if (this._pageIndex != val) {
            this._pageIndex = val;
            this.onPageChanged();
            this.dispatchEvent(new flexiciousNmsp.FlexDataGridEvent("pageIndexChanged"));
        }
    }

    setTotalRecords(val) {
        this._totalRecords = val;
        this.setPageIndex(0);
        this.dispatchEvent(new flexiciousNmsp.FlexDataGridEvent("reset"));
        this.refresh();
    }

    getTotalRecords() {
        return this._totalRecords;
    }

    /**
     * Default handler for the First Page Navigation Button
     */
    onImgFirstClick() {
        {
            this._pageIndex = 0;
            this.onPageChanged();
        }

    }

    /**
     * Default handler for the Previous Page Navigation Button
     */
    onImgPreviousClick() {
        if (this._pageIndex > 0) {
            this._pageIndex--;
            this.onPageChanged();
        }

    }

    /**
     * Default handler for the Next Page Navigation Button
     */
    onImgNextClick() {

        if (this._pageIndex < this.getPageCount() - 1) {
            this._pageIndex++;
            this.onPageChanged();
        }

    }

    /**
     * Default handler for the Last Page Navigation Button
     */
    onImgLastClick() {
        if (this._pageIndex < this.getPageCount() - 1) {
            this._pageIndex = this.getPageCount() - 1;
            this.onPageChanged();
        }

    }

    /**
     * Default handler for the Page Change Combo Box
     */
    onPageCbxChange(event) {
        this._pageIndex = parseInt(event.target.value) - 1;
        this.onPageChanged();

    }

    /**
     * Default handler for the Page Change Event
     */
    onPageChanged() {
        const pageDropDown = this.getPageDropdown();
        if (pageDropDown && (pageDropDown.selectedIndex != (this._pageIndex))) {
            pageDropDown.selectedIndex = this._pageIndex;
        }
        if (this.doDispatchEvents)
            this.dispatchEvent(new flexiciousNmsp.ExtendedFilterPageSortChangeEvent(flexiciousNmsp.ExtendedFilterPageSortChangeEvent.PAGE_CHANGE));
    }

    onCreationComplete(event) {
        //btnSettings.visible=btnSettings.includeInLayout=_grid.enablePreferencePersistence;
        if (this.grid.enableToolbarActions) {
            //this.grid.toolbarActions.addEventListener(flexiciousNmsp.ArrayCollection.EVENT_COLLECTION_CHANGE,this.onToolbarActionsChanged);
            this.grid.addEventListener(flexiciousNmsp.FlexDataGridEvent.CHANGE, this.onGridSelectionChange);
            this.createToolbarActions();
        }
    }

    /**
     * Sets the page index to 1(0), dispatches the reset event.
     */
    reset() {
        this._pageIndex = 0;
        this.getPageDropdown().selectedIndex = 0;
        this.dispatchEvent(new flexiciousNmsp.FlexDataGridEvent("reset"));
    }

    getPageStart() {
        return this._totalRecords == 0 ? 0 : ((this._pageIndex) * this._pageSize) + 1;

    }

    getPageEnd() {
        const val = (this._pageIndex + 1) * this._pageSize;
        return (val > this._totalRecords) ? this._totalRecords : val;

    }

    getPageCount() {
        return this.getPageSize() > 0 ? Math.ceil(this.getTotalRecords() / this.getPageSize()) : 0;

    }

    /**
     * Default handler for the Word Export Button. Calls
     * ExtendedExportController.instance().doexport(this.grid,ExportOptions.create(ExportOptions.DOC_EXPORT))
     */
    onWordExport() {
        this.grid.toolbarWordHandlerFunction();

    }

    /**
     * Default handler for the Word Export Button. Calls
     * ExtendedExportController.instance().doexport(this.grid,ExportOptions.create())
     */
    onExcelExport() {
        this.grid.toolbarExcelHandlerFunction();

    }

    /**
     * Default handler for the Print Button. Calls
     * var po:PrintOptions=PrintOptions.create();
     * po.printOptionsViewrenderer = new ClassFactory(ExtendedPrintOptionsView);
     * ExtendedPrintController.instance().print(this.grid,po)
     */
    onPrint() {
        this.grid.toolbarPrintHandlerFunction();

    }

    /**
     * Default handler for the Print Button. Calls
     * var po:PrintOptions=PrintOptions.create(true);
     * po.printOptionsViewrenderer = new ClassFactory(ExtendedPrintOptionsView);
     * ExtendedPrintController.instance().print(this.grid,po)
     */
    onPdf() {
        this.grid.toolbarPdfHandlerFunction();

    }

    /**
     * Default handler for the Clear Filter Button.
     * Calls grid.clearFilter()
     */
    onClearFilter() {
        this.grid.clearFilter();

    }

    /**
     * Default handler for the Process Filter Button.
     * Calls grid.processFilter()
     */
    onProcessFilter() {
        this.grid.processFilter();

    }

    /**
     * Default handler for the Show Hide Filter Button.
     * Calls this.grid.filterVisible=!this.grid.filterVisible;nestedGrid.placeSections()
     */
    onShowHideFilter() {
        this.grid.setFilterVisible(!this.grid.getFilterVisible());
        this.grid.rebuild()
    }

    /**
     * Default handler for the Show Hide Filter Button.
     * Calls this.grid.filterVisible=!this.grid.filterVisible;nestedGrid.placeSections()
     */
    onShowHideFooter() {
        this.grid.footerVisible = !this.grid.footerVisible; this.grid.placeSections()
    }

    /**
     * Default handler for the Settings Popup
     * Calls var popup:SaveSettingsPopup=new SaveSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
     */
    onShowSettingsPopup() {
        const popup = this.grid.popupFactorySettingsPopup.newInstance();
        popup.setGrid(this.grid);
        popup.showDialog();
    }

    /**
     * Default handler for the OPen Settings Popup
     * Calls var popup:OpenSettingsPopup=new OpenSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
     */
    onOpenSettingsPopup() {
        const popup = this.grid.popupFactoryOpenSettingsPopup.newInstance();
        popup.setGrid(this.grid);
        popup.showDialog();
    }

    /**
     * Default handler for the Save Settings Popup
     * Calls var popup:SaveSettingsPopup=new SaveSettingsPopup();UIUtils.addPopUp(popup,grid as DisplayObject);popup.grid=grid;
     */
    onSaveSettingsPopup() {
        const popup = this.grid.popupFactorySaveSettingsPopup.newInstance();
        popup.setGrid(this.grid);
        popup.showDialog();
    }

    createToolbarActions() {

    }

    onToolbarActionsChanged(event) {
        this.createToolbarActions();
    }

    onGridSelectionChange(event) {

    }

    toolbarActionFilterFunction(item) {
        return item.level == this.level.getNestDepth() || item.level == -1;

    }

    getPageDropdown() {
        return UIUtils.findElementWithClassName(this.domElement, "pageDropdown");
    }

    destroy() {
        this.destroyButtons([PagerControl.ACTION_FIRST_PAGE,
        PagerControl.ACTION_FIRST_PAGE,
        PagerControl.ACTION_PREV_PAGE,
        PagerControl.ACTION_NEXT_PAGE,
        PagerControl.ACTION_LAST_PAGE,
        PagerControl.ACTION_SORT,
        PagerControl.ACTION_SETTINGS,
        PagerControl.ACTION_SAVE_SETTINGS,
        PagerControl.ACTION_FILTER_SHOW_HIDE,
        PagerControl.ACTION_RUN_FILTER,
        PagerControl.ACTION_CLEAR_FILTER,
        PagerControl.ACTION_PRINT,
        PagerControl.ACTION_PDF,
        PagerControl.ACTION_WORD,
        PagerControl.ACTION_EXCEL
        ]);
        const pageDropDown = this.getPageDropdown();
        if (pageDropDown) {
            pageDropDown.pagerControl = null;
            UIUtils.removeDomEventListener(pageDropDown, "change", onPageDropdownChange)
        }

    }

    addToolbarActionsHTML() {
        let html = [];
        const gridId = this.grid.id;

        for (const tca of this.grid.toolbarActions) {
            html.push(tca.seperatorBefore ? <span id={gridId + "_" + tca.code} className={'pagerDiv separatorCell'}>|</span> : "");
            const style = (tca.iconUrl) ? { background: 'transparent url(' + tca.iconUrl + ') no-repeat left center', paddingLeft: '20px' } : {};
            html.push(<span valign={'middle'} style={style} >
                <IconButton className={' imageButtonSize pagerDiv iconCell '}>
                    <Tooltip title={tca.tooltip}>
                        <img className={' toolbarButtonIconCell'} src={add} style={{ paddingTop: "9px", paddingBottom: "9px" }} />
                    </Tooltip>
                </IconButton>
            </span>);
            html.push(tca.seperatorAfter ? <span className={'pagerDiv separatorCell'}>|</span> : "")
        }

        return html;
    }

    updateDisplayList(w, h) {

        flexiciousNmsp.UIComponent.prototype.updateDisplayList.apply(this, [w, h]);
        this.refresh();
    }

    render() {
        const topLevelToolbarButtons = [];
        if (!this.level) {
            return <div />;
        }
        if (!this.linesep) {
            this.linesep = 1;
        }
        var linesep = this.linesep;
        if (this.level.getNestDepth() == 1) {
            if (this.grid.enableDrillDown) {
                topLevelToolbarButtons.push(
                    <span key="1">
                        <span key={gridId + "btnCollapseOne"} id={gridId + "btnCollapseOne"} className={"pagerDiv  iconCell"}>
                            <img tabIndex={0} src={this.grid.getThemeToolbarIconFolder() + "/collapseOne.png"} className={"imageButtonExpandUp"}
                                alt={Constants.PGR_BTN_EXP_ONE_UP_TOOLTIP} title={Constants.PGR_BTN_EXP_ONE_UP_TOOLTIP} />
                        </span>

                        <span key={gridId + "btnExpandOne"} id={gridId + "btnExpandOne"} className={"pagerDiv  iconCell"}>
                            <img tabIndex={0} src={this.grid.getThemeToolbarIconFolder() + "/expandOne.png"} className={"imageButtonExpandDown"}
                                alt={Constants.PGR_BTN_EXP_ONE_DOWN_TOOLTIP} title={Constants.PGR_BTN_EXP_ONE_DOWN_TOOLTIP} />
                        </span>
                        <span className={"pagerDiv lineSep"}>&nbsp;</span>
                        <span key={gridId + "btnCollapseAll"} id={gridId + "btnCollapseAll"} className={"pagerDiv  iconCell"}>
                            <img tabIndex={0} src={this.grid.getThemeToolbarIconFolder() + "/collapseAll.png"} className={"imageButtonCollapseAll"}
                                alt={Constants.PGR_BTN_COLLAPSE_ALL_TOOLTIP} title={Constants.PGR_BTN_COLLAPSE_ALL_TOOLTIP} />
                        </span>

                        <span key={gridId + "btnExpandAll"} id={gridId + "btnExpandAll"} className={"pagerDiv  iconCell"}>
                            <img tabIndex={0} src={this.grid.getThemeToolbarIconFolder() + "/expandAll.png"} className={"imageButtonExpandAll"}
                                alt={Constants.PGR_BTN_EXP_ALL_TOOLTIP} title={Constants.PGR_BTN_EXP_ALL_TOOLTIP} />
                        </span>
                        <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span>
                    </span>
                );

            }

            if (this.grid.enableMultiColumnSort) {
                topLevelToolbarButtons.push(
                    <span key="2">
                        <span key={gridId + "btnSort"} id={gridId + "btnSort"} className={"pagerDiv  iconCell"}>
                            <img tabIndex={0} src={this.grid.getThemeToolbarIconFolder() + "/sort.png"} className={"imageButtonSort"}
                                alt={Constants.PGR_BTN_SORT_TOOLTIP} title={Constants.PGR_BTN_SORT_TOOLTIP} />
                        </span>
                        <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span>
                    </span>
                );
            }
            //not yet supported

            if (this.grid.enablePreferencePersistence) {
                topLevelToolbarButtons.push(
                    <span key="3">
                        <span key={gridId + "btnSettings"} id={gridId + "btnSettings"} className={"pagerDiv  iconCell"}>
                            <img tabIndex={0} src={this.grid.getThemeToolbarIconFolder() + "/settings.png"} className={"imageButtonSettings"}
                                alt={Constants.PGR_BTN_SETTINGS_TOOLTIP} title={Constants.PGR_BTN_SETTINGS_TOOLTIP} />
                        </span>
                    </span>
                );
                if (this.grid.enableMultiplePreferences) {
                    topLevelToolbarButtons.push(
                        <span key="4">
                            <span key={gridId + "btnSettings"} id={gridId + "btnSettings"} className={"pagerDiv  iconCell"}>
                                <img tabIndex={0} src={this.grid.getThemeToolbarIconFolder() + "/openSettings.png"} className={"imageButtonOpenSettings"}
                                    alt={Constants.PGR_BTN_OPEN_SETTINGS_TOOLTIP} title={Constants.PGR_BTN_OPEN_SETTINGS_TOOLTIP} />
                            </span>
                        </span>
                    );
                }

                topLevelToolbarButtons.push(
                    <span key="5">
                        <span key={gridId + "btnSaveSettings"} id={gridId + "btnSaveSettings"} className={"pagerDiv  iconCell"}>
                            <img tabIndex={0} src={this.grid.getThemeToolbarIconFolder() + "/saveSettings.png"} className={"imageButtonSaveSettings"}
                                alt={Constants.PGR_BTN_SAVE_SETTINGS_TOOLTIP} title={Constants.PGR_BTN_SAVE_SETTINGS_TOOLTIP} />
                        </span>
                        <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span>
                    </span>
                );
            }

            if (this.level.getEnableFilters()) {
                topLevelToolbarButtons.push(
                    <span key="6">
                        <span key={gridId + "btnFilterShowHide"} id={gridId + "btnFilterShowHide"} className={"pagerDiv  iconCell"}>
                            <Tooltip title={Constants.PGR_BTN_FILTER_TOOLTIP}>
                                <img tabIndex={0} src={filterShowHide} className={"imageButtonFilterShowHide"}
                                    alt={Constants.PGR_BTN_FILTER_TOOLTIP} style={{ marginTop: "9px" }} />
                            </Tooltip>
                        </span>
                    </span>
                );
                topLevelToolbarButtons.push(
                    <span key="7">

                        <span key={gridId + "btnFilter"} id={gridId + "btnFilter"} className={"pagerDiv  iconCell"}>
                            <Tooltip title={Constants.PGR_BTN_RUN_FILTER_TOOLTIP}>
                                <img tabIndex={0} src={filter} className={"imageButtonFilter"}
                                    alt={Constants.PGR_BTN_RUN_FILTER_TOOLTIP} style={{ marginTop: "9px" }} />
                            </Tooltip>
                        </span>
                    </span>
                );
                topLevelToolbarButtons.push(
                    <span key="8">
                        <span key={gridId + "btnClearFilter"} id={gridId + "btnClearFilter"} className={"pagerDiv  iconCell"}>
                            <Tooltip title={Constants.PGR_BTN_CLEAR_FILTER_TOOLTIP}>
                                <img tabIndex={0} src={clearFilter} className={"imageButtonClearFilter"}
                                    alt={Constants.PGR_BTN_CLEAR_FILTER_TOOLTIP} style={{ marginTop: "9px" }} />
                            </Tooltip>
                        </span>
                        <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span>
                    </span>
                );
            }
            if (this.grid.enablePrint) {
                topLevelToolbarButtons.push(

                    <span key="9">
                        <span key={gridId + "btnPrint"} id={gridId + "btnPrint"} className={"pagerDiv  iconCell"}>
                            <img tabIndex={0} src={this.grid.getThemeToolbarIconFolder() + "/print.png"} className={"imageButtonPrint"}
                                alt={Constants.PGR_BTN_PRINT_TOOLTIP} title={Constants.PGR_BTN_PRINT_TOOLTIP} />
                        </span>
                    </span>);

            }
            if (this.grid.enablePdf) {
                topLevelToolbarButtons.push(
                    <span key="10">
                        <span key={gridId + "btnPdf"} id={gridId + "btnPdf"} className={"pagerDiv  iconCell"}>
                            <img tabIndex={0} src={this.grid.getThemeToolbarIconFolder() + "/pdf.png"} className={"imageButtonPdf"}
                                alt={Constants.PGR_BTN_PDF_TOOLTIP} title={Constants.PGR_BTN_PDF_TOOLTIP} />
                        </span>
                    </span>);

            }
            if (this.grid.enablePrint || this.grid.enablePdf) {
                topLevelToolbarButtons.push(<span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span>
                );
            }

            if (this.grid.enableExport) {
                topLevelToolbarButtons.push(
                    <span key="11">
                        <span key={gridId + "btnWord"} id={gridId + "btnWord"} className={"pagerDiv  iconCell"}>
                            <Tooltip title={Constants.PGR_BTN_WORD_TOOLTIP}>
                                <img tabIndex={0} src={word} className={"imageButtonWord"}
                                    alt={Constants.PGR_BTN_WORD_TOOLTIP} style={{ marginTop: "9px" }} />
                            </Tooltip>
                        </span>
                    </span>);
            }
            if (this.grid.enableExport) {
                topLevelToolbarButtons.push(
                    <span key="12">
                        <span key={gridId + "btnExcel"} id={gridId + "btnExcel"} className={"pagerDiv  iconCell"}>
                            <Tooltip title={Constants.PGR_BTN_EXCEL_TOOLTIP}>
                                <img tabIndex={0} src={exporte} className={"imageButtonExcel"}
                                    alt={Constants.PGR_BTN_EXCEL_TOOLTIP} style={{ marginTop: "9px" }} />
                            </Tooltip>
                        </span>
                    </span>);
            }

        }
        let gridId = this.grid.id;
        gridId += "_";

        const val = <div className={"pagerControl flexiciousGridPager cellRenderer"} style={{ display: 'block' }}>
            <span className={"pagerTable"} key={gridId + "pagerTable"} style={{ float: "left", height: this.getHeight() + 'px' }}>
                {this.level.enablePaging ? <span key="pageInfo" className={"pagerDiv pageInfo"} /> : null}

                {this.level.enablePaging ? <span key={gridId + "btnFirstPage"} id={gridId + "btnFirstPage"} className={"pagerDiv iconCell firstPage"}>
                    <img alt='First Page' tabIndex='0' src={firstPageArrow} className={"imageButtonFirstPage"}
                        alt={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP} title={Constants.PGR_BTN_FIRST_PAGE_TOOLTIP} style={{ marginTop: "9px" }} />
                </span> : null}

                {this.level.enablePaging ? <span key={gridId + "btnPreviousPage"} id={gridId + "btnPreviousPage"} className={"pagerDiv iconCell prevPage"}>
                    <img alt='Previous Page' tabIndex='0' src={prevPage} className={"imageButtonPrevPage"}
                        alt={Constants.PGR_BTN_PREV_PAGE_TOOLTIP} title={Constants.PGR_BTN_PREV_PAGE_TOOLTIP} style={{ marginTop: "9px" }} />
                </span> : null}

                {this.level.enablePaging ? <span key={gridId + "btnNextPage"} id={gridId + "btnNextPage"} className={"pagerDiv iconCell nextPage"}>
                    <img alt='Next Page' tabIndex='0' src={nextPage} className={"imageButtonNextPage"}
                        alt={Constants.PGR_BTN_NEXT_PAGE_TOOLTIP} title={Constants.PGR_BTN_NEXT_PAGE_TOOLTIP} style={{ marginTop: "9px" }} />
                </span> : null}

                {this.level.enablePaging ? <span key={gridId + "btnLastPage"} id={gridId + "btnLastPage"} className={"pagerDiv iconCell lastPage"}>
                    <img alt='Next Page' tabIndex='0' src={lastPage} className={"imageButtonLastPage"}
                        alt={Constants.PGR_BTN_LAST_PAGE_TOOLTIP} title={Constants.PGR_BTN_LAST_PAGE_TOOLTIP} style={{ marginTop: "9px" }} />
                </span> : null}

                {this.level.enablePaging ? <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span> : null}

                {this.level.enablePaging ? <span key={gridId + "lblGotoPage"} id={gridId + "lblGotoPage"} className={"pagerDiv  gotoPage"}>
                    {flexiciousNmsp.Constants.PGR_LBL_GOTO_PAGE_TEXT} <select className={"pageDropdown"}> </select> </span> : null}

                {this.level.enablePaging ? <span key={gridId + "linesep" + linesep++} className={"pagerDiv lineSep"}>&nbsp;</span> : null}
            </span>
            <span key={gridId + "pagerTable2"} className={"pagerTable"} style={{ float: 'right', height: this.getHeight() + 'px' }} >
                {this.addToolbarActionsHTML().concat(topLevelToolbarButtons)}
            </span>

        </div>;
        this.children = [val]
        return super.render();
        //return val;
    }
    componentDidMountCustom() {
        this.initializeButtons([PagerControl.ACTION_FIRST_PAGE,
        PagerControl.ACTION_FIRST_PAGE,
        PagerControl.ACTION_PREV_PAGE,
        PagerControl.ACTION_NEXT_PAGE,
        PagerControl.ACTION_LAST_PAGE,
        PagerControl.ACTION_SORT,
        PagerControl.ACTION_SETTINGS,
        PagerControl.ACTION_OPEN_SETTINGS,
        PagerControl.ACTION_SAVE_SETTINGS,
        PagerControl.ACTION_OPEN_SETTINGS,
        PagerControl.ACTION_FILTER_SHOW_HIDE,
        PagerControl.ACTION_RUN_FILTER,
        PagerControl.ACTION_CLEAR_FILTER,
        PagerControl.ACTION_PRINT,
        PagerControl.ACTION_PDF,
        PagerControl.ACTION_WORD,
        PagerControl.ACTION_EXCEL,
        PagerControl.ACTION_EXPAND_UP,
        PagerControl.ACTION_EXPAND_ALL,
        PagerControl.ACTION_EXPAND_DOWN,
        PagerControl.ACTION_COLLAPSE_ALL
        ]);
        const pageDropDown = this.getPageDropdown();
        if (!this.level) {
            return;
        }
        if (this.level.enablePaging) {
            if (pageDropDown) {
                //TODO
                pageDropDown.pagerControl = this;
                UIUtils.addDomEventListener(this, pageDropDown, "change", onPageDropdownChange)
            }
        }
        this.refresh();
        this.grid.addEventListener(this, flexiciousNmsp.FlexDataGrid.EVENT_CHANGE, this.refresh);

    }
    enableDisableButton(button, enabled) {
        button.enabled = enabled;
        if (!button.enabled) {
            UIUtils.attachClass(button, "disabled")
            const img = UIUtils.findFirstElementByTagName(button, "IMG");
            if (img) {
                UIUtils.detachClass(img, "over")
                //this.grid.domElement.focus();
            }
        }
        else
            UIUtils.detachClass(button, "disabled")
    }

    rebuild() {
        this.invalidateDisplayList();
    }

    refresh() {
        if (!this.domElement) {
            return;
        }
        const children = UIUtils.findElementsWithClassName(this.domElement, "toolbarButtonIconCell");
        let i;
        for (i = 0; i < children.length; i++) {
            const button = children[i];
            const action = this.grid.toolbarActions[i];
            this.enableDisableButton(button, this.grid.isToolbarActionValid(action, button, this));
            let iconUrl = action.iconUrl;
            if (!button.enabled && action.disabledIconUrl) {
                iconUrl = action.disabledIconUrl;
            }
            button.style.background = `background: transparent url(${iconUrl}) no- repeat left center`;
        }

        const pageInfo = UIUtils.findElementWithClassName(this.domElement, 'pageInfo');
        if (pageInfo)
            pageInfo.innerHTML = `${Constants.PGR_ITEMS} ${this.getPageStart()} ${Constants.PGR_TO} ${this.getPageEnd()} ${Constants.PGR_OF} ${this.getTotalRecords()}. ${Constants.PGR_PAGE} ${this.getPageIndex() + 1} ${Constants.PGR_OF} ${this.getPageCount()} `;
        const firstPage = UIUtils.findElementWithClassName(this.domElement, 'firstPage');
        if (firstPage)
            this.enableDisableButton(firstPage, this.getPageIndex() > 0);
        const prevPage = UIUtils.findElementWithClassName(this.domElement, 'prevPage');
        if (prevPage)
            this.enableDisableButton(prevPage, this.getPageIndex() > 0);
        const nextPage = UIUtils.findElementWithClassName(this.domElement, 'nextPage');
        if (nextPage)
            this.enableDisableButton(nextPage, this.getPageIndex() < (this.getPageCount() - 1));
        const lastPage = UIUtils.findElementWithClassName(this.domElement, 'lastPage');
        if (lastPage)
            this.enableDisableButton(lastPage, this.getPageIndex() < (this.getPageCount() - 1));
        const dp = this.getPageDropdown();
        const pi = this.getPageIndex();
        if (dp) {
            const options = [];
            if (dp.options) {
                dp.options.length = 0;
                for (i = 1; i <= this.getPageCount(); i++) {
                    const option = document.createElement("option");
                    option.value = i;
                    option.text = i;
                    option.selected = ((pi + 1 == i) ? 'selected' : '');
                    dp.options.add(option);
                }
            }
        }
    }

    destroyButtons(arr) {
        for (const obj of arr) {
            const img = UIUtils.findElementWithClassName(this.domElement, `imageButton${UIUtils.doCap(obj)}`);
            if (img) {
                img.code = obj;
                UIUtils.removeDomEventListener(img, "mouseover", imageButtonMouseOver)
                UIUtils.removeDomEventListener(img, "mouseout", imageButtonMouseOut)
                UIUtils.removeDomEventListener(img, "click", imageButtonClick);
                img.pagerControl = null;
                img.src = "";
            }
        }
    }

    initializeButtons(arr) {
        for (const obj of arr) {
            const img = UIUtils.findElementWithClassName(this.domElement, `imageButton${UIUtils.doCap(obj)}`);
            if (img) {
                img.code = obj;
                UIUtils.addDomEventListener(this, img, "mouseover", imageButtonMouseOver)
                UIUtils.addDomEventListener(this, img, "mouseout", imageButtonMouseOut)
                UIUtils.addDomEventListener(this, img, "click", imageButtonClick)
                img.pagerControl = this;
            }
        }
    }

    processAction(code) {
        if (code == PagerControl.ACTION_FIRST_PAGE) {
            this.onImgFirstClick();
        } else if (code == PagerControl.ACTION_PREV_PAGE) {
            this.onImgPreviousClick();
        } else if (code == PagerControl.ACTION_NEXT_PAGE) {
            this.onImgNextClick();
        } else if (code == PagerControl.ACTION_LAST_PAGE) {
            this.onImgLastClick();
        } else if (code == PagerControl.ACTION_SETTINGS) {
            this.onShowSettingsPopup();
        } else if (code == PagerControl.ACTION_OPEN_SETTINGS) {
            this.onOpenSettingsPopup();
        } else if (code == PagerControl.ACTION_SAVE_SETTINGS) {
            this.onSaveSettingsPopup();
        } else if (code == PagerControl.ACTION_CLEAR_FILTER) {
            this.onClearFilter();
        } else if (code == PagerControl.ACTION_EXCEL) {
            this.onExcelExport();
        } else if (code == PagerControl.ACTION_FILTER_SHOW_HIDE) {
            this.onShowHideFilter();
        } else if (code == PagerControl.ACTION_PDF) {
            this.onPdf();
        } else if (code == PagerControl.ACTION_PRINT) {
            this.onPrint();
        } else if (code == PagerControl.ACTION_RUN_FILTER) {
            this.onProcessFilter();
        } else if (code == PagerControl.ACTION_SORT) {
            this.grid.multiColumnSortShowPopup();
        } else if (code == PagerControl.ACTION_WORD) {
            this.onWordExport();
        } else if (code == PagerControl.ACTION_EXPAND_ALL) {
            this.grid.expandAll();
        } else if (code == PagerControl.ACTION_EXPAND_UP) {
            this.grid.expandUp();
        } else if (code == PagerControl.ACTION_EXPAND_DOWN) {
            this.grid.expandDown();
        } else if (code == PagerControl.ACTION_COLLAPSE_ALL) {
            this.grid.collapseAll();
        }

        this.refresh();
    }

    kill() {
        if (this.dead) return;
        this.destroy();
        this.level = null;
        this.rowInfo = null;
        this.grid = null;
        flexiciousNmsp.UIComponent.prototype.kill.apply(this);

    }
}

PagerControl.prototype.typeName = PagerControl.typeName = "PagerControl";
var uiUtil = flexiciousNmsp.UIUtils;
var flxConstants = flexiciousNmsp.Constants;
PagerControl.prototype.doDispatchEvents = true;


PagerControl.ACTION_FIRST_PAGE = "firstPage";
PagerControl.ACTION_PREV_PAGE = "prevPage";
PagerControl.ACTION_NEXT_PAGE = "nextPage";
PagerControl.ACTION_LAST_PAGE = "lastPage";
PagerControl.ACTION_SORT = "sort";
PagerControl.ACTION_SETTINGS = "settings";
PagerControl.ACTION_OPEN_SETTINGS = "openSettings";
PagerControl.ACTION_SAVE_SETTINGS = "saveSettings";
PagerControl.ACTION_FILTER_SHOW_HIDE = "filterShowHide";
PagerControl.ACTION_RUN_FILTER = "filter";
PagerControl.ACTION_CLEAR_FILTER = "clearFilter";
PagerControl.ACTION_PRINT = "print";
PagerControl.ACTION_PDF = "pdf";
PagerControl.ACTION_WORD = "word";
PagerControl.ACTION_EXCEL = "excel";
PagerControl.ACTION_EXPAND_DOWN = "expandDown";
PagerControl.ACTION_EXPAND_UP = "expandUp";
PagerControl.ACTION_EXPAND_ALL = "expandAll";
PagerControl.ACTION_COLLAPSE_ALL = "collapseAll";


var imageButtonMouseOver = event => {
    const target = event.currentTarget || event.srcElement;
    if (target.parentNode.className.includes("disabled")) return;
    if (!target.className.includes("over")) target.className = "over";
}
var imageButtonMouseOut = event => {
    const target = event.currentTarget || event.srcElement;
    if (target.parentNode.className.includes("disabled")) return;
    if (target.className.includes("over")) target.className = target.className.replace("over", "");
}
var imageButtonClick = event => {
    const target = event.currentTarget || event.srcElement;
    if (target.parentNode.className.includes("disabled")) return;
    target.pagerControl.processAction(target.code);
}
var onPageDropdownChange = event => {
    const target = event.currentTarget || event.srcElement;
    const pageIndex = target.value;
    const pagerControl = target.pagerControl;
    pagerControl.setPageIndex(parseInt(target.value) - 1);
    pagerControl.refresh();

}

flexiciousNmsp.PagerControl = PagerControl;