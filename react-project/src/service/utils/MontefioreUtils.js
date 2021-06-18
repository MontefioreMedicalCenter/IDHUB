import moment from 'moment'
import { ClassFactory, DateFormatter, FlexDataGridEvent, UIUtils } from '../../flexicious'
import { toast } from 'react-toastify'
import Pager from "../../shared/components/PagerControlAs"
const MontefioreUtils = () => {}
const formatter = (item, dataField, formatString) => {
	const dateFormatter = new DateFormatter()

	if (item[dataField] instanceof Date) {
		return dateFormatter.format(item.Start_Date)
	} else if (typeof item[dataField] === 'string') {
		let dateStr = item[dataField]
		if (dateStr.length > 10) {
			dateStr = dateStr.slice(0, 10)
		}

		if (dateStr.includes('-')) {
			const newStrArray = dateStr.split('-')
			dateStr = `${newStrArray[1]}/${newStrArray[2]}/${newStrArray[0]}`
		}
		return dateFormatter.format(moment(dateStr, formatString).toDate())
	} else {
		return UIUtils.toString(item[dataField])
	}
}
MontefioreUtils.showError = err => {
	if(err.error && err.error.message === "Request aborted") return ;
	if(err.error && err.error.response && err.error.response.data && err.error.response.data.reason) {
		toast.error('Error: ' + (err.error ? err.error.response.data.reason : err.toString()))
	} else {
		toast.error('Error: ' + (err.error ? err.error.message : err.toString()))
	}
}
MontefioreUtils.dateFormatter2 = (item, { dataField }) => {
	return formatter(item, dataField, 'MMM D, YYYY')
}
MontefioreUtils.dateFormatter3 = (item, { dataField }) => {
	return formatter(item, dataField, 'MM/DD/YY')
}
MontefioreUtils.globalDateFormatter = (item, { dataField }) => {
	return formatter(item, dataField, 'MM/DD/YY K:NN A')
}
MontefioreUtils.OK = "OK";
MontefioreUtils.YES = "OK";
MontefioreUtils.CANCEL = "Cancel";
MontefioreUtils.NO = "Cancel";
MontefioreUtils.showConfirm = (msg, title, flags, binder, callback) => {
	callback = callback.bind(binder);
	if(window.confirm(msg)){
		callback(new DialogEvent(MontefioreUtils.OK));
	} else {
		callback(new DialogEvent(MontefioreUtils.CANCEL));
	}
}
MontefioreUtils.placeIcon = (cell, icon) => {
	icon.move(8,12);
}
MontefioreUtils.pagerFactory = new ClassFactory(Pager)
class DialogEvent extends FlexDataGridEvent {
	constructor(detail){
		super("DialogEvent");
		this.detail=detail;
	}
}
export default MontefioreUtils
