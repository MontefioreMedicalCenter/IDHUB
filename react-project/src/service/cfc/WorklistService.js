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
