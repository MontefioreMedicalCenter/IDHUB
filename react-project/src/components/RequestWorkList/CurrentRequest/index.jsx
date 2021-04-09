import React, { useEffect, useRef, useState } from 'react'

import '../requestWork.style.scss'
import DataGrid from '../../../shared/components/ExtendedDataGrid'
import {
	ReactDataGridColumn,
	ReactDataGridColumnGroup,
	ReactDataGridColumnLevel,
	ClassFactory
} from '../../../flexicious'
import { Paper, withStyles } from '@material-ui/core'
import WorklistService from '../../../service/cfc/WorklistService'
import IdWorklistGroup from '../../../vo/worklist/IdWorklistGroup'
import ArrayCollection from '../../../vo/ArrayCollection'
import { camelizeKeys } from '../../../shared/utils'
import BulkFileUpload from '../../../shared/components/BulkFileUpload'
import MontefioreUtils from '../../../service/utils/MontefioreUtils'
import SsnItemRender from '../../../container/views/itemRenderers/SsnItemRender'
import AdvanceDialog from '../../../shared/components/AdvanceDialog'
import RequestDocument from '../RequestDocument'
import UploadOrViewFile from '../../../container/views/itemRenderers/UploadOrViewFile'
import WorklistStatusRenderer from '../../../container/views/itemRenderers/WorklistStatusRenderer'
import Save from '../../../container/views/itemRenderers/Save'
import Edit from '../../../container/views/itemRenderers/Edit'
import Remove from '../../../container/views/itemRenderers/Remove'
import Submit from '../../../container/views/itemRenderers/Submit'
import Gender from '../../../container/views/itemRenderers/Gender'
import DocumentLibrary from '../DocumentLibrary'
import IdWorklist from '../../../vo/worklist/IdWorklist'
import Title from '../../../container/views/itemRenderers/Title'
import CampusCode from '../../../container/views/itemRenderers/CampusCode'
import Department from '../../../container/views/itemRenderers/Department'
import EmployeeSubGroup from '../../../container/views/itemRenderers/EmployeeSubGroup'
import CreateDateRenderer from '../../../container/views/itemRenderers/CreateDateRenderer'
import StartDateRenderer from '../../../container/views/itemRenderers/StartDateRenderer'
import EndDateRenderer from '../../../container/views/itemRenderers/EndDateRenderer'
import DateOfBirthRenderer from '../../../container/views/itemRenderers/DateOfBirthRenderer'
import ExampleUtils from '../../../utils/ExampleUtils'
import StorageService from '../../../service/cfc/StorageService'
import {
	showDelete,
	showUpload
} from '../../../AppConfig/store/actions/documentLibrary'
import { setDocumentLibrary } from '../../../AppConfig/store/actions/workListSheet'
import { useDispatch } from 'react-redux'
import StorageServiceEvent from '../../../events/StorageServiceEvent'
import { showMessage } from '../../../AppConfig/store/actions/homeAction'
import CheckBoxItemRenderer from '../../../container/views/itemRenderers/CheckBoxItemRenderer'

const ssnItemRenderer = new ClassFactory(SsnItemRender)
const uploadOrViewFile = new ClassFactory(UploadOrViewFile)
const save = new ClassFactory(Save)
const edit = new ClassFactory(Edit)
const remove = new ClassFactory(Remove)
const submit = new ClassFactory(Submit)
const worklistStatusRenderer = new ClassFactory(WorklistStatusRenderer)
const genderEditorWrapper = new ClassFactory(Gender.editorWrapper)
const titleEditorWrapper = new ClassFactory(Title.editorWrapper)
const campusCodeEditorWrapper = new ClassFactory(CampusCode.editorWrapper)
const departmenteEditorWrapper = new ClassFactory(Department.editorWrapper)
const employeeSubGroup = new ClassFactory(EmployeeSubGroup)
const createDateRendererEditorWrapper = new ClassFactory(
	CreateDateRenderer.editorWrapper
)
const startDateRendererEditorWrapper = new ClassFactory(
	StartDateRenderer.editorWrapper
)
const endDateRendererEditorWrapper = new ClassFactory(
	EndDateRenderer.editorWrapper
)
const dateOfBirthRendererEditorWrapper = new ClassFactory(
	DateOfBirthRenderer.editorWrapper
)
const checkBoxItemRenderer = new ClassFactory(CheckBoxItemRenderer)
const styles = theme => ({
	gridHeader: {
		color: `${theme.palette.primary.contrastText}`,
		background: `${theme.palette.primary.main}`,
		fontWeight: 'lighter !important'
	}
})

const CurrentRequest = props => {
	const dispatch = useDispatch()

	const dataGridRef = useRef(null)
	const [gridData, setGridData] = useState([])
	const [worklist, setWorklist] = useState(null)
	const [openModal, setOpenModal] = useState(false)
	const [openDocumentLibrary, setDocumentLibraryModal] = useState(false)
	const [valueOfTab] = useState(props.tabValue)

	const worklistResultHandler = resp => {
		var workListGroupArr = new ArrayCollection()
		var workListArr = new ArrayCollection()
		resp.result.forEach(data => {
			let workGroup = new IdWorklistGroup()
			workGroup.fromJson(camelizeKeys(data))
			workGroup.workLists.forEach(wl => (wl.worklistGroup = workGroup))
			if (workGroup.workLists != null && workGroup.workLists.length === 1)
				workListArr.addAll(workGroup.workLists)
			else workListGroupArr.addItem(workGroup)
		})
		workListGroupArr.addAll(workListArr)
		setGridData(workListGroupArr)
	}
	//this is how Facebook recommends we run code on mount. Stupid ESlint does not like it.
	/* eslint-disable*/
	useEffect(() => {
		findWorklist()
	}, [])
	/* eslint-disable*/

	const findWorklist = () => {
		WorklistService.getInstance().findWorklistGroups(
			worklistResultHandler,
			MontefioreUtils.showError
		)
	}

	const placeExpandCollapseIcon = img => {
		img.move(0, 0)
	}

	const getDocumentLibrary = () => {
		StorageService.getInstance().listDocumentLibraryFiles(
			docLibrarySuccessResult,
			MontefioreUtils.showError
		)
		onOpenDocument()
	}

	const docLibrarySuccessResult = ({ result }) => {
		dispatch(showDelete(false))
		dispatch(showUpload(false))

		const StorageService = new StorageServiceEvent()
		StorageService.data = camelizeKeys(result)

		dispatch(setDocumentLibrary(StorageService.data))
	}

	const isCellEditable = cell => {
		const rowData = cell.rowInfo.getData()
		var selectedRequest = rowData instanceof IdWorklist ? rowData : null
		const column = cell.getColumn()
		if (rowData.worklistStatus === 'Processed')
			return rowData.edit && column.dataField === 'endDate'
		else if (cell.level.getNestDepth() !== 1 || selectedRequest !== null)
			return (
				rowData.edit &&
				(column.dataField === 'firstName' ||
					column.dataField === 'middleNameOrInitial' ||
					column.dataField === 'lastName' ||
					column.dataField === 'ssn' ||
					column.dataField === 'dateOfBirth' ||
					column.dataField === 'gender' ||
					column.dataField === 'nonMonteEmail' ||
					column.dataField === 'employeeSubGroup' ||
					column.dataField === 'companyCode' ||
					column.dataField === 'campusCode' ||
					column.dataField === 'title' ||
					column.dataField === 'department' ||
					column.dataField === 'startDate' ||
					column.dataField === 'endDate' ||
					column.dataField === 'managerSourceUniqueId' ||
					column.dataField === 'mmcEmailRequest' ||
					column.dataField === 'affiliateEmailRequest' ||
					column.dataField === 'homeDriveRequest' ||
					column.dataField === 'epicRequest' ||
					column.dataField === 'epfRequest' ||
					column.dataField === 'epcsHardTokenRequest' ||
					column.dataField === 'additionalComments' ||
					column.dataField === 'officePhone' ||
					column.dataField === 'managerPhone' ||
					column.dataField === 'managerEmail' ||
					column.dataField === 'managerPh' ||
					column.dataField === 'managerExt' ||
					column.dataField === 'noSSN')
			)
		else if (cell.level.getNestDepth() === 1)
			return rowData.edit && column.dataField === 'additionalComments'
		else return false
	}

	const onOpenDocument = () => {
		setDocumentLibraryModal(!openDocumentLibrary)
	}

	const getCellBackgroundColor = cell => {
		if (cell._column.dataField === 'worklistStatus') {
			const txtstatus = cell.rowInfo.getData().worklistStatus
			if (txtstatus === 'Initial') {
				return 0xb3d9ff
			} else if (txtstatus === 'Rejected') {
				return 0xff8080
			} else if (txtstatus === 'Ready') {
				return 0x00cc99
			} else if (txtstatus === 'OnHold') {
				return 0xffd9b3
			} else if (txtstatus === 'Processed') {
				return 0xffffff
			} else if (txtstatus === 'Submitted') {
				return 0xe6e6fa
			}
		} else {
			return 0xffffff
		}
		return 0xffffff
	}


	var index = -1;
	var isWorklist = false
	const iconClick = props => {
		const selectedItem = props.row.getData()
		let selectedGroup = {}
		let selectedRequest = {}
		const isWorklistGroup = selectedItem.constructor.name === 'IdWorklistGroup'
		if (isWorklistGroup) {
			selectedGroup = selectedItem
		} else {
			selectedRequest = selectedItem
		}
		const level = props.cell.getNestDepth()
		let isnotsave = false
		isWorklist = Object.keys(selectedRequest).length !== 0 && level === 1

		const selectedobj = isWorklistGroup ? selectedGroup : selectedRequest

		const isWorklistChild =
			Object.keys(selectedRequest).length !== 0 && level === 2
		if (isWorklist || isWorklistChild) {
			selectedGroup = selectedItem.worklistGroup
		}
		var deleteid = ''

		var gridDP=props.grid.getDataProvider() 

		index=gridDP.getItemIndex(selectedItem)
		if (index == -1)
			index=gridDP.getItemIndex(selectedGroup)

		if (props.cell.getColumn() !== null) {
			if (props.cell.getColumn().getHeaderText() === 'Upload or View Docs') {
			} else if (props.cell.getColumn().getHeaderText() === 'Submit') {
			} else if (props.cell.getColumn().getHeaderText() === 'Save') {
				if (isWorklistGroup) {
					selectedGroup.edit = false
					// wlservice.saveWorkGroup(selectedGroup)
				} else if (isWorklist || isWorklistChild) {
					selectedRequest.edit = false
					/*	if (workList.worklistStatus == 'Processed')
                        {
                            workList.worklistStatus="Accepted"
                        }*/
					// wlservice.saveWorkListSingle(selectedRequest)
				}
			} else if (props.cell.getColumn().getHeaderText() === 'Edit') {
				if (selectedobj.edit) {
					const vpos = props.grid.getVerticalScrollPosition()
					dispatch(
						showMessage(
							'Confirm Edit',
							'Are you sure you want to cancel changes',
							'Confirm_Cancel',
							() => {
								selectedobj.edit = false
								if (valueOfTab === 0) {
									findWorklist()
									props.cell.refreshCell()
									props.grid.gotoVerticalPosition(vpos)
								} else {
									//return empty
								}
							},
							() => {}
						)
					)
				} else {
					if (isWorklistGroup) {
						if (!selectedGroup.edit) {
							selectedGroup.edit = true
							// props.grid.cellEditableFunction = isCellEditable
							props.cell.refreshCell()
						} else {
							selectedGroup.edit = false
							props.cell.refreshCell()
						}
					} else if (isWorklistChild) {
						if (!selectedRequest.edit) {
							selectedRequest.edit = true
							// props.cellEditableFunction = isCellEditable
							props.cell.refreshCell()
						} else {
							selectedRequest.edit = false
							props.cell.refreshCell()
						}
					} else if (isWorklist) {
						if (!selectedRequest.edit) {
							selectedRequest.edit = true
							// props.cellEditableFunction = isCellEditable
							props.cell.refreshCell()
						} else {
							selectedRequest.edit = false
							props.cell.refreshCell()
						}
					}
				}
			} else if (props.cell.getColumn().getHeaderText() === 'Delete') {
				if (
					selectedGroup.worklistId != null ||
					selectedRequest.worklistId != null
				) {
					deleteid = isWorklistGroup
						? selectedGroup.worklistId
						: selectedRequest.worklistId +
						  '.' +
						  selectedRequest.id.worklistSeqNum
				} else {
					isnotsave = true
				}

				dispatch(
					showMessage(
						'Confirm Delete',
						'Are you sure you want to delete request ' + deleteid,
						'Confirm_Cancel',
						() => {
							if (isnotsave) {
								// gridDP.removeItemAt(index);
							} else if (
								isWorklistChild &&
								selectedGroup.workLists.length > 1
							) {
								const data = JSON.stringify(selectedRequest, function(
									key,
									value
								) {
									if (key == '_worklistGroup') {
										return value.worklistId
									} else {
										return value
									}
								})
								WorklistService.getInstance().deleteWorkListSingle(
									data,
									updateWorkList,
									MontefioreUtils.showError
								)
								console.log('deleteWorkListSingle')
							} else {
								// wlservice.deleteWorkListGroup(selectedGroup)
								console.log('deleteWorkListGroup')
							}
						},
						() => {}
					)
				)
			} else if (props.cell.getColumn().getHeaderText() === 'Add') {
			}
		}
	}

	const updateWorkList = resp => {
		var vpos = dataGridRef.current.verticalScrollPosition
		var gridDP = dataGridRef.current.getDataProvider()
		gridDP.removeItemAt(index)

		// let workGroup = new IdWorklistGroup()
		// workGroup.fromJson(camelizeKeys(resp.result))
		// if (isWorklist) gridDP.addItemAt(workGroup.workLists.getItemAt(0), index)
		// else gridDP.addItemAt(workGroup, index)
		// dataGridRef.current.expandAll()
		// dataGridRef.current.validateNow()
		// dataGridRef.current.gotoVerticalPosition(vpos)
	}

	return (
		<div className="grid-container">
			<Paper style={{ height: '100%', width: '100%', marginTop: '10px' }}>
				<div className="header-field">
					<BulkFileUpload />
				</div>
				<div style={{ height: 'calc(100% - 40px)' }}>
					<DataGrid
						ref={dataGridRef}
						textAlign={'center'}
						height={'100%'}
						width={'100%'}
						id="Requestor_WorkList_Grid"
						alternatingItemColors={[0xffffff, 0xffffff]}
						dataProvider={gridData}
						enablePrint
						enablePreferencePersistence
						enableDrag
						showSpinnerOnFilterPageSort
						enableEagerDraw
						enableDrop
						enableExport
						enableCopy
						preferencePersistenceKey={'simpleGrid'}
						enableMultiColumnSort
						useCompactPreferences
						horizontalScrollPolicy={'auto'}
						footerDrawTopBorder
						enablePdf
						// cellBackgroundColorFunction="getColor"
						//  alternatingItemColors="[0xffffff,0xffffff]"
						enableToolbarActions
						styleName="gridStyle"
						// toolbarActionExecutedFunction={onExecuteToolbarAction}
						editable
						enableDrillDown
						filterVisible={false}
						headerWordWrap
						headerHeight={60}
						enableDefaultDisclosureIcon={false}
						headerSortSeparatorRight={3}
						selectionMode="none"
						cellEditableFunction={isCellEditable}
						documentOpenFunction={getDocumentLibrary}>
						<ReactDataGridColumnLevel
							rowHeight={10}
							enablePaging={true}
							horizontalGridLines={true}
							pageSize={10000}
							childrenField="_workLists"
							alternatingItemColors={[0xe1eef7, 0xe1eef7]}
							enableFilters={true}
							horizontalGridLineColor={0x99bbe8}
							horizontalGridLineThickness={1}>
							<ReactDataGridColumnGroup headerText="ID">
								<ReactDataGridColumn
									dataField="worklistId"
									headerText="Worklist #"
									width={150}
									columnLockMode={'left'}
									enableCellClickRowSelect={false}
									editable={false}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									enableExpandCollapseIcon
									enableHierarchicalNestIndent
									expandCollapseIconPlacementFunction={placeExpandCollapseIcon}
									// filterWaterMark={"Contains"}
								/>
								<ReactDataGridColumn
									dataField="id.worklistSeqNum"
									headerText="Seq"
									width={50}
									columnLockMode={'left'}
									editable={false}
									enableCellClickRowSelect={false}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
								/>
							</ReactDataGridColumnGroup>
							<ReactDataGridColumn
								headerText="Status"
								dataField="worklistStatus"
								width={80}
								columnLockMode={'left'}
								enableCellClickRowSelect={false}
								editable={false}
								filterComboBoxBuildFromGrid={true}
								filterControl="MultiSelectComboBox"
								paddingRight="20"
								itemRenderer={worklistStatusRenderer}
								cellBackgroundColorFunction={getCellBackgroundColor}
							/>
							<ReactDataGridColumnGroup
								headerText="Personal"
								dataField="requester-user-id">
								<ReactDataGridColumn
									dataField="lastName"
									headerText="Last name"
									width={100}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									headerWordWrap={true}
									enableRecursiveSearch={true}
									//  itemEditorValidatorFunction="validateLname"
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
								/>
								<ReactDataGridColumn
									dataField="firstName"
									headerText="First Name"
									width={100}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									headerWordWrap={true}
									enableRecursiveSearch={true}
									//  temEditorValidatorFunction="validateFname"
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
								/>
								<ReactDataGridColumn
									dataField="middleNameOrInitial"
									headerText="Init"
									width={100}
									headerWordWrap={true}
									//  itemEditorValidatorFunction="validateInitial"
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
								/>
								<ReactDataGridColumn
									dataField="noSSN"
									headerText="No SSN"
									valueOfTab={valueOfTab}
									width={100}
									headerWordWrap={true}
									editable={false}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
									itemRenderer={checkBoxItemRenderer}
								/>
								<ReactDataGridColumn
									width={90}
									dataField="ssn"
									headerText="SSN"
									editable={false}
									headerWordWrap={true}
									//  itemEditorValidatorFunction="validateSSN"
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
									itemRenderer={ssnItemRenderer}
								/>
								<ReactDataGridColumn
									dataField="dateOfBirth"
									headerText="DOB"
									width={150}
									editorDataField="selectedDate"
									filterControl="DateComboBox"
									enableRecursiveSearch={true}
									formatter={ExampleUtils.dateFormatter3}
									//  itemEditorValidatorFunction="validateDOB"
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									//  filterDateRangeOptions="{[DateRange.DATE_RANGE_CUSTOM]}"
									sortable={false}
									itemEditor={dateOfBirthRendererEditorWrapper}
								/>
								<ReactDataGridColumn
									dataField="gender"
									headerText="Gender"
									width={100}
									headerWordWrap={true}
									filterControl="MultiSelectComboBox"
									//  filterComboBoxDataProvider="{combogenderDP}"
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemEditor={genderEditorWrapper}
								/>
								<ReactDataGridColumn
									dataField="nonMonteEmail"
									headerText="Personal or Business Email"
									width={120}
									headerWordWrap={true}
									//  itemEditorValidatorFunction="validatePersonEmail"
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
								/>
							</ReactDataGridColumnGroup>
							<ReactDataGridColumnGroup
								headerText="Official Details"
								dataField="requester-user-id">
								<ReactDataGridColumn
									dataField="employeeSubGroup"
									headerText="User Type"
									width={140}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									enableRecursiveSearch={true}
									headerWordWrap={true}
									editable={false}
									itemEditorApplyOnValueCommit={false}
									enableCellClickRowSelect={false}
									itemEditorManagesPersistence={true}
									itemRenderer={employeeSubGroup}
								/>
								<ReactDataGridColumn
									dataField="companyCode"
									headerText="Vendor Consultant Company"
									width={150}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									enableRecursiveSearch={true}
									headerWordWrap="True"
									//  itemEditorValidatorFunction="validateCompanyCode"
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
								/>
								<ReactDataGridColumn
									dataField="campusCode"
									headerText="Location"
									width={100}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									enableRecursiveSearch={true}
									headerWordWrap={true}
									itemEditorApplyOnValueCommit={false}
									enableCellClickRowSelect={false}
									itemEditorManagesPersistence={true}
									itemEditor={campusCodeEditorWrapper}
								/>
								<ReactDataGridColumn
									dataField="title"
									headerText="Title"
									width={100}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									enableRecursiveSearch={true}
									headerWordWrap={true}
									itemEditorApplyOnValueCommit={false}
									enableCellClickRowSelect={false}
									itemEditorManagesPersistence={true}
									itemEditor={titleEditorWrapper}
								/>
								<ReactDataGridColumn
									dataField="department"
									headerText="Department"
									width={100}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									enableRecursiveSearch={true}
									headerWordWrap={true}
									itemEditorApplyOnValueCommit={false}
									enableCellClickRowSelect={false}
									itemEditorManagesPersistence={true}
									itemEditor={departmenteEditorWrapper}
								/>
								<ReactDataGridColumn
									dataField="startDate"
									headerText="Start date"
									width={150}
									editorDataField="selectedDate"
									filterControl="DateComboBox"
									enableRecursiveSearch={true}
									headerWordWrap={false}
									formatter={ExampleUtils.dateFormatter3}
									//  itemEditorValidatorFunction="validateStartDate"
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemEditor={startDateRendererEditorWrapper}
								/>
								<ReactDataGridColumn
									dataField="endDate"
									headerText="End Date"
									width={150}
									editorDataField="selectedDate"
									filterControl="DateComboBox"
									enableRecursiveSearch={true}
									headerWordWrap={false}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									formatter={ExampleUtils.dateFormatter2}
									// labelFunction={MontefioreUtils.dateFormatter2}
									itemEditor={endDateRendererEditorWrapper}
								/>
								<ReactDataGridColumn
									dataField="managerSourceUniqueId"
									headerText="MHS Manager ID"
									width={100}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									enableRecursiveSearch={true}
									headerWordWrap={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									//  itemEditorValidatorFunction="validatesmanagersource"
									sortable={false}
								/>
								<ReactDataGridColumn
									dataField="managerPh"
									headerText="MHS Manager Phone"
									width={100}
									headerWordWrap={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									//  itemEditorValidatorFunction="validatePhone"
									sortable={false}
								/>
								<ReactDataGridColumn
									dataField="managerExt"
									headerText="MHS Manager Ext"
									width={100}
								/>
								<ReactDataGridColumn
									dataField="managerEmail"
									headerText="MHS Manager Email"
									width={100}
									headerWordWrap={true}
									//  itemEditorValidatorFunction="validatePersonEmail"
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
								/>
								<ReactDataGridColumn
									dataField="epicRequest"
									headerText="EPIC"
									width={100}
									headerWordWrap={true}
									filterControl="MultiSelectComboBox"
									valueOfTab={valueOfTab}
									//  filterComboBoxDataProvider="{comboDP}"
									editable={false}
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemRenderer={checkBoxItemRenderer}
								/>
								<ReactDataGridColumn
									dataField="epfRequest"
									headerText="EPF"
									width={100}
									headerWordWrap={true}
									valueOfTab={valueOfTab}
									filterControl="MultiSelectComboBox"
									//  filterComboBoxDataProvider="{comboDP}"
									editable={false}
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemRenderer={checkBoxItemRenderer}
								/>
								<ReactDataGridColumn
									dataField="epcsHardTokenRequest"
									headerText="EPCS Hard Token"
									width={100}
									headerWordWrap={true}
									filterControl="MultiSelectComboBox"
									valueOfTab={valueOfTab}
									//  filterComboBoxDataProvider="{comboDP}"
									editable={false}
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemRenderer={checkBoxItemRenderer}
								/>
								<ReactDataGridColumn
									dataField="mmcEmailRequest"
									headerText="MMC Email"
									width={100}
									headerWordWrap={true}
									filterControl="MultiSelectComboBox"
									valueOfTab={valueOfTab}
									//  filterComboBoxDataProvider="{comboDP}"
									editable={false}
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemRenderer={checkBoxItemRenderer}
								/>
								<ReactDataGridColumn
									dataField="additionalComments"
									headerText="Requestors Comment"
									width={100}
									filterControl="TextInput"
									filterWaterMark="Contains"
									filterOperation="Contains"
									headerWordWrap={true}
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
									//  itemEditorValidatorFunction="validateAdditionalComment"
								/>
								<ReactDataGridColumn
									dataField="requestorFullName"
									headerText="Requestor"
									width={100}
									columnWidthMode="fixed"
									enableCellClickRowSelect={false}
									filterControl="MultiSelectComboBox"
									filterComboBoxBuildFromGrid={true}
									useHandCursor={true}
									editable={false}
									sortable={false}
								/>
								<ReactDataGridColumn
									dataField="reviewerComments"
									headerText="Reject Reason"
									width={100}
									filterControl="TextInput"
									filterWaterMark="Contains"
									filterOperation="Contains"
									enableRecursiveSearch={true}
									headerWordWrap={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
								/>
								<ReactDataGridColumn
									dataField="createDate"
									headerText="Create Date"
									width={150}
									filterControl="DateComboBox"
									enableRecursiveSearch={true}
									headerWordWrap={false}
									// editable={false}
									formatter={ExampleUtils.dateFormatter3}
									enableCellClickRowSelect={false}
									sortable={false}
									//  filterDateRangeOptions="{[DateRange.DATE_RANGE_CUSTOM]}"
									itemEditor={createDateRendererEditorWrapper}
								/>
							</ReactDataGridColumnGroup>
							<ReactDataGridColumn
								dataField="uploadDocs"
								headerText="Upload or view Docs"
								width={60}
								columnLockMode={'right'}
								itemRenderer={uploadOrViewFile}
								editable={false}
								hideText={true}
								headerWordWrap={true}
								onDocumentClick={e => {
									setWorklist(e.row.getData())
									onOpenDocument()
								}}
								iconToolTip="View/Upload Request Document"
								iconHandCursor={true}
								columnWidthMode="fixed"
								iconLeft="25"
								sortable={false}
							/>
							<ReactDataGridColumn
								dataField="Save"
								headerText="Save"
								width={60}
								columnLockMode={'right'}
								itemRenderer={save}
								editable={false}
								hideText={true}
								//  enableIcon={true}
								//  iconFunction="dynamicIconFunctionSave"
								iconToolTip="Save Request"
								iconHandCursor={true}
								columnWidthMode="fixed"
								iconLeft="20"
								sortable={false}
								onHandleSave={iconClick}
							/>
							<ReactDataGridColumn
								dataField="Edit"
								headerText="Edit"
								width={60}
								columnLockMode={'right'}
								itemRenderer={edit}
								editable={false}
								hideText={true}
								//  enableIcon={true}
								//  iconFunction="dynamicIconFunctionEdit"
								iconToolTip="Edit Request"
								iconHandCursor={true}
								columnWidthMode="fixed"
								iconLeft="20"
								sortable={false}
								onHandleEdit={iconClick}
							/>
							<ReactDataGridColumn
								dataField="Delete"
								headerText="Delete"
								width={60}
								columnLockMode={'right'}
								itemRenderer={remove}
								editable={false}
								hideText={true}
								//  enableIcon="{this.searchTb.viewStack.selectedIndex==0}"
								//  iconFunction="dynamicIconFunctionDelete"
								iconToolTip="Delete Request"
								iconHandCursor={true}
								columnWidthMode="fixed"
								iconLeft="20"
								sortable={false}
								onHandleDelete={iconClick}
							/>
							<ReactDataGridColumn
								dataField="Submit"
								headerText="Submit"
								width={60}
								columnLockMode={'right'}
								itemRenderer={submit}
								editable={false}
								hideText={true}
								headerWordWrap={true}
								//  enableIcon={true}
								//  iconFunction="dynamicIconFunctionSubmit"
								iconToolTip="Submit/Accept Request"
								iconHandCursor={true}
								columnWidthMode="fixed"
								iconLeft="20"
								sortable={false}
							/>
							<ReactDataGridColumnLevel
								enableFooters
								selectedKeyField={'id'}
								parentField={'invoice'}
								horizontalGridLines={false}
								horizontalGridLineColor="0xffffff"
								horizontalGridLineThickness="0"
								rowHeight="23"
								reusePreviousLevelColumns={true}
								alternatingItemColors={[0xffffff, 0xffffff]}
								initialSortField="id.worklistSeqNum"
							/>
						</ReactDataGridColumnLevel>
					</DataGrid>
				</div>
			</Paper>
			<AdvanceDialog
				open={openModal}
				handleClose={() => setOpenModal(false)}
				headerTitle="Request Documents"
				bodyRenderer={<RequestDocument />}
			/>
			<AdvanceDialog
				open={openDocumentLibrary}
				handleClose={onOpenDocument}
				headerTitle="Document Library"
				bodyRenderer={<DocumentLibrary worklist={worklist} />}
			/>
		</div>
	)
}

export default withStyles(styles, { withTheme: true })(CurrentRequest)
