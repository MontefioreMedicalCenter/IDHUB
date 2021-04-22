import ServiceProxyBase from './ServiceProxyBase'
import qs from 'qs'

export default class StorageService extends ServiceProxyBase {
	constructor(props) {
		super(props)
		this.source = ''
	}

	listDocumentLibraryFiles(resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null

		return this.callServiceMethod(
			'get',
			'IdentityHub/api/storagesvc/listDocumentLibraryFiles',
			null,
			null,
			resultHandler,
			faultHandler
		)
	}

	deleteWorklistDocument(workListId, dirListFile, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		var bodyFormData = qs.stringify({
			worklistId: workListId,
			dirListEntry: dirListFile
		})

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/storagesvc/deleteWorklistDocument',
			bodyFormData,
			null,
			resultHandler,
			faultHandler,
			'form'
		)
	}

	storeWorklistDocument(workListId, fileName, dirListFile, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		const formData = new FormData()

		if (dirListFile && dirListFile.length) {
			for (let loop = 0; loop < dirListFile.length; loop++) {
				formData.append('dirListEntryContent', dirListFile[loop])
				formData.append('worklistId', String(workListId))
				formData.append('fileName', String(fileName))
			}
		}

		var headerData = {
			'Content-Type': 'multipart/form-data'
		}

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/storagesvc/storeWorklistDocument',
			formData,
			null,
			resultHandler,
			faultHandler,
			null,
			headerData
		)
	}




}

StorageService.prototype.typeName = StorageService.typeName = 'StorageService' //for quick inspection
StorageService.instance = null
StorageService.getInstance = () => {
	if (StorageService.instance == null) {
		StorageService.instance = new StorageService()
	}
	return StorageService.instance
}
