import React, { useState } from 'react';
import './requestWork.style.scss';
import DataGrid from '../../shared/components/ExtendedDataGrid';
import { ReactDataGridColumn } from '../../flexicious';
import { Paper, Tab, Tabs } from '@material-ui/core';

const RequestWorkList = () => {

  const [tab, setTab] = useState(0)
  const dataProvider = [
    { column1: "Row1-Column1", column2: "Row1-Column2", column3: "Row1-Column3", column4: "Row1-Column4", },
    { column1: "Row2-Column1", column2: "Row2-Column2", column3: "Row2-Column3", column4: "Row2-Column4", },
    { column1: "Row3-Column1", column2: "Row3-Column2", column3: "Row3-Column3", column4: "Row3-Column4", },
    { column1: "Row4-Column1", column2: "Row4-Column2", column3: "Row4-Column3", column4: "Row4-Column4", },
  ]

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
      {Boolean(tab === 0) && <div className="grid-container">
        <DataGrid
          textAlign={"center"}
          height={"100%"}
          width={"100%"}
          id="Requestor_WorkList_Grid"
          dataProvider={dataProvider}
        >
          <ReactDataGridColumn
            headerAlign="center"
            dataField="column1"
            headerText={"Column1"}
            Width={300}
          />
          <ReactDataGridColumn
            headerAlign="center"
            dataField="column2"
            headerText={"Column2"}
            Width={300}
          />
          <ReactDataGridColumn
            headerAlign="center"
            dataField="column3"
            headerText={"Column3"}
            Width={300}
          />
          <ReactDataGridColumn
            headerAlign="center"
            dataField="column4"
            headerText={"Column4"}
            Width={300}
          />
        </DataGrid>
      </div>}
    </div>
  )
}

export default RequestWorkList;