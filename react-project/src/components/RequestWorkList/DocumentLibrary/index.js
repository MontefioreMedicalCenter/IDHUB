import React, {  useRef } from 'react';
import { Button, Paper, withStyles } from '@material-ui/core';
import './DocumentLibrary.style.scss';
import DataGrid from '../../../shared/components/ExtendedDataGrid';
import { ReactDataGridColumn } from '../../../flexicious';
import Back from '../../../assets/images/back_2.png';

const styles = (theme) => ({
    gridHeader: {
        color: `${theme.palette.primary.contrastText}`,
        background: `${theme.palette.primary.main}`,
        fontWeight: "lighter !important",
    },
});

const DocumentLibrary = (props) => {
    const dataGridRef = useRef(null)

    const baseNamerenderer = (props) => {
        const row = props.row.getData();
        return (
            <span >{row.baseName}</span>
        )
    }

    const locateImage = () => {
        const ele = document.getElementById("uploaderDocs");

        if (ele) {
            //   ele.onchange = (e) => this.handleOnLocateAvatar(e, idString);
            ele.click();
        }
    };

    return (
        <div className="document-library-container">
            <Paper className="document-library-innner-container">
                <DataGrid
                    ref={dataGridRef}
                    textAlign={"center"}
                    height={"90%"}
                    width={"100%"}
                    id="Requestor_WorkList_Grid"
                    dataProvider={[]}
                    editable
                    enableCopy
                    styleName="gridStyle"
                >
                    <ReactDataGridColumn
                        headerText="File Name"
                        width={750}
                        headerAlign="center"
                        editable={false}
                        sortable={false}
                        enableCellClickRowSelect={false}
                        columnWidthMode="fixed"
                        useUnderLine
                        itemRenderer={baseNamerenderer}
                    />
                    <ReactDataGridColumn
                        textAlign="right"
                        enableIcon
                        paddingRight={20}
                        iconRight={5}
                        iconHandCursor
                    />
                </DataGrid>
            </Paper>
            <div className="upload-container">
                <span className="upload-text">Upload File:</span>
                <div className="upload-file-name" onClick={locateImage}>browse...</div>
                <input
                    id="uploaderDocs"
                    accept={".doc, .docx, .pdf, .ppt, .pptx, .xls, .xlsx"}
                    style={{ display: "none" }}
                    type="file"
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<img src={Back} alt="no-img" />}
                > Upload </Button>
            </div>
        </div>

    )
}

export default (withStyles(styles, { withTheme: true })(DocumentLibrary));