import ServiceProxyBase from './ServiceProxyBase'
export default class BoxService extends ServiceProxyBase {
	constructor(props) {
		super(props)
		this.source = ''
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
