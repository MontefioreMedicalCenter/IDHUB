/* eslint-disable no-console */
import './index.scss'
import {
	Constants,
	StyleDefaults,
	ReactDataGrid,
} from '../../../flexicious'
import MaterialDataGrid from './material/grid/MaterialDataGrid'
import { toast } from 'react-toastify'

const iconExpand = '/keyboard_arrow_right.svg'
const iconCollapse = '/keyboard_arrow_up.svg'

Constants.IMAGE_PATH = '/images'
Constants.VERTICAL_SCROLLBAR_WIDTH = Constants.isMobileBrowser() ? 0 : 10
if (Constants.isMobileBrowser()) {
	Constants.HORIZONTAL_SCROLLBAR_HEIGHT = 10
}
// Constants.HORIZONTAL_SCROLLBAR_HEIGHT = Constants.isMobileBrowser() ? 10 : 25;
StyleDefaults.defaults.imagesRoot = Constants.IMAGE_PATH
StyleDefaults.defaults.toolbarImagesRoot = Constants.IMAGE_PATH
StyleDefaults.defaults.disclosureClosedIcon = iconExpand
StyleDefaults.defaults.disclosureOpenIcon = iconCollapse

export default class DataGrid extends MaterialDataGrid {
	constructor(props, arg1, arg2) {
		super(props, arg1, arg2)
		this.enableActiveCellHighlight = false
		this.setRowHeight(Constants.GLOBAL_ROW_HEIGHT)
		if (!props.headerRowHeight)
			this.setHeaderRowHeight(Constants.GLOBAL_ROW_HEIGHT)
		this.exportFileName = props.exportFileName
		this.setDataProvider(props.dataProvider || []) // initially no data
		if (props.dataProvider) {
			this.showSpinnerOnFilterPageSort = false
		}
		this.headerPaddingLeft = 4
		this.headerColors = this.columnGroupColors = [0xffffff, 0x99bbe8]
		//Vertical Grid Lines for all Grids
		this.verticalGridLines = true
		this.verticalGridLineColor = 0xcccccc
		this.headerVerticalGridLines = true
		this.measurerClassName = 'common-row-height-style'
		this.setFooterRowHeight(25)
		this.propertyBag = {
			...this.propertyBag,
			id: props.id
		}
		// eslint-disable-next-line no-unused-vars
		this.addEventListener(this, ReactDataGrid.EVENT_SCROLL, evt => {
			if (flexiciousNmsp.DisplayList.isMouseDown)
				this.localLastHScroll = this.getHorizontalScrollPosition()
			if (
				this.getVerticalScrollPosition() === 0 &&
				!flexiciousNmsp.DisplayList.isMouseDown
			) {
				//this means user is not scrolling to zero - just the grid is rebiulding.
				return
			}
			this.localLastVScroll = this.getVerticalScrollPosition()
			this.lastCalculatedTotalHeight = this.getBodyContainer()._calculatedTotalHeight
		})
		this.getBodyContainer().enableHorizontalRecycling = false
		if (this.variableRowHeight) this.recalculateSeedOnEachScroll = true
		this.paddingRight = Constants.GLOBAL_ROW_HEIGHT > 30 ? 5 : 2
		this.paddingLeft = this.paddingRight
		this.headerPaddingLeft = this.paddingRight
		this.headerPaddingRight = this.paddingRight
		this.enableHorizontalScrollOptimizationsBETA = true
		this.footerDrawTopBorder = true
		this.enableMultiColumnSort = true
		
	}
	onMouseWheel(event) {
		super.onMouseWheel(event)
		if (this.getVerticalScrollPosition() === 0) {
			this.localLastVScroll = 0
		}
	}
	getCurrentEditingCell(){
		return this.getCurrentEditCell();
	}
	refreshGrid = () => {
		this.rebuildBody()
	}

	/**
	 * @override
	 */
	getClassNames() {
		return ['Montefiore', ...super.getClassNames()]
	}
	setErrorByObject(item, fld, errorMsg) {
		super.setErrorByObject(item, fld, errorMsg);
		if(this.lastErrorMessage !== errorMsg){
			this.lastErrorMessage = errorMsg;
			toast.warning(errorMsg);

		}
	}
}
