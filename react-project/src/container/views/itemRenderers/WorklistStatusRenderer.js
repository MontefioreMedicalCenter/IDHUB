import { Button } from '@material-ui/core'
import React from 'react'
import dialog_warning from '../../../assets/images/dialog_warning.png'


const WorklistStatusRenderer = (props) => {
    const selectedRequest = props.cell.rowInfo.getIsDataRow()
    const sendRequest = props.cell.rowInfo.getIsDataRow() && props.cell.level.getNestDepth()

    if (sendRequest !== 1 || selectedRequest) {
        const statusList = (props.cell.rowInfo.getData().worklistStatus)
        if (statusList === "OnHold") {
            return (
                <div>
                    {statusList}
                    <Button>
                        <img
                            id="dialog_warning"
                            alt="dialog_warning"
                            src={dialog_warning}
                        />
                    </Button>
                </div>
            )
        }
        else {
            return (statusList)
        }
    } return null
}

export default WorklistStatusRenderer