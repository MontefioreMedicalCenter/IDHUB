import ServiceProxyBase from './ServiceProxyBase'
import qs from 'qs'
import { showMessage } from '../../AppConfig/store/actions/homeAction'
import store from '../../AppConfig/store/configureStore'

export default class BoxService extends ServiceProxyBase {
	constructor(props) {
		super(props)
		this.source = ''
	}
	

	sendDocumentsToBox(workListId, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = (msg)=>{
			if(msg.error)msg=JSON.stringify(msg.error);
			if(msg.indexOf("The process cannot access the file because it is being used by another process") < 0){
				alert(msg)
			}else{
				alert("Confirm with montefiore? File has been sent to Box !" + msg)
			}
		}
		if (typeof resultHandler == 'undefined') resultHandler = ()=>{
			store.dispatch(
				showMessage('Success',
                    'Files Transferred to Box Sucessfully!',
                    'OK',
                    () => {}))
		}
		var bodyFormData = qs.stringify({
			worklistId: workListId
		})
		return this.callServiceMethod(
			'post',
			'IdentityHub/api/boxsvc/uploadFile',
			bodyFormData,
			null,
			resultHandler,
			faultHandler,
			'form'
		);
	}
}


BoxService.prototype.typeName = BoxService.typeName =
	'BoxService' //for quick inspection
	BoxService.instance = null
	BoxService.getInstance = () => {
	if (BoxService.instance == null) {
		BoxService.instance = new BoxService()
	}
	return BoxService.instance
}
