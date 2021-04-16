import ServiceProxyBase from './ServiceProxyBase'
import qs from 'qs'
export default class WorklistService extends ServiceProxyBase {
	constructor(props) {
		super(props)
		this.source = ''
	}

	findWorklistGroups(resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		var headerData = {
			userName: localStorage.getItem('user-id'),
			'Content-Type': 'application/json'
		}

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/findWorklistGroups',
			null,
			null,
			resultHandler,
			faultHandler,
			null,
			headerData
		)
	}

	findLookupLists(resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		var headerData = {
			userName: localStorage.getItem('user-id'),
			'content-Type': 'application/json'
		}

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/findLookupListsReCache',
			null,
			null,
			resultHandler,
			faultHandler,
			null,
			headerData
		)
	}
	deleteWorkListSingle(workList, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		var bodyFormData = qs.stringify({
			worklist: workList
		})

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/deleteWorklist',
			bodyFormData,
			null,
			resultHandler,
			faultHandler,
			'form'
		)
	}

	saveWorklists(worklist, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		var bodyFormData = qs.stringify({
			worklist: worklist
		})
		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/saveWorklist',
			bodyFormData,
			null,
			resultHandler,
			faultHandler,
			'form'
		)
	}

	saveWorkGroup(worklistGroup, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		var bodyFormData = qs.stringify({
			worklistGroup: worklistGroup
		})
		var headerData = {
			userName: localStorage.getItem('user-id'),
			'content-Type': 'application/x-www-form-urlencoded'
		}
		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/saveWorkGroup',
			bodyFormData,
			null,
			resultHandler,
			faultHandler,
			'form',
			headerData
		)
	}

	loadWorklistFromSpreadsheet(
		content,
		isSelected,
		resultHandler,
		faultHandler
	) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		const formData = new FormData()

		if (content && content.length) {
			for (let loop = 0; loop < content.length; loop++) {
				formData.append('content', content[loop])
				formData.append('groupFlag', String(isSelected))
			}
		}

		var headerData = {
			userName: localStorage.getItem('user-id'),
			'Content-Type': 'application/json'
		}

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/loadWorklistFromSpreadsheet',
			formData,
			null,
			resultHandler,
			faultHandler,
			null,
			headerData
		)
	}
}

WorklistService.prototype.typeName = WorklistService.typeName =
	'WorklistService' //for quick inspection
WorklistService.instance = null
WorklistService.getInstance = () => {
	if (WorklistService.instance == null) {
		WorklistService.instance = new WorklistService()
	}
	return WorklistService.instance
}
