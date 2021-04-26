export const LOOKUP_SUCCESSFULL = 'LOOKUP_SUCCESSFULL'
export const SET_DOCUMENT_LIBRARY = 'SET_DOCUMENT_LIBRARY'
export const SET_TAB_VALUE = 'SET_TAB_VALUE'

export const saveLookupData = data => dispatch => {
	dispatch({
		type: LOOKUP_SUCCESSFULL,
		payload: data
	})
}

export const setDocumentLibrary = data => dispatch => {
	dispatch({
		type: SET_DOCUMENT_LIBRARY,
		payload: data
	})
}

export const setTabValue = value => dispatch => {
	dispatch({
		type: SET_TAB_VALUE,
		payload: value
	})
}
