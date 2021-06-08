import { camelCase } from 'lodash'
import moment from "moment"
import ArrayCollection from '../../vo/ArrayCollection'

export const deepCopy = data => {
	// deep copy
	if ([null, undefined].includes(data)) {
		return null
	}
	return JSON.parse(JSON.stringify(data))
}

export const validateEmail = (value = "") => {
	const errorObject = {
	  isError: false,
	  errorMessage: "",
	};
	
	if (value) {
	  if (value.replace(/[^@]/g, "").length > 1) {
		errorObject.isError = true;
		errorObject.errorMessage = "Your e-mail address Contains too many @ characters";
		// eslint-disable-next-line
	  } else if (value.match(/[~!#$^&*\s(=[}{)\]<>,\/:;'\"|\\`]/gim)) {
		errorObject.isError = true;
		errorObject.errorMessage = "Your e-mail address contains invalid characters";
	  } else if (!value.match(/[A-Z0-9._%+-]+@/gim)) {
		errorObject.isError = true;
		errorObject.errorMessage = "An at (@) sign is missing in your Email Address";
	  } else if (!value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\./gim)) {
		errorObject.isError = true;
		errorObject.errorMessage =
		"The Domain in your e-mail address is missing a period";
	  } else if(value.match(/(([A-Z0-9._%+-]+@[A-Z0-9-]\.[.]+\.[.])|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[.]))/gim)) {
		errorObject.isError = true;
		errorObject.errorMessage =
		"The Domain in your e-mail address has consecutive periods";
	  } else if(!value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/gim)) {
		errorObject.isError = true;
		errorObject.errorMessage =
		"The Domain in your e-mail address is missing a top level domain";
	  }
	}
  
	return errorObject;
  }

export const toUintColorCode = colorStr => {
	if (colorStr) {
		if (colorStr.indexOf('#') === 0) {
			colorStr = colorStr.replace(/^#/, '')
			if (colorStr.length === 3) {
				const d = colorStr.split('')
				colorStr = d[0] + d[0] + d[1] + d[1] + d[2] + d[2]
			}
			return parseInt(colorStr, 16)
		} else {
			const rgb = colorStr.match(
				/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
			) // rgb/rgba
			if (rgb && rgb.length === 4) {
				return (
					(parseInt(rgb[0]) << 16) | (parseInt(rgb[1]) << 8) | parseInt(rgb[2])
				)
			}
		}
	}

	throw new Error('Not a valid html color code!')
}

export const authenticate = () => {
	const data = localStorage.getItem('loginModel')
	return Boolean(data)
}

export const getActiveLookup = (lkup) => {
	var activelookup=new ArrayCollection();
	lkup.forEach((lookupobject) => {
		if (lookupobject.activeFlag === 1)
		{
			activelookup.addItem(lookupobject)
		}
	})
	return activelookup;
}
export const getRowHeight = (item, level) => {
	const columnElement = document.createElement("div");
	const height = [];

	document.body.appendChild(columnElement);

	columnElement.style.height = "auto";
	columnElement.style.width = "initial";
	columnElement.style.fontSize = "13px";

	level.grid.getColumns().forEach((select, index) => {
		const col = level.grid.getColumns()[index];
		columnElement.innerHTML = item.additionalComments;
		columnElement.style.width = col.getWidth() - 150 + "px";
		height.push(columnElement.offsetHeight);
	});

	document.body.removeChild(columnElement);

	const maximumHeight =  Math.max(...height);
	const defaultRowHeight = level.grid.getRowHeight();

	if (maximumHeight <= defaultRowHeight) {
		return defaultRowHeight;
	} else {
		return maximumHeight;
	}
}
export const camelizeKeys = obj => {
	if (Array.isArray(obj)) {
		return obj.map(v => camelizeKeys(v))
	} else if (obj !== null && obj.constructor === Object) {
		return Object.keys(obj).reduce(
			(result, key) => ({
				...result,
				[camelCase(key)]: camelizeKeys(obj[key])
			}),
			{}
		)
	}
	return obj
}

export const modifyKeys = (obj) => {
	Object.keys(obj).forEach(key => {
		if (key.charAt(0) === "_") {
			obj[`${key.substring(1)}`] = obj[key];
			delete obj[key];
			if (typeof obj[`${key.substring(1)}`] === "object" && obj[`${key.substring(1)}`]) {
				if (obj[`${key.substring(1)}`].length) {
					obj[`${key.substring(1)}`].forEach((data) => {
						modifyKeys(data);
					})
				} else modifyKeys(obj[`${key.substring(1)}`]);
			}
		}
	});
}
const nullOutWorkGroup = (wg)=>{
	wg.workLists.forEach(wl=>wl.worklistGroup = null);
}
const resetWorkGroup = (wg)=>{
	wg.workLists.forEach(wl=>wl.worklistGroup = wg);
}
export const stringifyCircularObjectWithModifiedKeys = (selectedRequest) => {
	let savedWls=null;
	if(selectedRequest.constructorName === "IdWorklist"){
		savedWls=selectedRequest.worklistGroup.workLists;
		selectedRequest.worklistGroup.workLists = [];
	} else if(selectedRequest.constructorName === "IdWorklistGroup"){
		nullOutWorkGroup(selectedRequest);
	}
	const data = JSON.parse(JSON.stringify(selectedRequest, function (
		key,
		value
	) {
		if (value && (key.endsWith('Date') || key.indexOf( 'dateOfBirth') >= 0)) {
			return moment(new Date(value)).format("yyyy-MM-DD HH:mm:ss")
		} else {
			return value
		}
	}))
	modifyKeys(data)
	const returnvalue =  JSON.stringify(data);
	if(selectedRequest.constructorName === "IdWorklist"){
		selectedRequest.worklistGroup.workLists = savedWls;
	} else if(selectedRequest.constructorName === "IdWorklistGroup"){
		resetWorkGroup(selectedRequest);
	}
	return returnvalue;
	
}
