import React, { useState } from 'react'
import MaterialDatePicker from '../../../shared/components/ExtendedDataGrid/material/adapter/datepicker/MaterialDatePicker'
import './dateFilter.scss'
import { Button, Checkbox } from '@material-ui/core'


const DateFilter = (props) => {
    const [groupCheckbox, setGroupCheckbox] = useState(true)

    return (
        <div className="upload-container">
            <div className="upload-inner-container">
                Processed Date &nbsp;
                From: <MaterialDatePicker
                    keyboard
                    color=" "
                    format={'DD/MM/YYYY'}
                    InputProps={{
                        inputProps: {
                            style: {
                                height: '30px',
                                padding: '5px',
                                width: '75px',
                                fontSize: 'small'
                            }
                        }
                    }}
                    style={{
                        minWidth: 100
                    }}
                />&nbsp;
                To: <MaterialDatePicker
                    keyboard
                    color=" "
                    format={'DD/MM/YYYY'}
                    InputProps={{
                        inputProps: {
                            style: {
                                height: '30px',
                                padding: '5px',
                                width: '75px',
                                fontSize: 'small'
                            }
                        }
                    }}
                    style={{
                        minWidth: 100
                    }}
                />&nbsp;
                First Name &nbsp;<input type="text" style={{ width: "70px" }} />&nbsp;
                Last Name &nbsp;<input type="text" style={{ width: "70px" }} />&nbsp;
                Processed {' '}
                <Checkbox
                    size="small"
                    color="primary"
                    checked={groupCheckbox}
                    onChange={(e, value) => {
                        setGroupCheckbox(value)
                    }}
                />{' '}
            </div>
            <div className="button">
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ maxWidth: '30px', height: '20px', fontSize: 'xx-small' }}>
                    Search
				</Button>&nbsp;
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ maxWidth: '30px', height: '20px', fontSize: 'xx-small' }}>
                    Clear
				</Button>
            </div>
        </div>
    )
}

export default DateFilter
