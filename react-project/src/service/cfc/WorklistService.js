import ServiceProxyBase from './ServiceProxyBase'
import qs from 'qs'
import { stringifyCircularObjectWithModifiedKeys } from '../../shared/utils';
export default class WorklistService extends ServiceProxyBase {
	constructor(props) {
		super(props)
		this.source = ''
	}
	findRevWorklists(resultHandler, faultHandler) {
		return this.findWorklistGroups(resultHandler, faultHandler);
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
		workList = stringifyCircularObjectWithModifiedKeys(workList);
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

	saveWorklist(worklist, resultHandler, faultHandler) {
		var headerData = {
			userName: localStorage.getItem('user-id'),
			'content-Type': 'application/x-www-form-urlencoded'
		}
		if (typeof faultHandler == 'undefined') faultHandler = null;
		worklist = stringifyCircularObjectWithModifiedKeys(worklist);

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
			'form',
			headerData
		)
	}

	saveWorkGroup(worklistGroup, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null;
		worklistGroup = stringifyCircularObjectWithModifiedKeys(worklistGroup);

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



	sendRejectMailToRequestor(workListGroup/* :IdWorklistGroup */)/* :void */ {
		var bodyFormData = stringifyCircularObjectWithModifiedKeys(workListGroup);

		var worklistGroup = qs.stringify({
			worklistGroup: bodyFormData
		})

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/sendRejectMailToRequestor',
			worklistGroup,
			null,
			this.sendRejectMailSuccessResult,
			this.failureFaultEvent,
			'form'
		)
	}

	sendRejectMailSuccessResult(event)//:ResultEvent, token:Object=null):void
	{
		alert("Email sent to Requestor Sucessfully!"/* , "Requestor Email", Alert.OK */)
	}

	sendAcceptMailToHelpDesk(workListGroup)//:IdWorklistGroup):void
	{
		var bodyFormData = stringifyCircularObjectWithModifiedKeys(workListGroup)
		var worklistGroup = qs.stringify({
			worklistGroup: bodyFormData
		})

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/sendAcceptMailToHelpDesk',
			worklistGroup,
			null,
			this.sendAcceptMailSuccessResult,
			this.failureFaultEvent,
			'form'
		)
		//var rpcCall:AsyncToken=this.service.sendAcceptMailToHelpDesk(workListGroup);
		//rpcCall.addResponder(new AsyncResponder(this.sendAcceptMailSuccessResult, this.failureFaultEvent));
	}

	sendAcceptMailSuccessResult(event)//:ResultEvent, token:Object=null):void
	{
		alert("Email sent to Help Desk Sucessfully!")//, "Help Desk Email sent", Alert.OK)
	}

	sendDocumentsToBox(workListId)//:string):void
	{
		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/sendDocumentsToBox',
			workListId,
			null,
			this.boxTransferSuccessResult,
			this.failureFaultEvent,
			'form'
		)
		//var rpcCall:AsyncToken=this.service.sendDocumentsToBox(workListId);
		//rpcCall.addResponder(new AsyncResponder(this.boxTransferSuccessResult, this.failureFaultEvent));
	}

	boxTransferSuccessResult(event)//:ResultEvent, token:Object=null):void
	{
		alert("Files Trasferred to Box Sucessfully!")//, "Bos File Transfer", Alert.OK) 
	}

	failureFaultEvent(err)//:FaultEvent, token:Object=null):void
	{
		var msg = err.error ? err.error.message : err.toString();
		if (msg.indexOf('Aborting findWorklistGroups() as userId is') > -1) {
			alert("logging out ")
			this.loginService.logOut();
		}
		else
			alert(msg)//.faultString, "Error Message", Alert.OK)
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
