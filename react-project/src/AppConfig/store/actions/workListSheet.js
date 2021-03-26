export const LOOKUP_SUCCESSFULL = 'LOOKUP_SUCCESSFULL';

export const saveLookupData = (data) => dispatch => {
    dispatch({
        type: LOOKUP_SUCCESSFULL,
        payload: data
    })
}