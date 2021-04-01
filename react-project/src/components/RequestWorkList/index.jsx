import React, { useState } from 'react';
import './requestWork.style.scss';
import { Paper, Tab, Tabs } from '@material-ui/core';
import CurrentRequest from './CurrentRequest';


const RequestWorkList = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, value) => {
    setTab(value)
  }

  return (
    <div className="requestWork-main-container">
      <div className="changetabs">
        <Paper>
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Current Request" />
            <Tab label="Search Request" />
          </Tabs>
        </Paper>
      </div>
      { Boolean(tab === 0) && <CurrentRequest tabValue={tab} />}
    </div>
  )
}

export default RequestWorkList;