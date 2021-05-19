/* eslint-disable react/no-children-prop */
/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
import {
	/* UIUtils, */ Constants,
	UIComponent
} from '../../../../../flexicious'
import React from 'react'
import ContextPoupContent from '../../../ContextMenuPopup'
//import RightClickPopup from "../../../../container/Views/PlanGrid/RightClickPopup";

class ContextMenuPopup extends React.Component {
	componentDidMount() {
		if (this.props.onContextMenuCreated) {
			this.props.onContextMenuCreated()
		}
	}

	render() {
		return <div>{this.props.children || ''}</div>
	}
}

/**
 * A MaterialContextMenu that which can be used for right context menu for copy data.
 * @constructor
 * @class MaterialContextMenu
 * @namespace flexiciousNmsp
 */
export default class MaterialContextMenu extends UIComponent {
	constructor() {
		super({}, 'div')
		this.attachClass('flexiciousGrid')
		this.setWidth(200)
		this.processAction = this.processAction.bind(this)
		this.handleOnFocus = this.handleOnFocus.bind(this)
		this.handleOnBlur = this.handleOnBlur.bind(this)
		this.handleClickOutside = this.handleClickOutside.bind(this)
		this.handledClickOutside = true
		document.addEventListener('mousedown', this.handleClickOutside)
		this.handleOnContextMenuCreated = this.handleOnContextMenuCreated.bind(this)
	}

	/**
	 * This is a mechanism to replicate the "is" and "as" keywords of most other OO programming languages
	 * @return {Array}
	 */
	getClassNames() {
		return ['MaterialContextMenu', 'UIComponent']
	}

	setGrid(val) {
		this.grid = val
		// this.selectedObjects = val.getSelectedObjectsTopLevel();
		this.currentCell = val.currentCell
	}

	close(dialogResult) {
		const closeEvent = new flexiciousNmsp.BaseEvent(Constants.EVENT_CLOSE)

		closeEvent.detail = dialogResult
		this.dispatchEvent(closeEvent)
		this.grid.removePopup(this.popup)
	}

	onCancel() {
		this.grid.removePopup(this.popup)
	}

	processAction(action) {
		this.close(action)
	}

	showDialog() {
		if (!this.grid.enableHideBuiltInContextMenuItems) return
		// this.popup = UIUtils.addPopUp(this.render(), this.grid, false, null, "", []);
		this.popup = this.addPopup(this.render(), this.handleOnContextMenuCreated)
		this.grid.addPopup(this.popup)
	}

	addPopup(elem, onContextMenuCreated) {
		return (
			<ContextMenuPopup
				children={elem}
				onContextMenuCreated={onContextMenuCreated}
			/>
		)
	}

	handleOnContextMenuCreated() {
		this.contextMenu.style.left = this.x + 'px'
		this.contextMenu.style.top = this.y + 'px'
		this.contextMenu.style.display = 'block'
	}

	handleClickOutside() {
		this.close(null)
	}

	handleOnFocus() {
		if (this.handledClickOutside) {
			this.handledClickOutside = false
			document.removeEventListener('mousedown', this.handleClickOutside)
		}
	}

	handleOnBlur() {
		if (!this.handledClickOutside) {
			this.handledClickOutside = true
			document.addEventListener('mousedown', this.handleClickOutside)
		}
	}

	/**
	 * Initializes the auto complete and watermark plugins
	 */
	render() {
		return (
			<div
				key="contextMenuPopup"
				ref={cm => (this.contextMenu = cm)}
				className={'contextMenuPopup'}
				onMouseEnter={this.handleOnFocus}
				onMouseLeave={this.handleOnBlur}>
				{this.grid.disableContextMenu ? null : (
					<ContextPoupContent
						handleOnProcessAction={this.processAction}
						SelectionMode={this.grid.getSelectionMode()}
						width={this.width}
					/>
				)}
			</div>
		)
	}
}

flexiciousNmsp.MaterialContextMenu = MaterialContextMenu //add to name space
MaterialContextMenu.prototype.typeName = MaterialContextMenu.typeName =
	'MaterialContextMenu' //for quick inspection

MaterialContextMenu.ACTION_COPY_CELL = Constants.COPY_CELL
MaterialContextMenu.ACTION_COPY_ROW = Constants.COPY_ROW
MaterialContextMenu.ACTION_COPY_TABLE = Constants.COPY_TABLE
MaterialContextMenu.ACTION_COPY_SELECTED_RECORDS =
	Constants.COPY_SELECTED_RECORDS

MaterialContextMenu.TXT_COPY_CELL = 'Copy Cell'
MaterialContextMenu.TXT_COPY_ROW = 'Copy Row'
MaterialContextMenu.TXT_COPY_TABLE = 'Copy Table'
MaterialContextMenu.TXT_COPY_SELECTED_RECORDS = 'Copy Selected Records'
