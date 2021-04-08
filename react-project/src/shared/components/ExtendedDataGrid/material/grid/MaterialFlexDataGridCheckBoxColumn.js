import {
	FlexDataGridCheckBoxColumn,
	ClassFactory
} from '../../../../../flexicious'
import MaterialTristateCheckBox from './MaterialTristateCheckBox'

export default class MaterialFlexDataGridCheckBoxColumn extends FlexDataGridCheckBoxColumn {
	constructor() {
		super()
		/**
		 * @type {null}
		 * @property itemRenderer
		 * @default MaterialFlexDataGridCheckBoxColumn.static_TriStateCheckBox
		 */
		this.itemRenderer =
			MaterialFlexDataGridCheckBoxColumn.static_TriStateCheckBox

		/**
		 * @type {null}
		 * @property headerRenderer
		 * @default MaterialFlexDataGridCheckBoxColumn.static_TriStateCheckBox
		 */
		this.headerRenderer =
			MaterialFlexDataGridCheckBoxColumn.static_TriStateCheckBox
	}
}
MaterialFlexDataGridCheckBoxColumn.static_TriStateCheckBox = new ClassFactory(
	MaterialTristateCheckBox,
	undefined
)
MaterialFlexDataGridCheckBoxColumn.static_FlexDataGridDataCellUIComponent = new ClassFactory(
	MaterialTristateCheckBox,
	undefined
)
