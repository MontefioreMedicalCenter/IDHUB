import ServiceProxyBase from './ServiceProxyBase'
export default class BoxService extends ServiceProxyBase {
	constructor(props) {
		super(props)
		this.source = ''
	}
	

	sendDocumentsToBox(workListId, resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = (msg)=>{
			if(msg.indexOf("The process cannot access the file because it is being used by another process") < 0){
				alert(msg)
			}else{
				alert("Confirm with montefiore? File has been sent to Box !" + msg)
			}
		}
		if (typeof resultHandler == 'undefined') resultHandler = ()=>{alert("Files Transferred to Box Sucessfully!")}
		
		return this.callServiceMethod(
			'get',
			'IdentityHub/api/boxsvc/uploadFile',
			null,
			null,
			resultHandler,
			faultHandler
		)
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
