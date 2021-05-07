import React from 'react'
import '../admin.style.scss'
import DataGrid from '../../../../../shared/components/ExtendedDataGrid';
// import ExampleUtils from '../../../../utils/ExampleUtils';
import {
    ExtendedExportController,
    FlexDataGridEvent,
    ReactDataGridColumn,
    ReactDataGridColumnLevel,
} from '../../../../../flexicious';
import MontefioreUtils from '../../../../../service/utils/MontefioreUtils';
import IdTitleAdminEvent from "../../../../../events/IdTitleAdminEvent.ts"
import InActive from '../../../../../assets/images/Edit-inactive.png'
import Active from '../../../../../assets/images/Edit-active.png'
import saveB from '../../../../../assets/images/saveB.png'
import deleteIcon from '../../../../../assets/images/delete.png'


import { toast } from 'react-toastify'
import { ToolbarAction } from '../../../../../flexicious';
import IdTitle from '../../../../../vo/admin/IdTitle';
import ExampleUtils from '../../../../../utils/ExampleUtils';
import TitleMediator from '../../../Mediators/TitleMediator.ts';

const isCellEditable = (cell) => {
    return cell.rowInfo.getData().edit === true
}


const dynamicIconFunction = (cell/**/) => {
    if(!cell.rowInfo.getIsDataRow()) return null;
    var data = cell.rowInfo.getData();
    if (data == null) return null;
    var ret;
    if (data.edit === true) ret = Active;
    else ret = InActive;
    return ret;

}


const dateLabel = (item, col) => {
    var dateStr/*:String*/ = ''
    if (item != null) {
        if (item.updateDate != null && col.dataField === "updateDate")
            dateStr = ExampleUtils.dateFormatter5.format(item.updateDate)
        if (item.createDate != null && col.dataField === "createDate")
            dateStr = ExampleUtils.dateFormatter5.format(item.createDate)
    }
    return dateStr;
}
const gridIconClick = (evt) => {
    evt.column.iconClick(evt.item);
}
const getSaveB = (cell) => { return cell.rowInfo.getIsDataRow()? saveB : null};
const getDeleteIcon = (cell) => { return cell.rowInfo.getIsDataRow()?  deleteIcon : null };

export default class TitleModifier extends React.Component {
    constructor(props) {
        super(props);
        this.keeper = "";
        this.lastN = 0;
        this.grid = null;
        this._indEdit/*:int*/ = -1;
    }
    componentDidMount() {
        this.mediator = new TitleMediator().onRegister(this.grid);
        this.grid.addEventListener(this, FlexDataGridEvent.ICON_CLICK, gridIconClick);
    }
    componentWillUnmount() {
        this.grid.removeEventListener(FlexDataGridEvent.ICON_CLICK, gridIconClick);
        this.mediator.onUnRegister();

    }
    onEdit(data) {
        var grid = this.grid;
        var idx = null;/* :IdTitle; */
        var gridDP = this.grid.getDataProvider();

        if (data.edit && this._indEdit === (gridDP).getItemIndex(data)) {
            MontefioreUtils.showConfirm("Are you sure you want to cancel your changes?", "Confirm Cancel", MontefioreUtils.YES | MontefioreUtils.NO, this, (event) => {
                if (event.detail === MontefioreUtils.YES) {
                    //Alert.show("Trigger delete on the backend")
                    idx = gridDP.getItemAt(this._indEdit);
                    if (this._indEdit === 0 && idx.titleId >= this.lastN) {
                        gridDP.removeItemAt(0);
                    }
                    else {
                        idx.titleName = this.keeper;
                        gridDP.setItemAt(idx, this._indEdit);
                    }
                    data.edit = false;
                    this._indEdit = -1;
                    grid.refreshCells();
                    return;
                    //dispatchEvent(new AccountClassAdminEvent(AccountClassAdminEvent.GET, data));
                } else if (event.detail === MontefioreUtils.NO) {
                    //Alert.show("Cancel the delete.")
                }
            })
        } else {

            if (this._indEdit < 0) {
                data.edit = true
                this._indEdit = (this.grid.getDataProvider()).getItemIndex(data);
                this.keeper = (gridDP.getItemAt(this._indEdit)).titleName;
            }
            else
                toast.warning("Please save the row previously being edited first !")
        }
        this.grid.refreshCells();


    }

    onToolbarExport() {
        ExtendedExportController.instance().export(this.grid);
    }




    vbox1_creationCompleteHandler(event) {
        this.grid.toolbarActions.addItem(new ToolbarAction("Add", -1, "", "Add Record", "org/monte/edi/idhub/assets/img/add.png", false, true));
    }

    onDelete(data) {
        var grid = this.grid;
        var gridDP = grid.getDataProvider()
        var index = gridDP.getItemIndex(data)

        MontefioreUtils.showConfirm("Are you sure you want to delete this item?", "Confirm Delete", MontefioreUtils.OK | MontefioreUtils.CANCEL, this, (event) => {



            if (event.detail === MontefioreUtils.OK) {
                if (data.titleId === -1) {
                    gridDP.removeItemAt(index)
                }
                else {

                    grid.dispatchEvent(new IdTitleAdminEvent(IdTitleAdminEvent.DELETE, data));

                }
                //Alert.show("Trigger delete on the backend")
            }
            else if (event.detail === MontefioreUtils.NO) {
                alert("Cancel the delete.")
            }
        })
        return true;
    }

    onSave(data) {
        if (data.titleName != null) {
            this.grid.dispatchEvent(new IdTitleAdminEvent(IdTitleAdminEvent.SAVE, data));

            this.editable = true
            data.edit = false;
            this._indEdit = -1;
            this.grid.cellEditableFunction = isCellEditable;
            this.grid.refreshCells();
        }


        return false;
    }

    onExecuteToolbarAction(action) {
        if (action.code === "Add") {
            var gridDP = this.grid.getDataProvider()
            var title = new IdTitle();
            title.titleId = "-1"
            title.activeFlag = 1
            title.edit = true;
            gridDP.addItemAt(title, 0);
            this.grid.refreshCells()
        }
        else
            alert("Invalid action!")
    }

    validateTitle(editor) {
        var grid = this.grid;
        var valSuccess = false;
        var cell = grid.getCurrentEditingCell();
        var txt = editor;
        grid.clearErrorByObject(cell.rowInfo.data);

        if (txt.getValue().length < 1) {
            grid.setErrorByObject(cell.rowInfo.getData(), cell.getColumn().dataField, "Missing required field :Name");
            valSuccess = false;
        }
        else {

            valSuccess = true;
        }

        //If you return true, the grid will highlight the error in red and move on to the next row. 
        //If you return false, the edit box would stay in place and not let the user move forward 
        //unless the error is corrected.
        return valSuccess;
    }

    render() {
        return (
            <DataGrid id="grid" ref={g => this.grid = g} width="100%" height="100%" editable cellEditableFunction={isCellEditable} enableCopy enableEagerDraw enableExport styleName="gridStyle" enableToolbarActions toolbarActionExecutedFunction={this.onExecuteToolbarAction.bind(this)}
                toolbarExcelHandlerFunction={this.onToolbarExport.bind(this)}>
                <ReactDataGridColumnLevel rowHeight="21" enableFilters enablePaging pageSize="50">
                    <ReactDataGridColumn width="100" columnWidthMode="fitToContent" dataField="titleId" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Title Id" itemEditorApplyOnValueCommit />
                    <ReactDataGridColumn width="100" columnWidthMode="fitToContent" dataField="titleName" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Title Name" itemEditorApplyOnValueCommit itemEditorValidatorFunction={this.validateTitle.bind(this)} />
                    <ReactDataGridColumn headerText="Active" editable={false}>
                        {/* <nestedtreedatagrid:itemRenderer>
                                    <fx:Component>
                                        <mx:HBox width="100%" horizontalAlign="center" horizontalScrollPolicy="off">
                                            <s:CheckBox id="activeChkBox" enabled="{data.edit}" selected="{data.activeFlag==1?true:false}"  click="if(data.activeFlag==0) data.activeFlag=1 else data.activeFlag=0" styleName="checkBoxStyle"/>
                                        </mx:HBox>
                                    </fx:Component>
                                </nestedtreedatagrid:itemRenderer>
                                 */}
                    </ReactDataGridColumn>
                    <ReactDataGridColumn width="100" columnWidthMode="fitToContent" dataField="createDate" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Create Date" itemEditorApplyOnValueCommit labelFunction={dateLabel} editable={false} />
                    <ReactDataGridColumn width="150" columnWidthMode="fitToContent" dataField="updateDate" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Updated Date" itemEditorApplyOnValueCommit labelFunction={dateLabel} editable={false} />
                    <ReactDataGridColumn width="100" columnWidthMode="fitToContent" dataField="updatedBy" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Updated By" itemEditorApplyOnValueCommit editable={false} />
                    <ReactDataGridColumn headerText="Edit" width="30" editable={false} excludeFromExport
                        iconHandCursor enableIcon iconFunction={dynamicIconFunction} iconClick={this.onEdit.bind(this)}>
                    </ReactDataGridColumn>
                    <ReactDataGridColumn headerText="Delete" width="30" excludeFromExport editable={false}
                        iconHandCursor enableIcon iconFunction={getDeleteIcon} iconClick={this.onDelete.bind(this)}>
                    </ReactDataGridColumn>
                    <ReactDataGridColumn headerText="Save" width="30" excludeFromExport editable={false}
                        iconHandCursor enableIcon iconFunction={getSaveB} iconClick={this.onSave.bind(this)}>
                    </ReactDataGridColumn>
                </ReactDataGridColumnLevel>
            </DataGrid>);
    }
}
