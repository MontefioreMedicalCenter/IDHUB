import React, { useRef } from 'react'
import { Button, Paper, withStyles } from '@material-ui/core'
import './DocumentLibrary.style.scss'
import DataGrid from '../../../shared/components/ExtendedDataGrid'
import { ReactDataGridColumn, ClassFactory } from '../../../flexicious'
import Back from '../../../assets/images/back_2.png'
import { useDispatch, useSelector } from 'react-redux'
import Remove from '../../../container/views/itemRenderers/Remove'
import { showMessage } from '../../../AppConfig/store/actions/homeAction'
import StorageService from '../../../service/cfc/StorageService'
import MontefioreUtils from '../../../service/utils/MontefioreUtils'
import { setDocumentLibrary } from '../../../AppConfig/store/actions/workListSheet'
import moment from 'moment'
import ArrayCollection from '../../../vo/ArrayCollection'
import AdvanceDialog from '../../../shared/components/AdvanceDialog'
import WorklistService from '../../../service/cfc/WorklistService'

const styles = theme => ({
	gridHeader: {
		color: `${theme.palette.primary.contrastText}`,
		background: `${theme.palette.primary.main}`,
		fontWeight: 'lighter !important'
	}
})

const remove = new ClassFactory(Remove)

const DocumentLibrary = ({ worklist, onShowDocument, openDocumentLibrary, documentlibraryTitle, onOpenDocument, updateWorkList }) => {
	const dispatch = useDispatch()
	const dataGridRef = useRef(null)
	const fileName = useRef(null)
	const documentLibrary = useSelector(
		state => state.workListState.documentLibrary
	)
	const documentLibraryState = useSelector(state => state.documentLibraryState)

	var file = null

	const showDocument = file => {
		onShowDocument(file)
	}

	const baseNamerenderer = props => {
		const row = props.row.getData()
		return (
			<span
				onClick={() => showDocument(props.row.getData().fileURL)}
				className="document-file-name">
				{row.baseName || '...'}
			</span>
		)
	}

	const LocateFile = () => {
		const ele = document.getElementById('uploaderDocs')

		if (ele) {
			ele.onchange = e => onFileSelect(e)
			ele.click()
		}
	}

	const onFileSelect = event => {
		file = event.target
		const name = file.files.length ? file.files[0].name : 'browse..'
		fileName.current.innerText =
			worklist.worklistId +
			'_' +
			moment(new Date()).format('YYYYMMDD') +
			'_' +
			name
	}

	const deleteWorklistDocument = e => {
		const dirListEntry = JSON.stringify({
			baseName: e.row.getData().baseName || ''
		})
		dispatch(
			showMessage(
				'Confirm Delete',
				'Are you sure you wish to delete this Document? ',
				'OK_CANCEL',
				() => {
					StorageService.getInstance().deleteWorklistDocument(
						worklist.worklistId,
						dirListEntry,
						docLibrarySuccessResultEvent,
						MontefioreUtils.showError
					)
				},
				() => {}
			)
		)
	}

	const uploadFile = () => {
		dispatch(
			showMessage(
				'Confirm Upload',
				'Are you sure you want to upload this file?',
				'YES_NO',
				onConfirm,
				() => {}
			)
		)
	}

	const onConfirm = () => {
		storeWorklistDocument()
		fileName.current.innerText = 'browse..'
	}

	const storeWorklistDocument = () => {
		StorageService.getInstance().storeWorklistDocument(
			worklist.worklistId,
			fileName.current.innerText,
			file.files,
			docLibrarySuccessResultEvent,
			MontefioreUtils.showError
		)
	}

	const docLibrarySuccessResultEvent = resp => {
		if (worklist != null) {
			worklist.fileList = new ArrayCollection().concat(resp.result)
		}
		dispatch(setDocumentLibrary(resp.result))
	}

	const dispose = (event) => {
			var gridDp = dataGridRef.current.getDataProvider()
			var readyStatus = false
	 		if (gridDp != null  && gridDp.length > 0) 
			{
				gridDp.forEach(data => {
					if (data.baseName.toLocaleLowerCase().indexOf('confagree')===21)
					{
						readyStatus=true
					}
				})
			}	
			var selectedRequest = worklist.constructorName === "IdWorklist" ? worklist : null;
			var selectedGroup = worklist.constructorName === "IdWorklistGroup" ? worklist : null;
			if (selectedRequest != null)
				selectedGroup=selectedRequest.worklistGroup
			if (selectedGroup != null){		
			if (readyStatus && worklist.worklistStatus === 'Initial')
			{
				selectedGroup.worklistStatus='Ready'
				selectedGroup.workLists.forEach(x => { x.worklistStatus = "Ready"})
				// WorklistService.saveWorkGroup(selectedGroup)
				WorklistService.getInstance().saveWorkGroup(
					selectedGroup,
					updateWorkList,
					MontefioreUtils.showError
				)
			}		
			else if (!readyStatus && (worklist.worklistStatus === 'Ready' || worklist.worklistStatus === 'Rejected'))
			{
				selectedGroup.worklistStatus='Initial'
				selectedGroup.workLists.forEach(xx => { xx.worklistStatus = "Initial"})	
				WorklistService.getInstance().saveWorkGroup(
					selectedGroup,
					updateWorkList,
					MontefioreUtils.showError
				)
			}
		}
		
		onOpenDocument()
	}

	return (
		<AdvanceDialog
			open={openDocumentLibrary}
			handleClose={dispose}
			headerTitle={documentlibraryTitle}
			bodyRenderer={
				<div className="document-library-container">
					<Paper className="document-library-innner-container">
						<DataGrid
							ref={dataGridRef}
							textAlign={'center'}
							height={'100%'}
							width={'100%'}
							id="Document_Library_Grid"
							dataProvider={documentLibrary}
							editable
							enableCopy
							styleName="gridStyle">
							<ReactDataGridColumn
								headerText="File Name"
								width={750}
								headerAlign="center"
								editable={false}
								sortable={false}
								enableCellClickRowSelect={false}
								columnWidthMode="fixed"
								useUnderLine
								itemRenderer={baseNamerenderer}
							/>
							<ReactDataGridColumn
								textAlign="right"
								paddingRight={20}
								onHandleDelete={deleteWorklistDocument}
								itemRenderer={
									Boolean(documentLibraryState.showDelete) ? remove : () => null
								}
							/>
						</DataGrid>
					</Paper>
					{Boolean(documentLibraryState.showUpload) && (
						<div className="upload-doc-container">
							<span className="upload-text">Upload File:</span>
							<div
								ref={fileName}
								className="upload-file-name"
								onClick={LocateFile}>
								<span>browse...</span>
							</div>
							<input
								id="uploaderDocs"
								style={{ display: 'none' }}
								type="file"
							/>
							<Button
								variant="contained"
								color="primary"
								size="large"
								onClick={uploadFile}
								startIcon={<img src={Back} alt="no-img" />}>
								{' '}
								Upload{' '}
							</Button>
						</div>
					)}
				</div>
			}
		/>
	)
}

export default withStyles(styles, { withTheme: true })(DocumentLibrary)
