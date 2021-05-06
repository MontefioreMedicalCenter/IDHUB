import React  from 'react'
import '../admin.style.scss'
import DataGrid from '../../../../../shared/components/ExtendedDataGrid';
// import ExampleUtils from '../../../../utils/ExampleUtils';
import {
    FlexDataGridEvent,
    ReactDataGridColumn,
    ReactDataGridColumnLevel,
} from '../../../../../flexicious';
import MontefioreUtils from '../../../../../service/utils/MontefioreUtils';
import IdDepartmentAdminEvent from "../../../../../events/IdDepartmentAdminEvent.ts"
import InActive from '../../../../../assets/images/Edit-inactive.png'
import Active from '../../../../../assets/images/Edit-active.png'
import saveB from '../../../../../assets/images/saveB.png'
import deleteIcon from '../../../../../assets/images/delete.png'


import { toast } from 'react-toastify'
import { ToolbarAction } from '../../../../../flexicious';
import IdDepartment from '../../../../../vo/admin/IdDepartment';
import ExampleUtils from '../../../../../utils/ExampleUtils';
import IdDepartmentMediator from '../../../Mediators/IdDepartmentMediator.ts';

const isCellEditable = (cell) => {
    return cell.rowInfo.getData().edit === true
}


const dynamicIconFunction = (data/*:Object*/) => {
    if (data == null) return null;
    var ret;
    if (data.edit === true) ret = Active;
    else ret = InActive;
    return ret;

}

const gridIconClick = (evt) => {
    evt.column.iconClick(evt.item);
}
const getSaveB = () => { return saveB };
const getDeleteIcon = () => { return deleteIcon };


const dateLabel = (item/*:Object*/, col/*:FlexDataGridColumn*/, cell/*:IFlexDataGridCell*/ = null) =>/*:String*/ {
    var dateStr/*:String*/ = ''
    if (item != null) {
        if (item.updateDate != null && col.dataField === "updateDate")
            dateStr = ExampleUtils.dateFormatter5.format(item.updateDate)
        if (item.createDate != null && col.dataField === "createDate")
            dateStr = ExampleUtils.dateFormatter5.format(item.createDate)
    }
    return dateStr;
}
export default class IdDepartmentModifier extends React.Component {
    constructor(props) {
        super(props);
        this.keeper = "";
        this.astN = 0;
        this.grid = null;

        this._indEdit/*:int*/ = -1;

    }
    componentDidMount() {
        this.mediator = new IdDepartmentMediator().onRegister(this.grid);
        this.grid.addEventListener(this, FlexDataGridEvent.ICON_CLICK, gridIconClick);
    }
    componentWillUnmount() {
        this.grid.removeEventListener(FlexDataGridEvent.ICON_CLICK, gridIconClick);
        this.mediator.onUnRegister();

    }
    onEdit(data/*:Object*/) {
        var idx/*:IdDepartment*/;
        var gridDP/*:ArrayCollection*/ = this.grid.getDataProvider();
        if (data.edit && this._indEdit === (this.grid.getDataProvider()).getItemIndex(data)) {
            MontefioreUtils.showConfirm("Are you sure you want to cancel your changes?", "Confirm Cancel", MontefioreUtils.YES | MontefioreUtils.NO, this,
                (event) => {
                    if (event.detail === MontefioreUtils.YES) {
                        idx = gridDP.getItemAt(this._indEdit);
                        if (this._indEdit === 0 && idx.departmentId >= this.lastN) {
                            gridDP.removeItemAt(0);
                        }
                        else {
                            idx.departmentName = this.keeper;
                            gridDP.setItemAt(idx, this._indEdit);
                        }
                        data.edit = false;
                        this._indEdit = -1;
                        this.grid.refreshCells();
                        return;

                    } else if (event.detail === MontefioreUtils.NO) {
                    }
                })
        } else {
            if (this._indEdit < 0) {
                data.edit = true;
                data.updateDate = new Date();
                this._indEdit = (this.grid.getDataProvider()).getItemIndex(data);
                this.keeper = (gridDP.getItemAt(this._indEdit)).departmentName;
            }
            else
                toast.warning("Please save the row previously being edited first !")
        }
        this.grid.refreshCells();
    }

    vbox1_creationCompleteHandler() {
        this.grid.toolbarActions.addItem(new ToolbarAction("Add Department", -1, "", "Add Department", "org/monte/edi/idhub/assets/img/add.png", false, true));
    }

    onExecuteToolbarAction(action) {

        if (action.code === "Add Department") {
            if (this._indEdit >= 0) {
                alert("Please save the row previously being edited first !");
                return;
            }
            this._indEdit = -10;

            var gridDP/*:ArrayCollection*/ = this.grid.getDataProvider()
            var idDepartmentClass/*:IdDepartment*/ = new IdDepartment();
            idDepartmentClass.edit = true;
            var lastRow/*:IdDepartment*/ = gridDP.getItemAt(gridDP.length - 1);
            //var maxAcId/*:int*/ = lastRow.departmentId;
            idDepartmentClass.departmentId = lastRow.departmentId + 1;
            idDepartmentClass.createDate = new Date();
            idDepartmentClass.updateDate = new Date();
            idDepartmentClass.activeFlag = 1;
            this._indEdit = 0;
            gridDP.addItemAt(idDepartmentClass, 0);
            this.lastN = lastRow.departmentId + 1;
            this.grid.refreshCells()
        }
        else
            alert("Invalid action!")
    }


    onDelete(data/*:Object*/)/*:Boolean*/ {
        MontefioreUtils.showConfirm("Are you sure you want to delete this item?", "Confirm Delete", MontefioreUtils.OK
            | MontefioreUtils.CANCEL, this,
            (event) => {
                if (event.detail === MontefioreUtils.OK) {
                    this.lastN = 0;
                    this._indEdit = -1;
                    this.grid.dispatchEvent(new IdDepartmentAdminEvent(IdDepartmentAdminEvent.DELETE, data));
                    this.grid.refreshCells();
                }
                else if (event.detail === MontefioreUtils.CANCEL) {
                    alert("Cancel the delete.")
                }
            })
        return true;
    }

    onSave(data/*:Object*/)/*:Boolean*/ {
        if (data.departmentName != null) {

            data.edit = false;
            this._indEdit = -1;
            this.grid.dispatchEvent(new IdDepartmentAdminEvent(IdDepartmentAdminEvent.SAVE, data));
            this.grid.refreshCells();
        }
        return false;
    }

    // const checkId=(data/*:Object*/)=>/*:Boolean*/ {
    //     var oid/*:Number*/ = (data).departmentId;
    //     if (lastN==0 || oid<=lastN)
    //         return true;
    //     else
    //         return false;
    // }
    validatedept(editor/*:UIComponent*/)/*:Boolean*/ {
        var valSuccess/*:Boolean*/ = false;
        var cell/*:IFlexDataGridCell*/ = this.grid.getCurrentEditingCell();
        var txt = editor;
        this.grid.clearErrorByObject(cell.rowInfo.getData());

        if (txt.text.length < 1) {
            this.grid.setErrorByObject(cell.rowInfo.getData(), cell.getColumn().dataField, "Missing required field :Name");
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
            <DataGrid id="grid" ref={g => this.grid = g} width="100%" height="100%" enableEagerDraw="true" enablePaging="true" enableToolbarActions="true" horizontalScrollPolicy="auto" styleName="gridStyle" toolbarActionExecutedFunction={this.onExecuteToolbarAction.bind(this)} creationComplete={this.vbox1_creationCompleteHandler.bind(this)} editable="true" cellEditableFunction={isCellEditable} enableCopy="true" enableExport="true">
                <ReactDataGridColumnLevel rowHeight="21" enableFilters="true" enablePaging="true" pageSize="50">
                    <ReactDataGridColumn width="100" columnWidthMode="fitToContent" dataField="departmentId" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Department ID" itemEditorApplyOnValueCommit="true" editable={false} />
                    <ReactDataGridColumn width="350" columnWidthMode="fitToContent" dataField="departmentName" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Department Name" itemEditorApplyOnValueCommit="true" itemEditorValidatorFunction={this.validatedept.bind(this)} />
                    <ReactDataGridColumn headerText="Active" editable={false} enableCellClickRowSelect={false}>
                        {/* <nestedtreedatagrid:itemRenderer>
                            
                            <fx:Component>
                                <mx:HBox width="100%" horizontalAlign="center" >
                                    <s:CheckBox id="activeChkBox" enabled="{data.edit}" selected="{data.activeFlag==1?true:false}"  click="if(data.activeFlag==0) data.activeFlag=1 else data.activeFlag=0" styleName="checkBoxStyle"/>
                                </mx:HBox>
                            </fx:Component>
                            
                        </nestedtreedatagrid:itemRenderer> */}
                    </ReactDataGridColumn>
                    <ReactDataGridColumn width="100" dataField="createDate" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Create Date" labelFunction={dateLabel} editable={false} />
                    <ReactDataGridColumn width="100" dataField="updateDate" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Update Date" labelFunction={dateLabel} editable={false} />
                    <ReactDataGridColumn width="100" dataField="updatedBy" enableCellClickRowSelect={false} filterControl="TextInput" filterOperation="Contains" headerText="Updated By" editable={false} />

                    <ReactDataGridColumn headerText="Edit" width="50" excludeFromExport="true" editable={false}
                        iconFunction={dynamicIconFunction} iconHandCursor enableIcon iconClick={this.onEdit.bind(this)}>
                    </ReactDataGridColumn>
                    <ReactDataGridColumn headerText="Delete" width="50" excludeFromExport="true" editable={false}
                        enableIcon iconFunction={getDeleteIcon} iconHandCursor iconClick={this.onDelete.bind(this)}>
                    </ReactDataGridColumn>
                    <ReactDataGridColumn headerText="Save" width="50" excludeFromExport="true" editable={false}
                        iconFunction={getSaveB} iconHandCursor enableIcon iconClick={this.onSave.bind(this)}>
                    </ReactDataGridColumn>
                </ReactDataGridColumnLevel>
            </DataGrid>
        )
    }
}
