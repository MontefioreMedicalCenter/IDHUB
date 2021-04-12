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

const styles = theme => ({
	gridHeader: {
		color: `${theme.palette.primary.contrastText}`,
		background: `${theme.palette.primary.main}`,
		fontWeight: 'lighter !important'
	}
})

const remove = new ClassFactory(Remove)

const DocumentLibrary = ({ worklist }) => {
	const dispatch = useDispatch()
	const dataGridRef = useRef(null)
	const documentLibrary = useSelector(
		state => state.workListState.documentLibrary
	)
	const documentLibraryState = useSelector(state => state.documentLibraryState)

	const showDocument = () => {}

	const baseNamerenderer = props => {
		const row = props.row.getData()
		return (
			<span onClick={showDocument} className="document-file-name">
				{row.baseName || '...'}
			</span>
		)
	}

	const locateImage = () => {
		const ele = document.getElementById('uploaderDocs')

		if (ele) {
			//   ele.onchange = (e) => this.handleOnLocateAvatar(e, idString);
			ele.click()
		}
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
	const docLibrarySuccessResultEvent = resp => {
		dispatch(setDocumentLibrary(resp.result))
	}

	return (
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
				<div className="upload-container">
					<span className="upload-text">Upload File:</span>
					<div className="upload-file-name" onClick={locateImage}>
						browse...
					</div>
					<input
						id="uploaderDocs"
						accept={'.xls, .xlsx'}
						style={{ display: 'none' }}
						type="file"
					/>
					<Button
						variant="contained"
						color="primary"
						size="large"
						startIcon={<img src={Back} alt="no-img" />}>
						{' '}
						Upload{' '}
					</Button>
				</div>
			)}
		</div>
	)
}

export default withStyles(styles, { withTheme: true })(DocumentLibrary)
