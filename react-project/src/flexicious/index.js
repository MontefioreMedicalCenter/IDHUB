// @flow

import {
	AdvancedFilter,
	BaseEvent,
	CellInfo,
	CellUtils,
	ChangeInfo,
	ClassFactory,
	ComboBox,
	ComponentAdditionResult,
	ComponentInfo,
	Constants,
	CsvExporter,
	CurrencyFormatter,
	DateComboBox,
	DateFormatter,
	DatePicker,
	DateRange,
	DateRangePicker,
	DateUtils,
	DisplayList,
	DocExporter,
	ElasticContainer,
	EventDispatcher,
	ExcelExporter,
	ExpandCollapseIcon,
	ExportController,
	ExportEvent,
	ExportOptions,
	ExportOptionsView,
	Exporter,
	ExtendedExportController,
	ExtendedFilterPageSortChangeEvent,
	FactoryKey,
	Filter,
	FilterContainerImpl,
	FilterExpression,
	FilterPageSortChangeEvent,
	FilterSort,
	FlexDataGrid,
	FlexDataGridBodyContainer,
	FlexDataGridCell,
	FlexDataGridCheckBoxColumn,
	FlexDataGridColumn,
	FlexDataGridColumnGroup,
	FlexDataGridColumnGroupCell,
	FlexDataGridColumnLevel,
	FlexDataGridContainerBase,
	FlexDataGridDataCell,
	FlexDataGridEvent,
	FlexDataGridExpandCollapseCell,
	FlexDataGridExpandCollapseHeaderCell,
	FlexDataGridFilterCell,
	FlexDataGridFooterCell,
	FlexDataGridHeaderCell,
	FlexDataGridHeaderContainer,
	FlexDataGridHeaderSeperator,
	FlexDataGridItemEditEvent,
	FlexDataGridLevelRendererCell,
	FlexDataGridPaddingCell,
	FlexDataGridPagerCell,
	FlexDataGridVirtualBodyContainer,
	GridPreferencesInfo,
	HtmlExporter,
	InsertionLocationInfo,
	ItemLoadInfo,
	ItemPositionInfo,
	KeyValuePairCollection,
	Label,
	LevelSelectionInfo,
	LockedContent,
	MultiSelectComboBox,
	MultiSelectComboBoxEx,
	MultiSelectTextInput,
	NdgBase,
	NumberFormatter,
	NumericRangeBox,
	OpenSettingsPopup,
	PageSize,
	PagerControl,
	Point,
	PreferenceInfo,
	PreferencePersistenceEvent,
	PrintExportDataRequestEvent,
	PrintExportFilter,
	PrintOptions,
	ReactDataGrid,
	ReactDataGridCellContainer,
	ReactDataGridColumn,
	ReactDataGridColumnGroup,
	ReactDataGridColumnLevel,
	ReactDataGridPsuedoScroll,
	ReactDataGridPsuedoScrollBodyContainer,
	Rectangle,
	RendererCache,
	RowInfo,
	RowPositionInfo,
	SaveSettingsPopup,
	SelectionInfo,
	SettingsPopup,
	SortInfo,
	SpinnerBehavior,
	StyleDefaults,
	TextInput,
	Timer,
	ToolbarAction,
	TooltipBehavior,
	TriStateCheckBox,
	TxtExporter,
	TypedObject,
	UIComponent,
	UIUtils,
	UserSettingsController,
	UserSettingsOptions,
	XmlExporter,
	MaterialFlexDataGridCheckBoxColumn,
	MaterialCheckBoxColumn,
	PrintExportOptions
} from 'flexicious-react-datagrid'

/**
 * A utility function that resolves expressions like x.y.z (for complex object dataField Support)
 * Also used to apply values. For example, if dataField=x.y.z, we can apply x.y.z=valueToApply.
 *
 * @param host
 * @param expression
 * @param valueToApply
 * @param returnUndefinedIfPropertyNotFound
 * @param applyNullValues
 * @param valueApplier
 * @return {*}
 */
UIUtils.resolveExpression = (
	host,
	expression,
	valueToApply,
	returnUndefinedIfPropertyNotFound,
	applyNullValues,
	valueApplier
) => {
	if (typeof valueToApply == 'undefined') valueToApply = null
	if (typeof returnUndefinedIfPropertyNotFound == 'undefined')
		returnUndefinedIfPropertyNotFound = false
	if (typeof applyNullValues == 'undefined') applyNullValues = false

	if (null == expression || expression === '') {
		return host
	}
	if (!UIUtils.expressionCache[expression]) {
		UIUtils.expressionCache[expression] = {}
		UIUtils.expressionCache[expression].isSimple =
			!expression.includes('.') && !expression.includes('[')
	}

	if (UIUtils.expressionCache[expression].isSimple) {
		if (valueToApply != null || applyNullValues) {
			if (valueApplier)
				valueApplier.checkSetterAndApply(host, expression, valueToApply)
			else host[expression] = valueToApply
		}
		const result = UIUtils.checkGetterAndRetrieve(host, expression)
		return typeof result !== 'undefined' && result !== null
			? result
			: returnUndefinedIfPropertyNotFound
			? undefined
			: null
	}

	const fields = expression.split('.')
	let endpointData = host
	var i = 0

	for (i = 0; i < fields.length; i++) {
		const field = fields[i]

		if (field.includes('[')) {
			const indexString = field.substring(
				field.indexOf('[') + 1,
				field.indexOf(']')
			)
			endpointData = endpointData[field.substring(0, field.indexOf('['))]

			if (parseInt(indexString) <= endpointData.length - 1) {
				endpointData = endpointData[parseInt(indexString)]
			} else {
				return ''
			}
		} else if (endpointData != null && i <= fields.length) {
			if (endpointData.hasOwnProperty(field) || endpointData[field]) {
				if (valueToApply && i === fields.length - 1)
					endpointData[field] = valueToApply
				endpointData = endpointData[field]
			} else {
				return returnUndefinedIfPropertyNotFound ? undefined : null
			}
		}
	}

	return endpointData
}

export {
	AdvancedFilter,
	BaseEvent,
	CellInfo,
	CellUtils,
	ChangeInfo,
	ClassFactory,
	ComboBox,
	ComponentAdditionResult,
	ComponentInfo,
	Constants,
	CsvExporter,
	CurrencyFormatter,
	DateComboBox,
	DateFormatter,
	DatePicker,
	DateRange,
	DateRangePicker,
	DateUtils,
	DisplayList,
	DocExporter,
	ElasticContainer,
	EventDispatcher,
	ExcelExporter,
	ExpandCollapseIcon,
	ExportController,
	ExportEvent,
	ExportOptions,
	ExportOptionsView,
	Exporter,
	ExtendedExportController,
	ExtendedFilterPageSortChangeEvent,
	FactoryKey,
	Filter,
	FilterContainerImpl,
	FilterExpression,
	FilterPageSortChangeEvent,
	FilterSort,
	FlexDataGrid,
	FlexDataGridBodyContainer,
	FlexDataGridCell,
	FlexDataGridCheckBoxColumn,
	FlexDataGridColumn,
	FlexDataGridColumnGroup,
	FlexDataGridColumnGroupCell,
	FlexDataGridColumnLevel,
	FlexDataGridContainerBase,
	FlexDataGridDataCell,
	FlexDataGridEvent,
	FlexDataGridExpandCollapseCell,
	FlexDataGridExpandCollapseHeaderCell,
	FlexDataGridFilterCell,
	FlexDataGridFooterCell,
	FlexDataGridHeaderCell,
	FlexDataGridHeaderContainer,
	FlexDataGridHeaderSeperator,
	FlexDataGridItemEditEvent,
	FlexDataGridLevelRendererCell,
	FlexDataGridPaddingCell,
	FlexDataGridPagerCell,
	FlexDataGridVirtualBodyContainer,
	GridPreferencesInfo,
	HtmlExporter,
	InsertionLocationInfo,
	ItemLoadInfo,
	ItemPositionInfo,
	KeyValuePairCollection,
	Label,
	LevelSelectionInfo,
	LockedContent,
	MultiSelectComboBox,
	MultiSelectComboBoxEx,
	MultiSelectTextInput,
	NdgBase,
	NumberFormatter,
	NumericRangeBox,
	OpenSettingsPopup,
	PageSize,
	PagerControl,
	Point,
	PreferenceInfo,
	PreferencePersistenceEvent,
	PrintExportDataRequestEvent,
	PrintExportFilter,
	PrintOptions,
	ReactDataGrid,
	ReactDataGridCellContainer,
	ReactDataGridColumn,
	ReactDataGridColumnGroup,
	ReactDataGridColumnLevel,
	ReactDataGridPsuedoScroll,
	ReactDataGridPsuedoScrollBodyContainer,
	Rectangle,
	RendererCache,
	RowInfo,
	RowPositionInfo,
	SaveSettingsPopup,
	SelectionInfo,
	SettingsPopup,
	SortInfo,
	SpinnerBehavior,
	StyleDefaults,
	TextInput,
	Timer,
	ToolbarAction,
	TooltipBehavior,
	TriStateCheckBox,
	TxtExporter,
	TypedObject,
	UIComponent,
	UIUtils,
	UserSettingsController,
	UserSettingsOptions,
	XmlExporter,
	MaterialFlexDataGridCheckBoxColumn,
	MaterialCheckBoxColumn,
	PrintExportOptions
}

Constants.GLOBAL_ROW_HEIGHT = 38 //so we can globally control a lot of different places.
delete Array.prototype['removeAll'] //TODO - remove this once upgrade to latest version of flexicious library
