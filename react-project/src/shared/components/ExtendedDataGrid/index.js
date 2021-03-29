/* eslint-disable no-console */
import "./index.scss";
import {
  Constants,
  StyleDefaults,
  ReactDataGrid,
  FlexDataGridEvent,
} from "../../../flexicious";
import MaterialDataGrid from "./material/grid/MaterialDataGrid";
import { toUintColorCode } from "../../utils";

const iconExpand = "/keyboard_arrow_right.svg";
const iconCollapse = "/keyboard_arrow_up.svg";

Constants.IMAGE_PATH = "/images";
Constants.VERTICAL_SCROLLBAR_WIDTH = Constants.isMobileBrowser() ? 0 : 10;
if (Constants.isMobileBrowser()) {
  Constants.HORIZONTAL_SCROLLBAR_HEIGHT = 10;
}
// Constants.HORIZONTAL_SCROLLBAR_HEIGHT = Constants.isMobileBrowser() ? 10 : 25;
StyleDefaults.defaults.imagesRoot = Constants.IMAGE_PATH;
StyleDefaults.defaults.toolbarImagesRoot = Constants.IMAGE_PATH;
StyleDefaults.defaults.disclosureClosedIcon = iconExpand;
StyleDefaults.defaults.disclosureOpenIcon = iconCollapse;

export default class DataGrid extends MaterialDataGrid {
  constructor(props, arg1, arg2) {
    super(props, arg1, arg2);
    this.enableActiveCellHighlight = false;
    this.setRowHeight(Constants.GLOBAL_ROW_HEIGHT);
    if (!props.headerRowHeight)
      this.setHeaderRowHeight(Constants.GLOBAL_ROW_HEIGHT);
    this.exportFileName = props.exportFileName;
    this.setDataProvider(props.dataProvider || []); // initially no data
    if (props.dataProvider) {
      this.showSpinnerOnFilterPageSort = false;
    }
    this.headerPaddingLeft = 4;
    //Vertical Grid Lines for all Grids
    this.verticalGridLines = true;
    this.verticalGridLineColor = 0xcccccc;
    this.headerVerticalGridLines = true;
    this.measurerClassName = "common-row-height-style";
    this.setFooterRowHeight(25);
    this.propertyBag = {
      ...this.propertyBag,
      id: props.id,
    };
    this.addEventListener(
      this,
      FlexDataGridEvent.BODY_CONTAINER_MOUNTED,
      this.onBodyContainerMounted
    );
    // eslint-disable-next-line no-unused-vars
    this.addEventListener(this, ReactDataGrid.EVENT_SCROLL, (evt) => {
      if (flexiciousNmsp.DisplayList.isMouseDown)
        this.localLastHScroll = this.getHorizontalScrollPosition();
      if (
        this.getVerticalScrollPosition() === 0 &&
        !flexiciousNmsp.DisplayList.isMouseDown
      ) {
        //this means user is not scrolling to zero - just the grid is rebiulding.
        return;
      }
      this.localLastVScroll = this.getVerticalScrollPosition();
      this.lastCalculatedTotalHeight = this.getBodyContainer()._calculatedTotalHeight;
    });
    this.addEventListener(
      this,
      FlexDataGridEvent.COLUMNS_SHIFT,
      this.savePreferences
    );
    this.addEventListener(
      this,
      FlexDataGridEvent.COLUMN_STRETCH,
      this.savePreferences
    );
    this.dispatchRendererInitialized = true;
    this.addEventListener(
      this,
      FlexDataGridEvent.RENDERER_INITIALIZED,
      this.handleRendererInitialized
    ); // this is an event listener for automatic testing

    this.addEventListener(this, FlexDataGridEvent.HEADER_CLICKED, (event) => {
      setTimeout(() => {
        // below condition is used to neglect the save prefrences service call when we click on select all checkbox
        //https://trello.com/c/F9PaKyo5/2446-record-progress-new-when-selecting-all-students-or-deselecting-all-students-no-service-call-needs-to-be-made-just-clear-out-the
        !event.column.implementsOrExtends("FlexDataGridCheckBoxColumn") &&
          !this.disablePrefrencesOnHeaderClick &&
          this.savePreferences();
      }, 10);
    });

    // this.restoreVerticalScrollEnabled = false;
    // this.restoreHorizontalScrollEnabled = false;
    this.gotoRowIndex = -1;
    window.addEventListener("resize", this.refreshGrid);
    this.getBodyContainer().enableHorizontalRecycling = false;
    if (this.variableRowHeight) this.recalculateSeedOnEachScroll = true;
    this.paddingRight = Constants.GLOBAL_ROW_HEIGHT > 30 ? 5 : 2;
    this.paddingLeft = this.paddingRight;
    this.headerPaddingLeft = this.paddingRight;
    this.headerPaddingRight = this.paddingRight;
    this.enableHorizontalScrollOptimizationsBETA = true;
    this.footerDrawTopBorder = true;
    this.dragTriggerComponentCheckerFunction = this.dragTriggerComponentCheckerFunction;
    this.enableMultiColumnSort = true;
  }
  onMouseWheel(event) {
    super.onMouseWheel(event);
    if (this.getVerticalScrollPosition() === 0) {
      this.localLastVScroll = 0;
    }
  }
  concatenatePersistenceValues() {
    //we dont want to persist Constants.PERSIST_VERTICAL_SCROLL and Constants.PERSIST_HORIZONTAL_SCROLL
    return [
      Constants.PERSIST_COLUMN_ORDER,
      Constants.PERSIST_COLUMN_VISIBILITY,
      Constants.PERSIST_COLUMN_WIDTH,
      Constants.PERSIST_FILTER,
      Constants.PERSIST_SORT,
      // Constants.PERSIST_VERTICAL_SCROLL,
      // Constants.PERSIST_HORIZONTAL_SCROLL,
      Constants.PERSIST_FOOTER_FILTER_VISIBILITY,
      Constants.PERSIST_PAGE_SIZE,
      Constants.PERSIST_PRINT_SETTINGS,
    ].join(",");
  }
  //only start a drag if we are dragging the arrow (this is important for iPAd because the scroll and drag gestures are conflicting)
  dragTriggerComponentCheckerFunction = (event) => {
    let target = document.elementFromPoint(event.pageX, event.pageY);

    while (target) {
      if (
        typeof target.className === "string" &&
        target.className.indexOf("dragTrigger") >= 0
      ) {
        return true;
      }
      target = target.parentNode;
    }

    return false;
  };
  refreshGrid = () => {
    this.rebuildBody();
  };

  handleRendererInitialized = ({ cell, column }) => {
    // this is an unique functionality for automatic testing
    if (column && cell && column._uniqueIdentifier) {
      const rowData = cell.rowInfo.getData();
      const automationName = `${column.type === "checkbox"
        ? rowData[column._uniqueIdentifier]
        : column._uniqueIdentifier + "-" + rowData[column.dataField]
        }`;

      cell.setAutomationName(automationName);
    }
  };

  setFooterRowHeight = (height) => {
    // By default footer height is 25 . For manually setting footer height -> pass the desired footer row height in footerRowHeight
    height = this.props.footerRowHeight ? this.props.footerRowHeight : height;

    return this.getColumnLevel().setFooterRowHeight(
      this.props.enableDrag ? height : null
    );
  };
  componentDidMount() {
    super.componentDidMount();
    if (this.props.applySavedPreferencesOnMount) {
    }
    this.domElement.addEventListener(
      "mousedown",
      this.onGridMouseDownClearSelection
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.refreshGrid);
    this.domElement.removeEventListener(
      "mousedown",
      this.onGridMouseDownClearSelection
    );
  }
  onGridMouseDownClearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {
      // IE?
      document.selection.empty();
    }
  }

  savePreferences(evt, clearPreferences = false) {

  }

  /**
   * @override
   */
  getClassNames() {
    return ["Montefiore", ...super.getClassNames()];
  }

  buildColumns = () => {
    //this is overridden in the student grid.
  };


  setPreferences(val) {
    this.pausePreferences = true;
    super.setPreferences(val);
    this.pausePreferences = false;
  }
  setDataProvider(val) {
    //for flat grids that have clearSelectionOnDataProviderChange.
    //if we get new dataprovider, we need to check to see if items
    //that were previously selected are currently selectable.
    if (val && val.length && val !== this._dataProvider) {
      if (!this.clearSelectionOnDataProviderChange) {
        const selectedItemsToRemove = [];
        const thisSelectedItems = this._columnLevel._selectedObjects;

        for (const selectedItem of thisSelectedItems) {
          let selectedItemFound = false;

          for (const dataProviderItem of val) {
            if (
              this._columnLevel.areItemsEqual(selectedItem, dataProviderItem)
            ) {
              selectedItemFound = true;
              break;
            }
          }
          if (!selectedItemFound) {
            selectedItemsToRemove.push(selectedItem);
          }
        }

        for (const selectedItemToRemove of selectedItemsToRemove) {
          this._columnLevel.removeSelectedItem(selectedItemToRemove);
        }
      }
    }
    const currentDataProvider = this._dataProvider;

    if (
      this.props.mergeSimilarDataProviders &&
      currentDataProvider &&
      val &&
      currentDataProvider.length &&
      val.length &&
      currentDataProvider.length === val.length &&
      this._dataProvider !== val
    ) {
      if (this.areArraysEqual(currentDataProvider, val)) {
        this._dataProvider = val;
        this.rebuildBody();

        return;
      }
    }
    super.setDataProvider(val);
  }
  areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (!this.getColumnLevel().areItemsEqual(arr1[i], arr2[i])) return false;
    }

    return true;
  }
  isRowVisible(dataObject) {
    for (const row of this.getBodyContainer().rows) {
      if (
        row.rowPositionInfo
          .getLevel(this)
          .areItemsEqual(row.rowPositionInfo.rowData, dataObject)
      ) {
        return true;
      }
    }

    return false;
  }
  /**
   * @event
   */
  onBodyContainerMounted = () => {
    const bodyContainer = this.getBodyContainer();

    setTimeout(() => {
      if (
        this.gotoRowIndex >= 0 &&
        this.gotoRowIndex < this.getDataProvider().length
      ) {
        this.gotoRow(this.gotoRowIndex);
        this.gotoRowIndex = -1;
      }
      if (bodyContainer.grid === this) {
        //if we set a pending scroll, we HAVE to navigate to it.
        let didSetPendingScroll = false;

        if (this.pendingScrollAndSelectItem) {
          const rowPositions = this.getBodyContainer().itemVerticalPositions;

          for (const rowPositionInfo of rowPositions) {
            const lvl = rowPositionInfo.getLevel(this);

            if (
              lvl.areItemsEqual(
                this.pendingScrollAndSelectItem,
                rowPositionInfo.rowData
              )
            ) {
              if (
                this.localLastVScroll + bodyContainer.getHeight() <
                rowPositionInfo.getVerticalPosition() ||
                this.localLastVScroll > rowPositionInfo.getVerticalPosition()
              )
                this.localLastVScroll = rowPositionInfo.getVerticalPosition(); //only reset vsp if the row would not be visible otherwise
              this.pendingScrollAndSelectItem = null;
              didSetPendingScroll = true;
              if (!lvl.isItemSelected(rowPositionInfo.rowData)) {
                lvl.addSelectedItem(rowPositionInfo.rowData);
              }
              break;
            }
          }
        }

        //so the problem with this is that the grid refreshes many times when the same data is updated
        //OR when the entire grid gets new data. We should maintain scroll position only when same data is updaetd
        //and go back to 0 when we get completely new data. So I am coming up with this RANDOM 200 px difference
        //if I get new data provider, and total height is just 200px diff than before, we maintain scroll else we dont,
        //we go back to 0
        if (
          didSetPendingScroll ||
          Math.abs(
            this.lastCalculatedTotalHeight -
            bodyContainer._calculatedTotalHeight
          ) < 200
        ) {
          if (this.restoreVerticalScrollEnabled && this.localLastVScroll)
            bodyContainer.setAttribute("scrollTop", this.localLastVScroll || 0);
        } else {
          if (bodyContainer._calculatedTotalHeight > 0)
            this.localLastVScroll = this.localLastVScroll = 0;
        }
      }
      if (this.restoreHorizontalScrollEnabled && this.localLastHScroll) {
        bodyContainer.setAttribute("scrollLeft", this.localLastHScroll || 0);
        //this.localLastHScroll = 0;
      }

      if (
        this.recyclePending ||
        this.restoreVerticalScrollEnabled ||
        this.restoreHorizontalScrollEnabled
      ) {
        this.recyclePending = false;
        bodyContainer.recycle(this.getColumnLevel(), false, 0, false);
      }
    }, 200);
  };

  invalidateRecycle = () => {
    this.recyclePending = true;
  };

  onGridMouseOut() {
    if (this.dropIndicator) this.dropIndicator.setVisible(false);
    super.onGridMouseOut();
    this.getBodyContainer().gridMouseOut();
  }
  applyMaterialStyles = ({
    rollOverColor,
    textRollOverColor,
    selectionColor,
    textSelectedColor,
    headerColor,
  }) => {
    // this.alternatingItemColors = [0xFFFFFF, 0xFFFFFF],
    this.alternatingTextColors = [0x000000, 0x000000];
    this.rollOverColor = rollOverColor
      ? toUintColorCode(rollOverColor)
      : 0xcedbef;
    // this.headerRollOverColors =  [0xE6E6E6, 0xFFFFFF],
    this.headerRollOverColors = headerColor
      ? [toUintColorCode(headerColor), toUintColorCode(headerColor)]
      : [0xffffff, 0xffffff];
    this.headerColors = headerColor
      ? [toUintColorCode(headerColor), toUintColorCode(headerColor)]
      : [0xffffff, 0xffffff];
    this.columnGroupColors = this.headerColors;
    this.columnGroupRollOverColors = this.headerRollOverColors;
    this.textSelectedColor = textSelectedColor
      ? toUintColorCode(textSelectedColor)
      : 0x000000;
    this.textRollOverColor = textRollOverColor
      ? toUintColorCode(textRollOverColor)
      : 0x000000;
    // this.borderColor = 0x666666,
    this.selectionColor = selectionColor
      ? [toUintColorCode(selectionColor), toUintColorCode(selectionColor)]
      : [0xffffff, 0xffffff];

    this.refreshCells();
  };

  static countSelectedRows = (dataGrid) => {
    return dataGrid && dataGrid.getSelectedItems()
      ? dataGrid.getSelectedItems().length
      : 0;
  };

  static setSelectionExpandColaps = (dataProvider, grid) => {
    if (!dataProvider || dataProvider.lenth || !grid) {
      return;
    }

    const expandChildrenData = function (
      grid,
      rowData,
      disbleExpand,
      disableSelection
    ) {
      const level = grid.getLevelForItem(rowData);

      if (level) {
        !disableSelection && level.addSelectedItem(rowData);
        !disbleExpand && grid.expandCollapseItem(rowData, true, level);
      }
    };

    dataProvider.forEach((obj) => {
      obj && expandChildrenData(grid, obj, !obj.isExpanded, !obj.isSelected);

      if (obj && obj.children && obj.children.length) {
        obj &&
          obj.children.forEach((obj2) => {
            obj2 &&
              expandChildrenData(
                grid,
                obj2,
                !obj2.isExpanded,
                !obj2.isSelected
              );

            if (obj2 && obj2.children && obj2.children.length) {
              obj2.children.forEach((obj3) => {
                obj3 && expandChildrenData(grid, obj3, true, !obj3.isSelected);
              });
            }
          });
      }
    });
  };

  static updatePreviousSelection = (
    grid,
    selectedItems,
    dataField,
    firstOccuranceOnly = false,
    gotoRow = false
  ) => {
    if (selectedItems && !Array.isArray(selectedItems)) {
      selectedItems = [selectedItems];
    }
    let dp,
      rowIndex = 0;

    if (
      selectedItems &&
      grid &&
      (dp = grid.getDataProvider()) &&
      dp.length > 0
    ) {
      grid.clearSelection();
      dp.every((item, index) => {
        const matchedItems = selectedItems.filter(
          (newItem) => newItem[dataField] === item[dataField]
        );

        if (matchedItems.length > 0) {
          grid.addSelectedItem(item);
          rowIndex = index;

          // if (selectedItems.length === 1) {
          //     grid.gotoRowIndex = index;
          // }

          if (firstOccuranceOnly) {
            return false;
          }
        }

        return true;
      });

      grid.invalidateCells();
      //grid.refreshCells();
      if (gotoRow && rowIndex && grid.getSelectedItems().length) {
        grid.pendingScrollAndSelectItem = grid.getSelectedItems()[0];
      }

      return rowIndex;
    }
  };

  static updatePresetStyle = ({ theme, classes }, grid) => {
    if (grid && theme) {
      const { getContrastText } = theme.palette;

      grid.applyMaterialStyles({
        rollOverColor: theme.palette.primary.light,
        selectionColor: theme.palette.primary.light,
        textRollOverColor: getContrastText(theme.palette.primary.light),
        textSelectedColor: getContrastText(theme.palette.primary.main),
        headerColor: theme.palette.primary.main,
      });
      grid.headerStyleName = classes ? classes.gridHeader : "";
      grid.rebuildHeader(); // sync with global switched theme
    }
  };
  expandCollapseItem = (data, open, level) => {
    if (open) {
      this.getBodyContainer().addOpenItem(data);
    } else {
      this.expandChildrenOf(data, open, level);
    }

    this.validateNow(); //make sure we have rows...
    this.rebuildBody();
  };

  // getParentLevelRowData
  // It will return the parent level rowData for the corresponding child row
  getParentLevelRowData = (key) => {
    // pass the selectedKeyField from the child row
    return this.getBodyContainer().parentMap[key];
  };
  exportFile = () => {
    this.defaultExcelHandlerFunction();
  };
  getWidthFromCharmap(v, width) {
    if (!this.charsMap) {
      this.generateCharacterWidthMap();
    }
    var largestH = this.getRowHeight();

    if (v && v !== "undefined") {
      let t = 0;

      for (var i = 0; i < v.length; i++) {
        t += this.charsMap[v.charAt(i)] || this.charsMap["W"];
      }
      const lines = Math.round(t / width) || 1;

      t = lines * 14;
      t += 15;
      t += 15; //padding top/bottom
      if (largestH < t) {
        largestH = t;
      }
    }

    return largestH;
  }
  calculateRowHeightWithCharMap(item, level) {
    if (!this.charsMap) {
      this.generateCharacterWidthMap();
    }
    var largestH = level.grid.getRowHeight();
    const cols = level.getVisibleColumns();

    cols.forEach((col) => {
      if (col.wordWrap && col.dataField) {
        const v = String(item[col.dataField]);

        if (v && v !== "undefined") {
          let t = 0;

          for (var i = 0; i < v.length; i++) {
            t += this.charsMap[v.charAt(i)] || this.charsMap["W"];
          }
          const lines = Math.round(t / (col.getWidth() - 10)) || 1;

          t = lines * 14;
          t += col.paddingBottom ? col.paddingBottom : 15;
          t += col.paddingTop ? col.paddingTop : 15;
          if (largestH < t) {
            largestH = t;
          }
        }
      }
    });

    return Math.round(largestH);
  }

  /**
   * Return true if enableStickyControlKeySelection  Or (Control Key is down AND (selectionMode is MultipleRows or MultipleCells))
   * @method isCtrlKeyDownOrSticky
   */
  isCtrlKeyDownOrSticky(event) {
    const ctrlKey =
      event.ctrlKey || (event.triggerEvent && event.triggerEvent.metaKey);

    return (
      (ctrlKey &&
        (this.getSelectionMode() ===
          flexiciousNmsp.NdgBase.SELECTION_MODE_MULTIPLE_ROWS ||
          this.getSelectionMode() ===
          flexiciousNmsp.NdgBase.SELECTION_MODE_MULTIPLE_CELLS)) ||
      this.enableStickyControlKeySelection
    );
  }
}
