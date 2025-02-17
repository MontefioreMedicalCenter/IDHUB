import ServiceProxyBase from './ServiceProxyBase'
import qs from 'qs'
import { stringifyCircularObjectWithModifiedKeys } from '../../shared/utils'
import WorkListEvent from '../../events/WorkListEvent'
import IdWorklistGroup from '../../vo/worklist/IdWorklistGroup'
import store from '../../AppConfig/store/configureStore'
import { showMessage } from '../../AppConfig/store/actions/homeAction'
import { toast } from 'react-toastify'
export default class WorklistService extends ServiceProxyBase {
	constructor(props) {
		super(props)
		this.source = ''
	}
	findRevWorklists(resultHandler, faultHandler) {
		return this.findWorklistGroups(resultHandler, faultHandler)
	}
	findWorklistGroups(resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		
		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/findWorklistGroups',
			null,
			null,
			resultHandler,
			faultHandler,
			null,
			this.getHeaderData()
		)
	}

	findLookupLists(resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/findLookupListsReCache',
			null,
			null,
			resultHandler,
			faultHandler,
			null,
			this.getHeaderData()
		)
	}
	deleteWorkListSingle(workList, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		workList = stringifyCircularObjectWithModifiedKeys(workList)
		var bodyFormData = qs.stringify({
			worklist: workList
		})

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/deleteWorklist',
			bodyFormData,
			null,
			resultHandler || this.saveWorkListGroupSuccessResultEvent.bind(this),
			faultHandler || this.failureFaultEvent.bind(this), 
			'form',
			this.getHeaderFormData()
		)
	}
	
	deleteWorkListGroup(workList, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		workList = stringifyCircularObjectWithModifiedKeys(workList)
		var bodyFormData = qs.stringify({
			worklistGroup: workList
		})

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/deleteWorklistGroup',
			bodyFormData,
			null,
			resultHandler,
			faultHandler,
			'form',
			this.getHeaderFormData()
		)
	}

	saveWorklist(worklist, resultHandler, faultHandler) {
		
		if (typeof faultHandler == 'undefined') faultHandler = null
		worklist = stringifyCircularObjectWithModifiedKeys(worklist)

		var bodyFormData = qs.stringify({
			worklist: worklist
		})
		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/saveWorklist',
			bodyFormData,
			null,
			resultHandler || this.saveWorkListGroupSuccessResultEvent.bind(this),
			faultHandler || this.failureFaultEvent.bind(this),
			'form',
			this.getHeaderFormData()
		)
	}
	saveWorkGroup(worklistGroup, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		worklistGroup = stringifyCircularObjectWithModifiedKeys(worklistGroup)

		var bodyFormData = qs.stringify({
			worklistGroup: worklistGroup
		})
		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/saveWorkGroup',
			bodyFormData,
			null,
			resultHandler || this.saveWorkListGroupSuccessResultEvent.bind(this),
			faultHandler || this.failureFaultEvent.bind(this),
			'form',
			this.getHeaderFormData()
		)
	}
	saveWorkListGroupSuccessResultEvent(event)//, token:Object=null):void
	{
		var wg = this.convertToVo(event.result, ()=>{return new IdWorklistGroup()});
		wg.workLists.forEach(wl => (wl.worklistGroup = wg))
		var workListEvent=new WorkListEvent(WorkListEvent.SAVED_SINGLE, wg)
		this.dispatchEvent(workListEvent);
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
				// formData.append('groupFlag', String(isSelected))
			}
		}

        //Changed the groupFlag to @QueryParam
		return this.callServiceMethod(
			'post',
			`IdentityHub/api/worklistsvc/loadWorklistFromSpreadsheet?groupFlag=${isSelected}`,
			formData,
			null,
			resultHandler,
			faultHandler,
			null,
			this.getHeaderData()
		)
	}

	sendRejectMailToRequestor(workListGroup /* :IdWorklistGroup */) /* :void */ {
		var bodyFormData = stringifyCircularObjectWithModifiedKeys(workListGroup)

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
			'form',
			this.getHeaderFormData()
		)
	}

	sendRejectMailSuccessResult(
		event //:ResultEvent, token:Object=null):void
	) {
		store.dispatch(
			showMessage('Requestor Email',
				'Email sent to Requestor Sucessfully!',
				'OK',
				() => { }))
	}

	sendAcceptMailToHelpDesk(
		workListGroup //:IdWorklistGroup):void
	) {
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
			'form',
			this.getHeaderFormData()
		)
		//var rpcCall:AsyncToken=this.service.sendAcceptMailToHelpDesk(workListGroup);
		//rpcCall.addResponder(new AsyncResponder(this.sendAcceptMailSuccessResult, this.failureFaultEvent));
	}

	sendAcceptMailSuccessResult(
		event //:ResultEvent, token:Object=null):void
	) {
		// alert('Email sent to Help Desk Sucessfully!') //, "Help Desk Email sent", Alert.OK)
		store.dispatch(
			showMessage('Help Desk Email sent',
				'Email sent to Help Desk Sucessfully! ',
				'OK',
				() => { }
			))
	}

	sendDocumentsToBox(
		workListId //:string):void
	) {
		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/sendDocumentsToBox',
			workListId,
			null,
			this.boxTransferSuccessResult,
			this.failureFaultEvent,
			'form',
			this.getHeaderFormData()
		)
		//var rpcCall:AsyncToken=this.service.sendDocumentsToBox(workListId);
		//rpcCall.addResponder(new AsyncResponder(this.boxTransferSuccessResult, this.failureFaultEvent));
	}

	boxTransferSuccessResult(
		event //:ResultEvent, token:Object=null):void
	) {
		toast.warning('Files Trasferred to Box Sucessfully!') //, "Bos File Transfer", Alert.OK)
	}

	failureFaultEvent(
		err //:FaultEvent, token:Object=null):void
	) {
		var msg = err.error ? err.error.message : err.toString()
		if (msg.indexOf('Aborting findWorklistGroups() as userId is') > -1) {
			toast.warning('logging out ')
			this.loginService.logOut()
		} else toast.warning(msg) //.faultString, "Error Message", Alert.OK)
	}

	findProcessedWorklistGroups(startDate, endDate, firstName, lastName, resultHandler, faultHandler) {
		var formData = qs.stringify({
			processedFromDate: startDate, 
			processedToDate: endDate, 
			firstName, 
			lastName
		})

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/worklistsvc/findProcessedWorklistGroups',
			formData,
			null,
			resultHandler, 
			faultHandler,
			'form',
			this.getHeaderFormData()
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
