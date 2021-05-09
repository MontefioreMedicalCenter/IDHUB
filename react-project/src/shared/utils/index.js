import { camelCase } from 'lodash'
import moment from "moment"

export const deepCopy = data => {
	// deep copy
	if ([null, undefined].includes(data)) {
		return null
	}
	return JSON.parse(JSON.stringify(data))
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

export const stringifyCircularObjectWithModifiedKeys = (selectedRequest) => {

	const data = JSON.parse(JSON.stringify(selectedRequest, function (
		key,
		value
	) {
		if (key === '_worklistGroup') {
			return value.worklistId
		} else if (value && (key.endsWith('Date') || key.indexOf( 'dateOfBirth') >= 0)) {
			return moment(new Date(value)).format("yyyy-MM-DD HH:mm:ss")
		} else {
			return value
		}
	}))
	modifyKeys(data)
	return JSON.stringify(data)
}
