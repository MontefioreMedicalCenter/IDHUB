import {
	ReactDataGrid,
	UIUtils,
	FlexDataGridColumnLevel,
	ClassFactory
} from '../../../../../flexicious'
import '../styles.css'
import MaterialAdapter from '../adapter/MaterialAdapter'
import MaterialToolbar from '../adapter/toolbar/MaterialToolbar'
import MaterialMultiSelectComboBox from './MaterialMultiSelectComboBox'
import MaterialComboBox from './MaterialComboBox'
import MaterialDateComboBox from './MaterialDateComboBox'
import MaterialTextInput from './MaterialTextInput'
import MaterialNumericRangeBox from './MaterialNumericRangeBox'

UIUtils.adapter = new MaterialAdapter()
FlexDataGridColumnLevel.static_FlexDataGridPager = new ClassFactory(
	MaterialToolbar
)

export default class MaterialDataGrid extends ReactDataGrid {
	constructor(props) {
		super(props)
		this.noDataMessage = ''
		const cols = this.getColumns()

		for (const col of cols) {
			col.selectable = true
		}
	}
	setColumns(val) {
		//trello.com/c/M95BNhp7/1627-conference-generate-reports-student-notes-is-there-a-way-to-be-able-to-scrape-over-text-in-a-note-to-copy-it-without-making-the
		for (const col of val) {
			col.selectable = true
			//https://trello.com/c/kAYsI0YW/1813-all-grids-sort-all-grid-columns-alphabetically-not-case-sensitive
			if (!col.sortNumeric && !col._labelFunction) {
				//unless we have sort numeric or label function, just use case insensitive sort
				col.sortCaseInsensitive = true
			}
			if (col.dataField === 'Sequence' || col._headerText === 'Seq') {
				col.sortNumeric = true
			}

			// This is used for show hover label in particular column
			const check =
				col._headerText === 'Topic' ||
				col._headerText === 'Presentation/Material' ||
				col._headerText === 'Lesson' ||
				col._headerText === 'Lesson Element'

			if (check) {
				col.truncateToFit = true
			}
		}
		super.setColumns(val)
	}
	getClassNames() {
		return ['MaterialDataGrid', ...super.getClassNames()]
	}
	applyAttribute(target, attr, node, direct) {
		const attrName = direct ? attr : attr.name
		const val = direct ? node : node.attributes.getNamedItem(attrName).value

		if (attrName === 'filterControl') {
			//we automatically swap this out for a material filter control
			if (val === 'MultiSelectComboBox') {
				attr = 'filterRenderer'
				node = new ClassFactory(MaterialMultiSelectComboBox)
			} else if (val === 'ComboBox') {
				attr = 'filterRenderer'
				node = new ClassFactory(MaterialComboBox)
			} else if (val === 'DateComboBox') {
				attr = 'filterRenderer'
				node = new ClassFactory(MaterialDateComboBox)
			} else if (val === 'TextInput') {
				attr = 'filterRenderer'
				node = new ClassFactory(MaterialTextInput)
			} else if (val === 'NumericRangeBox') {
				attr = 'filterRenderer'
				node = new ClassFactory(MaterialNumericRangeBox)
			}
		}
		if (node !== undefined) super.applyAttribute(target, attr, node, direct)
	}
}
