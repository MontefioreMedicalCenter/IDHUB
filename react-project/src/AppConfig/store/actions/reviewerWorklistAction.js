export const POP_UP = 'POP_UP'
export const STORE_WORKLIST = 'STORE_WORKLIST'

export const reviewerWorklistData = (data) => dispatch => {
    dispatch({
        type:POP_UP,
        payload: data
    })
} 

export const storeWorklist = (data) => dispatch => {
    dispatch({
        type:STORE_WORKLIST,
        payload: data
    })
} 