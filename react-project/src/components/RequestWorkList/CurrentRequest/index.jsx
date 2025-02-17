import React, { useEffect, useRef, useState } from 'react'

import '../requestWork.style.scss'
import DataGrid from '../../../shared/components/ExtendedDataGrid'
import {
	ReactDataGridColumn,
	ReactDataGridColumnGroup,
	ReactDataGridColumnLevel,
	ClassFactory,
	DateRange
} from '../../../flexicious'
import { Paper, withStyles } from '@material-ui/core'
import WorklistService from '../../../service/cfc/WorklistService'
import IdWorklistGroup from '../../../vo/worklist/IdWorklistGroup'
import IdWorklist from '../../../vo/worklist/IdWorklist'
import ArrayCollection from '../../../vo/ArrayCollection'
import MontefioreUtils from '../../../service/utils/MontefioreUtils'
import SsnItemRender from '../../../container/views/itemRenderers/SsnItemRender'
import AdvanceDialog from '../../../shared/components/AdvanceDialog'
import DocumentViewer from '../DocumentViewer'
import UploadOrViewFile from '../../../container/views/itemRenderers/UploadOrViewFile'
import WorklistStatusRenderer from '../../../container/views/itemRenderers/WorklistStatusRenderer'
import Save from '../../../container/views/itemRenderers/Save'
import Edit from '../../../container/views/itemRenderers/Edit'
import Remove from '../../../container/views/itemRenderers/Remove'
import Submit from '../../../container/views/itemRenderers/Submit'
import Gender from '../../../container/views/itemRenderers/Gender'
import DocumentLibrary from '../DocumentLibrary'
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
import RequestorSearch from '../RequestorSearch'
import moment from 'moment'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { isValid } from 'ssn-validator'
import CustomDateComboBox from '../../../shared/components/CustomDateComboBox'
import MontifioreTextinput from '../../../shared/components/ExtendedDataGrid/material/grid/MontifioreTextInput'
import { toast } from 'react-toastify'
// import { getRowHeight } from '../../../shared/utils'

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
const employeeSubGroupEditorWrapper = new ClassFactory(
	EmployeeSubGroup.editorWrapper
)
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
const textInputEditor = new ClassFactory(
	MontifioreTextinput
)
const checkBoxItemRenderer = new ClassFactory(CheckBoxItemRenderer)
const dateFilter = new ClassFactory(CustomDateComboBox)
const styles = theme => ({
	gridHeader: {
		color: `${theme.palette.primary.contrastText}`,
		background: `${theme.palette.primary.main}`,
		fontWeight: 'lighter !important'
	}
})

const CurrentRequest = ({ tabValue }) => {
	const dispatch = useDispatch()

	const dataGridRef = useRef(null)
	const [worklist, setWorklists] = useState(null)
	const [documentlibraryTitle, setDocumentlibraryTitle] = useState(
		'Document Library'
	)
	const [openModal, setOpenModal] = useState(false)
	const [openDocumentLibrary, setDocumentLibraryModal] = useState(false)
	const [documentFileUrl, setDocumentFileUrl] = useState('')
	var numb_regex = /[0-9]/
	var numb_errregex = /[.+-]/
	var initialLoad = true;




	const comboDP = [
		{ label: 'N', data: 'N' },
		{ label: 'Y', data: 'Y' }
	]
	const combogenderDP = [
		{ label: 'M', data: 'M' },
		{ label: 'F', data: 'F' }
	]

	const worklistResultHandler = resp => {
		setWorkList({ workList: resp.result })
	}
	const worklistResultHandlerThroughSearch = resp => {
		if(dataGridRef.current && dataGridRef.current.showAddEmployee) {
			setWorkList({ workList: resp.result })
		}
	}
	//this is how Facebook recommends we run code on mount. Stupid ESlint does not like it.
	/* eslint-disable*/
	useEffect(() => {
		findWorklist();
		CurrentRequest.pageStore = {};
		CurrentRequest.pageStore._workList = new ArrayCollection();
		CurrentRequest.pageStore._selectedGroup=null;
		CurrentRequest.pageStore._selectedRequest=null;
		CurrentRequest.pageStore.selectedItem=null
		CurrentRequest.pageStore.isWorklistGroup=false;;
		CurrentRequest.pageStore.isWorklist=false;
		CurrentRequest.pageStore.isWorklistChild=false;
		CurrentRequest.pageStore._index=-1;

	}, [])
	/* eslint-disable*/

	const findWorklist = () => {
		WorklistService.getInstance().findWorklistGroups(
			worklistResultHandler,
			MontefioreUtils.showError
		)
	}

	const findWorklistThroughSearch = () => {
		WorklistService.getInstance().findWorklistGroups(
			worklistResultHandlerThroughSearch,
			MontefioreUtils.showError
		)
	}

	const placeExpandCollapseIcon = img => {
		img.move(0, 0)
	}

	const onExecuteToolbarAction = action => {
		if (action.code == 'Add Employee') {
			var grid = dataGridRef.current

			var gridDP = grid.getDataProvider()
			var wkg = new IdWorklistGroup()
			var wk = new IdWorklist()
			wkg.workLists = new ArrayCollection()
			wkg.workLists.addItemAt(wk, 0)
			wkg.worklistStatus = 'OnHold'
			wk.worklistStatus = 'OnHold'
			wk.edit = true
			wk.worklistGroup = wkg
			console.log('Add Employee')
			if (grid.getCurrentSorts().length > 0) {
				grid.removeAllSorts()
				gridDP.addItemAt(wk, 0)
			} else {
				gridDP.addItemAt(wk, 0)
			}
			grid.cellEditableFunction = isCellEditable
			grid.refreshCells()
		} else if (action.code == 'Refresh') {
			findWorklist()
		} else if (action.code == 'SubmitAll') {
			toast.warning('Need to implement this')
			// var arrayvalidsubmit:ArrayCollection=new ArrayCollection();
			// 		var arrayvalidsubmitgroup:ArrayCollection=new ArrayCollection();
			// 		var arrayselectedobject:ArrayCollection=grid.selectedObjects
			// 		var readystatus:Boolean=true;
			// 		for each (var idworklist:Object in arrayselectedobject)
			// 		{
			// 			var isworkgroup:Boolean=idworklist as IdWorklistGroup ? true : false
			// 			if (isworkgroup)
			// 			{
			// 				if (idworklist.worklistStatus == "Ready")
			// 				{
			// 					idworklist.worklistStatus="Submitted"
			// 					arrayvalidsubmitgroup.addItem(idworklist)
			// 				}
			// 				else
			// 				{
			// 					readystatus=false
			// 				}
			// 				for each (var worklist:IdWorklist in idworklist.workLists)
			// 				{
			// 					if (worklist.worklistStatus == "Ready")
			// 					{
			// 						worklist.worklistStatus="Submitted"
			// 						arrayvalidsubmit.addItem(worklist)
			// 					}
			// 					else
			// 						readystatus=false
			// 				}
			// 			}
			// 			else if (idworklist.worklistStatus == "Ready")
			// 			{
			// 				idworklist.worklistStatus="Submitted"
			// 				arrayvalidsubmit.addItem(idworklist)
			// 			}
			// 			else
			// 			{
			// 				readystatus=false
			// 			}
			// 		}
			// 		if (arrayvalidsubmit.length > 0 || arrayvalidsubmitgroup.length > 0 || !readystatus)
			// 		{
			// 			Alert.show("Are you sure you want to Submit  " + grid.selectedObjects.length + " Requests", "Confirm SubmitAll", Alert.OK | Alert.CANCEL, this, function(event:CloseEvent):void
			// 			{
			// 				if (event.detail == Alert.OK)
			// 				{
			// 					//do the delete....you have the grid.selectedKey or grid.selectedObject here...
			// 					if (readystatus)
			// 					{
			// 						for each (var idworklist:IdWorklist in arrayvalidsubmit)
			// 						{
			// 							dispatchEvent(new WorkListEvent(WorkListEvent.SAVE_SINGLE, idworklist));
			// 						}
			// 						for each (var idworklistgroup:IdWorklistGroup in arrayvalidsubmitgroup)
			// 						{
			// 							dispatchEvent(new WorkListEvent(WorkListEvent.SAVE_GROUP, idworklistgroup));
			// 						}
			// 					}
			// 					else
			// 					{
			// 						Alert.show("Invalid Status")
			// 					}
			// 				}
			// 			})
			// 		}
		} else if (action.code == 'Document Library') {
			StorageService.getInstance().listDocumentLibraryFiles(
				docLibrarySuccessResult,
				MontefioreUtils.showError
			)
			dispatch(showDelete(false))
			dispatch(showUpload(false))
			setDocumentlibraryTitle('Document Library')
			onOpenDocument()
		}
	}

	const onShowDocument = fileData => {
		setDocumentFileUrl(fileData)
		setOpenModal(true)
	}

	const docLibrarySuccessResult = ({ result }) => {
		const StorageService = new StorageServiceEvent()
		var sortedResult = result.sort((a, b) => {
			var nameA = a.baseName.toUpperCase(); // ignore upper and lowercase
  			var nameB = b.baseName.toUpperCase(); // ignore upper and lowercase

			  if (nameA < nameB) {
				return -1;
			  }
			  if (nameA > nameB) {
				return 1;
			  }
			  // names must be equal
			  return 0;
		})
		StorageService.data = sortedResult

		dispatch(setDocumentLibrary(StorageService.data))
	}

	const isCellEditable = cell => {
		const rowData = cell.rowInfo.getData()
		var selectedRequest = rowData instanceof IdWorklist ? rowData : null
		const column = cell.getColumn()
		if (rowData.noSSN === "Y" && column.dataField === 'ssn'
			&& rowData.edit === true ) {
			return rowData.edit === false
		}
		if (rowData.worklistStatus === 'Processed'){
			return rowData.edit && column.dataField === 'endDate' 
		}
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

	const findSSNLabel = item => {
		if (item.ssn && item.ssn.length) return '****'
		else return ''
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

	var oldRequest = new IdWorklist()

	const iconClick = props => {
		CurrentRequest.pageStore._index = -1

		CurrentRequest.pageStore.selectedItem = props.row.getData()
		CurrentRequest.pageStore._selectedRequest = {}
		CurrentRequest.pageStore.isWorklistGroup = CurrentRequest.pageStore.selectedItem.constructorName === 'IdWorklistGroup'

		if (CurrentRequest.pageStore.isWorklistGroup) {
			CurrentRequest.pageStore._selectedGroup = CurrentRequest.pageStore.selectedItem
		} else {
			CurrentRequest.pageStore._selectedRequest = CurrentRequest.pageStore.selectedItem
		}
		const level = props.cell.getNestDepth()
		let isnotsave = false
		CurrentRequest.pageStore.isWorklist = Object.keys(CurrentRequest.pageStore._selectedRequest).length !== 0 && level === 1

		const selectedobj = CurrentRequest.pageStore.isWorklistGroup ? CurrentRequest.pageStore._selectedGroup : CurrentRequest.pageStore._selectedRequest

		CurrentRequest.pageStore.isWorklistChild =
			Object.keys(CurrentRequest.pageStore._selectedRequest).length !== 0 && level === 2
		if (CurrentRequest.pageStore.isWorklist || CurrentRequest.pageStore.isWorklistChild) {
			CurrentRequest.pageStore._selectedGroup = CurrentRequest.pageStore.selectedItem.worklistGroup
		}
		var deleteid = ''

		var gridDP = props.grid.getDataProvider()

		CurrentRequest.pageStore._index = gridDP.getItemIndex(CurrentRequest.pageStore.selectedItem)
		if (CurrentRequest.pageStore._index == -1) CurrentRequest.pageStore._index = gridDP.getItemIndex(CurrentRequest.pageStore._selectedGroup)

		if (props.cell.getColumn() !== null) {
			if (props.cell.getColumn().getHeaderText() === 'Upload or View Docs') {
				setDocumentlibraryTitle('Request Documents')
				dispatch(showDelete(true))
				dispatch(showUpload(true))
				setWorklists(CurrentRequest.pageStore._selectedGroup)
				onOpenDocument()
			} else if (props.cell.getColumn().getHeaderText() === 'Submit') {
				// var alertId = CurrentRequest.pageStore.isWorklistGroup ? CurrentRequest.pageStore._selectedGroup.worklistId : CurrentRequest.pageStore._selectedRequest.worklistId
				if (
					CurrentRequest.pageStore.selectedItem.worklistStatus == 'Ready' ||
					CurrentRequest.pageStore.selectedItem.worklistStatus == 'Rejected' ||
					CurrentRequest.pageStore.selectedItem.worklistStatus == 'Processed'
				) {
					//CurrentRequest.pageStore.selectedItem.worklistStatus
					dispatch(
						showMessage(
							'Confirm',
							'Are you sure you want to Submit ' + CurrentRequest.pageStore.selectedItem.worklistId,
							'YES_NO',
							() => {
								if (CurrentRequest.pageStore.isWorklistGroup) {
									CurrentRequest.pageStore._selectedGroup.edit = false
									var worklistGroup = CurrentRequest.pageStore._selectedGroup

									if (worklistGroup.worklistStatus === 'Processed') {
										//worklistGroup.worklistStatus = 'Accepted'
										worklistGroup.requesterUserId = localStorage.getItem(
											'user-id'
										)
										worklistGroup.workLists.forEach(x => {
											if(!x.worklistStatus == 'Processed')x.worklistStatus = 'Accepted'
										})
									} else {
										worklistGroup.worklistStatus = 'Submitted'
										worklistGroup.requesterUserId = localStorage.getItem(
											'user-id'
										)
										worklistGroup.submitDate = new Date()
										worklistGroup.workLists.forEach(x1 => {
											x1.worklistStatus = 'Submitted'
										})
									}
									WorklistService.getInstance().saveWorkGroup(
										CurrentRequest.pageStore._selectedGroup,
										updateWorkList,
										MontefioreUtils.showError
									)
									props.cell.getGrid().refreshCells()
								}
								if (CurrentRequest.pageStore.isWorklistChild) {
									CurrentRequest.pageStore._selectedRequest.edit = false
									props.cell.getGrid().refreshCells()
									CurrentRequest.pageStore._selectedRequest.worklistStatus = 'Submitted'

									WorklistService.getInstance().saveWorklist(
										CurrentRequest.pageStore._selectedRequest,
										updateWorkList,
										MontefioreUtils.showError
									)
								}
								if (CurrentRequest.pageStore.isWorklist) {
									CurrentRequest.pageStore._selectedRequest.edit = false
									if (CurrentRequest.pageStore._selectedGroup.worklistStatus == 'Processed') {
										CurrentRequest.pageStore._selectedGroup.worklistStatus = 'Accepted'
										CurrentRequest.pageStore._selectedRequest.worklistStatus = 'Accepted'
									} else {
										CurrentRequest.pageStore._selectedGroup.worklistStatus = 'Submitted'
										CurrentRequest.pageStore._selectedRequest.worklistStatus = 'Submitted'
										CurrentRequest.pageStore._selectedGroup.submitDate = new Date()
									}
									WorklistService.getInstance().saveWorkGroup(
										CurrentRequest.pageStore._selectedGroup,
										updateWorkList,
										MontefioreUtils.showError
									)
									props.cell.getGrid().refreshCells()
								}
							},
							() => {
								// No Handler
							}
						)
					)
				}
			} else if (props.cell.getColumn().getHeaderText() === 'Save') {
				if (props.cell.rowInfo.getData().edit) {
					var saveMsg = 'Save'
					var endDate = CurrentRequest.pageStore._selectedRequest.endDate
					var oldEndDate = oldRequest.endDate
					
					var workListId  = CurrentRequest.pageStore.isWorklistGroup? CurrentRequest.pageStore._selectedGroup.worklistId :''
					var isWorklistProcessed = (CurrentRequest.pageStore.isWorklist||CurrentRequest.pageStore.isWorklistChild)&& CurrentRequest.pageStore.selectedItem.worklistStatus == 'Processed'
					saveMsg = isWorklistProcessed
					? 'submit ' + CurrentRequest.pageStore._selectedRequest.lastName +',' +  CurrentRequest.pageStore._selectedRequest.firstName+", end date: " + moment(endDate).format('MM/DD/YY') +' ?'
					: saveMsg
					if(((endDate !== oldEndDate) && isWorklistProcessed) || !isWorklistProcessed){
					dispatch(
						showMessage(
							'Confirm',
							'Are you sure you want to ' +saveMsg+ " "+  workListId,
							'YES_NO',
							() => {
					if (CurrentRequest.pageStore.isWorklistGroup) {
						CurrentRequest.pageStore._selectedGroup.edit = false
						WorklistService.getInstance().saveWorkGroup(
							CurrentRequest.pageStore._selectedGroup,
							updateWorkList,
							MontefioreUtils.showError
						)
					} else if (CurrentRequest.pageStore.isWorklist || CurrentRequest.pageStore.isWorklistChild) {
						CurrentRequest.pageStore._selectedRequest.edit = false

						WorklistService.getInstance().saveWorklist(
							CurrentRequest.pageStore._selectedRequest,
							updateWorkList,
							MontefioreUtils.showError
						)
					}
				
			},
			() => {}
		)
	)
		}
		else selectedobj.edit = false
		props.cell.getGrid().refreshCells()

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
								if (dataGridRef.current.showAddEmployee) {
									findWorklist()
								}
								else{
									CurrentRequest.pageStore._selectedRequest.endDate = oldRequest.endDate
								
								}
								props.cell.refreshCell()
								scrollWin(vpos)
							},
							() => {}
						)
					)
				} else {
					if (CurrentRequest.pageStore.isWorklistGroup) {
						if (!CurrentRequest.pageStore._selectedGroup.edit) {
							CurrentRequest.pageStore._selectedGroup.edit = true
							props.cell.getGrid().cellEditableFunction = isCellEditable
							props.cell.getGrid().refreshCells()
						} else {
							CurrentRequest.pageStore._selectedGroup.edit = false
							props.cell.getGrid().refreshCells()
						}
					} else if (CurrentRequest.pageStore.isWorklistChild) {
						if (!CurrentRequest.pageStore._selectedRequest.edit) {

							oldRequest = CurrentRequest.pageStore._selectedRequest.clone()
							CurrentRequest.pageStore._selectedRequest.edit = true
							props.cell.getGrid().cellEditableFunction = isCellEditable
							props.cell.getGrid().refreshCells()
						} else {
							CurrentRequest.pageStore._selectedRequest.edit = false
							props.cell.getGrid().refreshCells()
						}
					} else if (CurrentRequest.pageStore.isWorklist) {
						if (!CurrentRequest.pageStore._selectedRequest.edit) {
							oldRequest = CurrentRequest.pageStore._selectedRequest.clone()
							CurrentRequest.pageStore._selectedRequest.edit = true
							props.cell.getGrid().cellEditableFunction = isCellEditable
							props.cell.getGrid().refreshCells()
						} else {
							CurrentRequest.pageStore._selectedRequest.edit = false
							props.cell.getGrid().refreshCells()
						}
					}
				}
			} else if (props.cell.getColumn().getHeaderText() === 'Delete') {
				if (
					CurrentRequest.pageStore._selectedGroup.worklistId != null ||
					CurrentRequest.pageStore._selectedRequest.worklistId != null
				) {
					deleteid = CurrentRequest.pageStore.isWorklistGroup
						? CurrentRequest.pageStore._selectedGroup.worklistId
						: CurrentRequest.pageStore._selectedRequest.worklistId +
						  '.' +
						  CurrentRequest.pageStore._selectedRequest.id.worklistSeqNum
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
								gridDP.removeItemAt(CurrentRequest.pageStore._index)
								dataGridRef.current.refreshGrid()
							} else if (
								CurrentRequest.pageStore.isWorklistChild &&
								CurrentRequest.pageStore._selectedGroup.workLists.length > 1
							) {
								WorklistService.getInstance().deleteWorkListSingle(
									CurrentRequest.pageStore._selectedRequest,
									updateWorkList,
									MontefioreUtils.showError
								)
							} else {
								WorklistService.getInstance().deleteWorkListGroup(
									CurrentRequest.pageStore._selectedGroup,
									deletedWorkList,
									MontefioreUtils.showError
								)
							}
						},
						() => {}
					)
				)
			} else if (props.cell.getColumn().getHeaderText() === 'Add') {
				toast.warning('todo implement this')
			}
		}
	}

	const scrollWin = (vpos) => {
		dataGridRef.current && dataGridRef.current.refreshCells();
		dataGridRef.current && dataGridRef.current.gotoVerticalPosition(vpos)
	}

	const deletedWorkList = event => {
		var gridDP = dataGridRef.current.getDataProvider()
		var vp = dataGridRef.current.getVerticalScrollPosition()
		gridDP.removeItemAt(CurrentRequest.pageStore._index)
		dataGridRef.current.validateNow()
		// dataGridRef.current.expandAll()
		dataGridRef.current.gotoVerticalPosition(vp)
		dataGridRef.current.refreshGrid()
	}

	const updateWorkList = resp => {
		let workGroup = new IdWorklistGroup()
		workGroup.fromJson(resp.result)
		workGroup.workLists.forEach(wl => (wl.worklistGroup = workGroup))

		var vpos = dataGridRef.current.getVerticalScrollPosition()
		var gridDP = dataGridRef.current.getDataProvider()
		gridDP.removeItemAt(CurrentRequest.pageStore._index)

		if (CurrentRequest.pageStore.isWorklist) gridDP.addItemAt(workGroup.workLists.getItemAt(0), CurrentRequest.pageStore._index)
		else gridDP.addItemAt(workGroup, CurrentRequest.pageStore._index)
		// dataGridRef.current.expandAll()
		dataGridRef.current.rebuildBody()
		dataGridRef.current.validateNow()
		dataGridRef.current.gotoVerticalPosition(vpos)
	}

	const validateDOB = editor => {
		var valSuccess = true
		var dateFormat = 'MM-DD-YY'
		var cell = dataGridRef.current.getCurrentEditCell()
		var grid = dataGridRef.current
		var dataField = editor
		grid.clearErrorByObject(cell.rowInfo.getData())
		var valResult = moment(
			moment(editor.selectedDate).format(dateFormat),
			dateFormat,
			true
		).isValid()
		var now = new Date()
		var tenyeardt = new Date(
			now.getFullYear() - 10,
			now.getMonth(),
			now.getDate()
		)
		var hundyeardt = new Date(
			now.getFullYear() - 100,
			now.getMonth(),
			now.getDate()
		)

		if (!valResult) {
			console.log('Invalid format')
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid DOB date'
			)
		}
		if (
			dataField.selectedDate > tenyeardt ||
			dataField.selectedDate < hundyeardt
		) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid DOB date'
			)
		} else {
			grid.clearErrorByObject(cell.rowInfo.getData())
		}
		return valSuccess
	}

	const validateStartDate = editor => {
		var valSuccess = true
		var dateFormat = 'MM/DD/YY'
		var cell = dataGridRef.current.getCurrentEditCell()
		var dataField = editor
		var grid = dataGridRef.current
		if (cell == null || dataField.selectedDate == null) {
			return valSuccess
		}
		grid.clearErrorByObject(cell.rowInfo.getData())
		if (
			dataGridRef.current.getCurrentEditCell().rowInfo.getData().endDate != null
		) {
			var enddt = dataGridRef.current.getCurrentEditCell().rowInfo.getData()
				.endDate
		}
		var valResult = moment(
			moment(editor.selectedDate).format(dateFormat),
			dateFormat,
			true
		).isValid()
		if (!valResult) {
			console.log('Invalid format')
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid Start date'
			)
		}
		if (enddt != null && enddt < editor.selectedDate) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid Start date'
			)
		} else {
			grid.clearErrorByObject(cell.rowInfo.getData())
		}
		return valSuccess
	}
	const validateEndDate = editor => {
		var valSuccess = true
		var dateFormat = 'MM/DD/YY'
		var grid = dataGridRef.current
		var cell = dataGridRef.current.getCurrentEditCell()
		var dataField = editor
		grid.clearErrorByObject(cell.rowInfo.getData())
		var valResult = moment(
			moment(editor.selectedDate).format(dateFormat),
			dateFormat,
			true
		).isValid()
		var startdt = dataGridRef.current.getCurrentEditCell().rowInfo.getData()
			.startDate
		var enddt = dataField.selectedDate
		if (startdt === null || startdt === undefined) {
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid end date'
			)
			valSuccess = false
			return valSuccess
		} else {
			var now = new Date()
			var nowMMDDYYY = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate()
			)
			var nextyeardt = new Date(
				now.getFullYear() + 2,
				now.getMonth(),
				now.getDate() + 10
			)
		}
		if (!valResult) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid end date'
			)
		}
		if (enddt < nowMMDDYYY) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid End date'
			)
		}
		if (startdt > enddt) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid End date'
			)
		} else if (enddt > nextyeardt) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'End Date is More than Two Years ahead:'
			)
		} else {
			grid.clearErrorByObject(cell.rowInfo.getData())
		}
		return valSuccess
	}

	const validateLname = editor => {
		var valSuccess = true
		var cell = dataGridRef.current.getCurrentEditCell()
		var txt = editor
		var grid = dataGridRef.current
		grid.clearErrorByObject(cell.rowInfo.getData())
		var lname_re = /[a-zA-Z]/
		if (txt.getText().length < 1) {
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Missing required field : Last name'
			)
			valSuccess = false
		} else if (numb_regex.test(txt.getText())) {
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid Last name'
			)
			valSuccess = false
		} else if (txt.getText().length > 35) {
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Maximum Length for Last Name is 35 characters'
			)
			valSuccess = false
		}
		return valSuccess
	}

	const validateFname = editor => {
		var valSuccess = true
		var cell = dataGridRef.current.getCurrentEditCell()
		var txt = editor
		var grid = dataGridRef.current
		grid.clearErrorByObject(cell.rowInfo.getData())
		if (txt.getText().length < 1) {
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Missing required field : First name'
			)
			valSuccess = false
		} else if (numb_regex.test(txt.getText())) {
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid First name'
			)
			valSuccess = false
		} else if (txt.getText().length > 35) {
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Maximum Length for First Name is 35 characters'
			)
			valSuccess = false
		}
		return valSuccess
	}

	const validateInitial = editor => {
		var valSuccess = true
		var cell = dataGridRef.current.getCurrentEditCell()
		var txt = editor
		var grid = dataGridRef.current
		grid.clearErrorByObject(cell.rowInfo.getData())
		if (numb_regex.test(txt.getText()) || txt.getText().length > 1) {
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid Initial'
			)
			valSuccess = false
		}
		//If you return true, the grid will highlight the error in red and move on to the next row.
		//If you return false, the edit box would stay in place and not let the user move forward
		//unless the error is corrected.
		return valSuccess
	}

	const validateSSN = editor => {
		var valSuccess = true
		var cell = dataGridRef.current.getCurrentEditCell()
		var txt = editor
		
		var valResult = isValid(txt.getText())
		var grid = dataGridRef.current
		grid.clearErrorByObject(cell.rowInfo.getData())

		if (grid.getCurrentEditCell().rowInfo.getData().noSSN === 'Y' && txt.getText() === "") {
			return valSuccess
		} else if (grid.getCurrentEditCell().rowInfo.getData().noSSN === 'N' && txt.getText().length < 1) {
			// grid.setErrorByObject(
			// 	cell.rowInfo.getData(),
			// 	cell.getColumn().dataField,
			// 	'Invalid SSN'
			// )
			grid.setErrorByObject(
				cell.rowInfo.getData()
			)
			toast.warning("Invalid SSN")
			return valSuccess

		} else if (txt.getText().length < 4) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid SSN'
			)
		} else if (txt.getText().length < 4 && isNaN(Number(txt.getText()))) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid SSN'
			)
		} else if (txt.getText().length == 4 && isNaN(Number(txt.getText()))) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid SSN'
			)
		} else if (txt.getText().length > 4 && !valResult) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid SSN'
			)
		}
		//If you return true, the grid will highlight the error in red and move on to the next row.
		//If you return false, the edit box would stay in place and not let the user move forward
		//unless the error is corrected.
		return valSuccess
	}

	const validatePersonEmail = editor => {
		var valSuccess = true
		var grid = dataGridRef.current
		var colheader = grid.getCurrentEditCell()._column._headerText
		var cell = dataGridRef.current.getCurrentEditCell()
		var txt = editor

		var emailVal = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)
		var valResult = emailVal.test(txt.getText().toLowerCase())
		grid.clearErrorByObject(cell.rowInfo.getData())
		if (
			(colheader === 'Personal or Business Email' &&
				!valResult &&
				txt.getText().length > 0) ||
			(colheader === 'MHS Manager Email' &&
				(txt.getText().length < 1 || !valResult))
		) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid Email'
			)
		} else if (txt.getText().length > 200) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Maximum Length for Email is 200 characters'
			)
		}
		return valSuccess
	}

	const validateCompanyCode = editor => {
		var valSuccess = true
		var grid = dataGridRef.current
		var cell = dataGridRef.current.getCurrentEditCell()
		var txt = editor
		grid.clearErrorByObject(cell.rowInfo.getData())
		if (txt.getText().length < 1) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Missing required field : Vendor Consultant Company Name'
			)
		} else if (txt.getText().length > 50) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Maximum Length for Vendor Consultant Company Name is 50 characters'
			)
		}
		return valSuccess
	}

	const validatesmanagersource = editor => {
		var valSuccess = true
		var cell = dataGridRef.current.getCurrentEditCell()
		var txt = editor
		var grid = dataGridRef.current
		grid.clearErrorByObject(cell.rowInfo.getData())
		//if(!((txt.text.length ==4) ||(txt.text.length ==6) || (txt.text.length ==9)) || (isNaN(Number(txt.text))) ||Number(txt.text)<0 || txt.text.search(' ')>=0 || txt.text.search('+')>=0 || txt.text.search('.')>=0){
		if (txt.getText().length < 4 || txt.getText().length > 10) {
			valSuccess = false
		} else if (!numb_regex.test(txt.getText())) {
			valSuccess = false
		} else if (
			numb_errregex.test(txt.getText()) ||
			isNaN(Number(txt.getText()))
		) {
			valSuccess = false
		}
		if (!valSuccess) {
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid MHS Manager ID - must be number between 4 & 10 digits long'
			)
		}
		return valSuccess
	}

	const validatePhone = editor => {
		var valSuccess = true
		var cell = dataGridRef.current.getCurrentEditCell()
		var txt = editor
		var grid = dataGridRef.current
		grid.clearErrorByObject(cell.rowInfo.getData())

		const number = `+1${txt.getText()}`
		const valResult = isValidPhoneNumber(number)
		if (txt.getText().length > 0 && !valResult) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid Phone'
			)
		}
		if (
			txt.getText().length > 0 &&
			txt.getText().replaceAll('-', '').length < 10 &&
			!valResult
		) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid Phone'
			)
		}
		if (txt.getText().replaceAll('-', '').length > 12) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid phone'
			)
		}
		if (
			txt.getText().length > 10 &&
			txt.getText().replaceAll('-', '').length <= 12 &&
			txt.getText().charAt(3) != '-'
		) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid Phone'
			)
		}
		return valSuccess
	}

	const validateExt = editor => {
		var valSuccess = true
		var cell = dataGridRef.current.getCurrentEditCell()
		var txt = editor.getText()
		var grid = dataGridRef.current
		grid.clearErrorByObject(cell.rowInfo.getData())
		var managerph = grid.getCurrentEditCell().rowInfo.getData().managerExt
		if (managerph && managerph !== null) {
			if (managerph && managerph.length < 1 && txt.getText().length > 1) {
				valSuccess = false
				grid.setErrorByObject(
					cell.rowInfo.getData(),
					cell.getColumn().dataField,
					'Invalid Ext'
				)
			}
		}
		// if (!managerph && !txt)  {
		// 	valSuccess = false
		// 	grid.setErrorByObject(
		// 		cell.rowInfo.getData(),
		// 		cell.getColumn().dataField,
		// 		'Invalid Ext'
		// 	)
		// }
		
		var valResult = false
		if(!Number(editor.getText())){
			valResult = true
		}
		if (txt.length > 0 && valResult) {
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Invalid Ext'
			)
			valSuccess = false
		}
		return valSuccess
	}

	const validateAdditionalComment = editor => {
		var valSuccess = true
		var cell = dataGridRef.current.getCurrentEditCell()
		var txt = editor
		var grid = dataGridRef.current
		grid.clearErrorByObject(cell.rowInfo.getData())

		if (txt.getText().length > 250) {
			valSuccess = false
			grid.setErrorByObject(
				cell.rowInfo.getData(),
				cell.getColumn().dataField,
				'Maximum Length for Requestor Comment is 250 characters '
			)
		}
		return valSuccess
	}

	// const textFilterFunction = (item, filter) => {
	// 	if (typeof filter.expression === 'string') {
	// 		return (
	// 			item[filter.columnName]
	// 				.toString()
	// 				.toLowerCase()
	// 				.indexOf(filter.expression.toLowerCase()) !== -1
	// 		)
	// 	} else if (
	// 		typeof filter.expression === 'object' &&
	// 		filter.expression.length > 0
	// 	) {
	// 		const filteredArr = filter.expression.map(data => {
	// 			const temp =
	// 				item[filter.columnName]
	// 					.toString()
	// 					.toLowerCase()
	// 					.indexOf(data.toLowerCase()) !== -1

	// 			if (temp) return true
	// 		})

	// 		return filteredArr && filteredArr.length && filteredArr[0]
	// 	}
	// }

	const setWorkList = event => {
		var workListGroupArr = new ArrayCollection()
		var workListArr = new ArrayCollection()
		var grid = dataGridRef.current
		var vpos = dataGridRef.current && dataGridRef.current.getVerticalScrollPosition()
		event.workList.forEach(data => {
			let workGroup = new IdWorklistGroup()
			workGroup.fromJson(data)
			workGroup.workLists.forEach(wl => (wl.worklistGroup = workGroup))
			if (workGroup.workLists != null && workGroup.workLists.length === 1)
				workListArr.addAll(workGroup.workLists)
			else workListGroupArr.addItem(workGroup)
		})
		workListGroupArr.addAll(workListArr)
		if (grid) {
			grid.setDataProvider(workListGroupArr)
			grid.getColumnLevel().filterFunction = filterDeviceTypes
			grid.getColumnLevel().nextLevel.filterFunction = filterDeviceTypesChild
			grid.processFilter()
			// grid.removeAllSorts()
			grid.clearAllFilters()
			if (initialLoad && grid) {
				grid.expandAll()
				initialLoad = false
			}
			setTimeout(() => {
				scrollWin(vpos)
			}, 500)
		}
	}

	const filterDeviceTypes = item => {
		if (
			item != null &&
			(item.worklistStatus == 'Initial' ||
				item.worklistStatus == 'Ready' ||
				item.worklistStatus == 'OnHold' ||
				item.worklistStatus == 'Rejected' ||
				item.worklistStatus == 'Processed')
		) {
			return true
		} else return false
	}

	const filterDeviceTypesChild = item => {
		if (
			item != null &&
			(item.worklistStatus == 'Initial' ||
				item.worklistStatus == 'Ready' ||
				item.worklistStatus == 'OnHold' ||
				item.worklistStatus == 'Rejected' ||
				item.worklistStatus == 'Submitted' ||
				item.worklistStatus == 'Accepted' ||
				item.worklistStatus == 'Processed')
		) {
			return true
		} else return false
	}

	return (
		<div className="requestor-grid-container">
			<Paper style={{ height: '100%', width: '100%', marginTop: '10px' }}>
				<RequestorSearch
					findWorklist={findWorklistThroughSearch}
					setWorkList={(e) => {
						initialLoad = true
						setWorkList(e)
					}}
					valueOfTab={tabValue}
					dataGrid={dataGridRef.current}
				/>
				<div style={{ height: 'calc(100% - 65px)' }}>
					<DataGrid
						ref={dataGridRef}
						textAlign={'center'}
						height={'100%'}
						width={'100%'}
						id="Requestor_WorkList_Grid"
						clearOpenItemsOnDataProviderChange={false}
						selectedKeyField={'uniqueIdentifier'}
						alternatingItemColors={[0xffffff, 0xffffff]}
						enablePrint
						// enablePreferencePersistence
						// enableDrag
						showSpinnerOnFilterPageSort
						enableEagerDraw
						// enableDrop
						// enableExport
						enableCopy
						preferencePersistenceKey={'simpleGrid'}
						// enableMultiColumnSort
						useCompactPreferences
						horizontalScrollPolicy={'auto'}
						footerDrawTopBorder
						enablePdf
						// cellBackgroundColorFunction="getColor"
						//  alternatingItemColors="[0xffffff,0xffffff]"
						enableToolbarActions
						styleName="gridStyle"
						editable
						enableDrillDown
						showAddEmployee
						showRefresh
						filterVisible={false}
						headerWordWrap
						headerHeight={60}
						enableDefaultDisclosureIcon={false}
						headerSortSeparatorRight={3}
						// selectionMode="none"
						// variableRowHeight
						// getRowHeightFunction={getRowHeight}
						toolbarActionExecutedFunction={onExecuteToolbarAction}
						cellEditableFunction={isCellEditable}>
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
									width={125}
									columnLockMode={'left'}
									enableCellClickRowSelect={false}
									editable={false}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									enableExpandCollapseIcon
									enableHierarchicalNestIndent
									expandCollapseIconPlacementFunction={placeExpandCollapseIcon}
									filterCompareFunction={null}
									// filterWaterMark={"Contains"}
								/>
								<ReactDataGridColumn
									dataField="id.worklistSeqNum"
									headerText="Seq"
									width={35}
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
								width={70}
								columnLockMode={'left'}
								enableCellClickRowSelect={false}
								editable={false}
								filterComboBoxBuildFromGrid={true}
								filterControl="MultiSelectComboBox"
								itemRenderer={worklistStatusRenderer}
								cellBackgroundColorFunction={getCellBackgroundColor}
								filterCompareFunction={null}
								filterComboBoxWidth={150}
							/>
							<ReactDataGridColumnGroup
								headerText="Personal"
								dataField="requester-user-id">
								<ReactDataGridColumn
									textAlign={'left'}
									dataField="lastName"
									headerText="Last Name"
									width={100}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									headerWordWrap={true}
									itemEditor={textInputEditor}
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemEditorValidatorFunction={validateLname}
									filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
									dataField="firstName"
									headerText="First Name"
									width={100}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									headerWordWrap={true}
									enableRecursiveSearch={true}
									itemEditor={textInputEditor}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemEditorValidatorFunction={validateFname}
									filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									dataField="middleNameOrInitial"
									headerText="Init"
									width={35}
									headerWordWrap={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemEditor={textInputEditor}
									sortable={false}
									itemEditorValidatorFunction={validateInitial}
								/>
								<ReactDataGridColumn
									dataField="noSSN"
									headerText="No SSN"
									valueOfTab={tabValue}
									width={35}
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
									// editable={true}
									headerWordWrap={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}									
									itemEditor={textInputEditor}
									itemRenderer={ssnItemRenderer}
									// labelFunction={findSSNLabel}
									itemEditorValidatorFunction={validateSSN}
								/>
								<ReactDataGridColumn
									dataField="dateOfBirth"
									headerText="DOB"
									width={120}
									editorDataField="selectedDate"
									// filterControl="DateComboBox"
									filterRenderer={dateFilter}
									enableRecursiveSearch={true}
									formatter={ExampleUtils.dateFormatter5}
									// itemEditorValidatorFunction={validateDOB}
									// filterCompareFunction={null}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
									itemEditor={dateOfBirthRendererEditorWrapper}
									filterDateRangeOptions={[DateRange.DATE_RANGE_CUSTOM]}
								/>
								<ReactDataGridColumn
									dataField="gender"
									headerText="Gender"
									width={55}
									headerWordWrap={true}
									filterControl="MultiSelectComboBox"
									filterComboBoxDataProvider={combogenderDP}
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									// filterCompareFunction={null}
									enableCellClickRowSelect={false}
									itemEditor={genderEditorWrapper}
									filterCompareFunction={null}
									filterComboBoxWidth={150}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
									dataField="nonMonteEmail"
									headerText="Personal or Business Email"
									width={120}
									itemEditor={textInputEditor}
									headerWordWrap={true}
									itemEditorValidatorFunction={validatePersonEmail}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
								/>
							</ReactDataGridColumnGroup>
							<ReactDataGridColumnGroup
								headerText="Official Details"
								dataField="requester-user-id">
								<ReactDataGridColumn
									textAlign={'left'}
									dataField="employeeSubGroup"
									headerText="User Type"
									width={140}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									enableRecursiveSearch={true}
									headerWordWrap={true}
									editable={true}
									itemEditorApplyOnValueCommit={false}
									enableCellClickRowSelect={false}
									itemEditorManagesPersistence={true}
									itemEditor={employeeSubGroupEditorWrapper}
									filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
									dataField="companyCode"
									headerText="Vendor Consultant Company"
									width={150}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									enableRecursiveSearch={true}
									itemEditor={textInputEditor}
									headerWordWrap="true"
									itemEditorValidatorFunction={validateCompanyCode}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
									filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
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
									filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
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
									filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
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
									filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									dataField="startDate"
									headerText="Start Date"
									width={120}
									editorDataField="selectedDate"
									filterRenderer={dateFilter}
									// filterControl="DateComboBox"
									enableRecursiveSearch={true}
									headerWordWrap={false}
									formatter={ExampleUtils.dateFormatter5}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemEditor={startDateRendererEditorWrapper}
									// itemEditorValidatorFunction={validateStartDate}
									filterDateRangeOptions={[DateRange.DATE_RANGE_CUSTOM]}
									// filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									dataField="endDate"
									headerText="End Date"
									width={120}
									filterRenderer={dateFilter}
									editorDataField="selectedDate"
									// filterControl="DateComboBox"
									enableRecursiveSearch={true}
									headerWordWrap={false}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									formatter={ExampleUtils.dateFormatter5}
									// labelFunction={MontefioreUtils.dateFormatter2}
									itemEditor={endDateRendererEditorWrapper}
									//itemEditorValidatorFunction={validateEndDate}
									filterDateRangeOptions={[DateRange.DATE_RANGE_CUSTOM]}
									// filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
									dataField="managerSourceUniqueId"
									headerText="MHS Manager ID"
									width={100}
									filterControl="TextInput"
									filterOperation="Contains"
									filterWaterMark="Contains"
									enableRecursiveSearch={true}
									headerWordWrap={true}
									itemEditorApplyOnValueCommit={true}
									itemEditor={textInputEditor}
									enableCellClickRowSelect={false}
									itemEditorValidatorFunction={validatesmanagersource}
									sortable={false}
									filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									dataField="managerPh"
									headerText="MHS Manager Phone"
									width={100}
									headerWordWrap={true}
									itemEditorApplyOnValueCommit={true}
									itemEditor={textInputEditor}
									enableCellClickRowSelect={false}
									itemEditorValidatorFunction={validatePhone}
									sortable={false}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
									dataField="managerExt"
									headerText="MHS Manager Ext"
									itemEditor={textInputEditor}
									width={100}
									itemEditorValidatorFunction={validateExt}
									headerWordWrap={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
									dataField="managerEmail"
									headerText="MHS Manager Email"
									width={100}
									itemEditor={textInputEditor}
									headerWordWrap={true}
									itemEditorValidatorFunction={validatePersonEmail}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									sortable={false}
								/>
								{/* <ReactDataGridColumn
									dataField="epicRequest"
									headerText="EPIC"
									width={60}
									headerWordWrap={true}
									filterControl="MultiSelectComboBox"
									valueOfTab={tabValue}
									filterComboBoxDataProvider={comboDP}
									editable={false}
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemRenderer={checkBoxItemRenderer}
									filterCompareFunction={null}
									filterComboBoxWidth={150}
								/>
								<ReactDataGridColumn
									dataField="epfRequest"
									headerText="EPF"
									width={60}
									headerWordWrap={true}
									valueOfTab={tabValue}
									filterControl="MultiSelectComboBox"
									filterComboBoxDataProvider={comboDP}
									editable={false}
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemRenderer={checkBoxItemRenderer}
									filterCompareFunction={null}
									filterComboBoxWidth={150}
								/>
								<ReactDataGridColumn
									dataField="epcsHardTokenRequest"
									headerText="EPCS Hard Token"
									width={80}
									headerWordWrap={true}
									filterControl="MultiSelectComboBox"
									valueOfTab={tabValue}
									filterComboBoxDataProvider={comboDP}
									editable={false}
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemRenderer={checkBoxItemRenderer}
									filterCompareFunction={null}
									filterComboBoxWidth={150}
								/> */}
								<ReactDataGridColumn
									dataField="mmcEmailRequest"
									headerText="MMC Email"
									width={60}
									headerWordWrap={true}
									filterControl="MultiSelectComboBox"
									valueOfTab={tabValue}
									filterComboBoxDataProvider={comboDP}
									editable={false}
									enableRecursiveSearch={true}
									itemEditorApplyOnValueCommit={true}
									enableCellClickRowSelect={false}
									itemRenderer={checkBoxItemRenderer}
									filterCompareFunction={null}
									filterComboBoxWidth={150}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
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
									itemEditor={textInputEditor}
									sortable={false}
									itemEditorValidatorFunction={validateAdditionalComment}
									filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
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
									filterComboBoxWidth={150}
									// filterCompareFunction={null}
								/>
								<ReactDataGridColumn
									textAlign={'left'}
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
									filterCompareFunction={null}
									sortable={false}
								/>
								<ReactDataGridColumn
									dataField="createDate"
									headerText="Create Date"
									width={70}
									// filterControl="DateComboBox"
									enableRecursiveSearch={true}
									filterRenderer={dateFilter}
									headerWordWrap={false}
									// editable={false}
									formatter={ExampleUtils.dateFormatter3}
									enableCellClickRowSelect={false}
									sortable={false}
									filterDateRangeOptions={[DateRange.DATE_RANGE_CUSTOM]}
									itemEditor={createDateRendererEditorWrapper}
									// filterCompareFunction={null}
								/>
							</ReactDataGridColumnGroup>
							<ReactDataGridColumn
								dataField="uploadDocs"
								headerText="Upload or View Docs"
								width={60}
								columnLockMode={'right'}
								itemRenderer={uploadOrViewFile}
								editable={false}
								hideText={true}
								headerWordWrap={true}
								onDocumentClick={iconClick}
								iconToolTip="View/Upload Request Document"
								iconHandCursor={true}
								columnWidthMode="fixed"
								iconLeft="25"
								sortable={false}
							/>
							<ReactDataGridColumn
								dataField="Save"
								headerText="Save"
								width={50}
								columnLockMode={'right'}
								itemRenderer={save}
								editable={false}
								hideText={true}
								//  enableIcon useIconRollOverTimer={false}={true}
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
								width={50}
								columnLockMode={'right'}
								itemRenderer={edit}
								editable={false}
								hideText={true}
								//  enableIcon useIconRollOverTimer={false}={true}
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
								width={50}
								columnLockMode={'right'}
								itemRenderer={remove}
								editable={false}
								hideText={true}
								//  enableIcon useIconRollOverTimer={false}="{this.searchTb.viewStack.selectedIndex==0}"
								iconHandCursor={true}
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
								//  enableIcon useIconRollOverTimer={false}={true}
								//  iconFunction="dynamicIconFunctionSubmit"
								iconToolTip="Submit/Accept Request"
								iconHandCursor={true}
								columnWidthMode="fixed"
								iconLeft="20"
								sortable={false}
								handleSubmit={iconClick}
							/>
							<ReactDataGridColumnLevel
								enableFooters
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
				headerTitle="Document Viewer"
				bodyRenderer={<DocumentViewer documentFileUrl={documentFileUrl} onClose={setOpenModal} />}
			/>
			<DocumentLibrary
				worklist={worklist}
				onShowDocument={onShowDocument}
				onOpenDocument={onOpenDocument}
				openDocumentLibrary={openDocumentLibrary}
				documentlibraryTitle={documentlibraryTitle}
				updateWorkList={updateWorkList}
			/>
		</div>
	)
}

export default withStyles(styles, { withTheme: true })(CurrentRequest)
