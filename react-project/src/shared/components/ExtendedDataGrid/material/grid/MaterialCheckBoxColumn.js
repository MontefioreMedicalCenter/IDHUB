import {
	ReactDataGridColumn,
	ClassFactory,
	Constants
} from '../../../../../flexicious'
import MaterialTristateCheckBox from './MaterialTristateCheckBox'

export default class MaterialCheckBoxColumn extends ReactDataGridColumn {}
MaterialCheckBoxColumn.defaultProps = {
	itemRenderer: new ClassFactory(MaterialTristateCheckBox),
	headerRenderer: new ClassFactory(MaterialTristateCheckBox),
	type: 'checkbox',
	width: Constants.GLOBAL_ROW_HEIGHT,
	columnWidthMode: 'fixed'
}
