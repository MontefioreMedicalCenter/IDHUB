import * as React from 'react'
import ArrayCollection from '../../../../vo/ArrayCollection';
// import Edit from "../../../../assets/images/Edit-active.png"
// import InActive from '../../../../assets/images/Edit-inactive.png'
import './userModifier.style.scss';

import {
    ReactDataGridColumn,
    ReactDataGridColumnGroup,
    ReactDataGridColumnLevel,
    UIComponent,
    ClassFactory,
    ExtendedExportController
} from '../../../../flexicious';

import DataGrid from '../../../../shared/components/ExtendedDataGrid';
import ExampleUtils from '../../../../utils/ExampleUtils';

import AdminEditEvent from '../../../../events/AdminEditEvent.ts';
import ManageUserEvent from '../../../../events/ManageUserEvent.ts';
import UserMediator from '../../Mediators/UserMediator.ts';
import Save from '../../../../container/views/itemRenderers/Save';
import Remove from '../../../../container/views/itemRenderers/Remove';
import Edit from '../../../../container/views/itemRenderers/Edit';
import ActiveRenderer from '../../../../container/views/itemRenderers/ActiveRenderer';
import StyledPagerRenderer from '../StyledPager';


const save = new ClassFactory(Save)
const remove = new ClassFactory(Remove)
const edit = new ClassFactory(Edit)
// /*[Embed('../../../../assets/img/Edit-active.png')]*/
// const active = Edit;
// /*[Embed('../../../../assets/img/Edit-inactive.png')]*/
// const inactive = InActive;

const isCellEditable = (cell/* : FlexDataGridDataCell */)/*: boolean*/ => {
    //Alert.show("cell edit is:" + cell.rowInfo.getData().edit);
    return (cell.rowInfo.getData().edit === true && (cell.column.dataField === "userLastName" || cell.column.dataField === "userFirstName"
        || cell.column.dataField === "userPhone" || cell.column.dataField === "userEmail"))
    //|| cell.column.dataField=="appealTimeline"
}
const cellEdit = (cell/* : FlexDataGridDataCell */)/*: boolean*/ => {
    return (cell.rowInfo.getData().edit && (cell.getColumn().dataField === "userLastName" || cell.getColumn().dataField === "userFirstName"
        || cell.getColumn().dataField === "userPhone" || cell.getColumn().dataField === "userEmail"))
}
// const dynamicIcon = (data/*: any*/)/*: any*/ => {
//     var ret = null;
//     if (data.edit)
//         ret = active;
//     else
//         ret = inactive;
//     return ret;
// }

// const cellEditableForAdd = (cell/* : FlexDataGridDataCell */)/*: boolean*/ => {
//     return cell.rowInfo.getData().edit && cell.column.headerText != "Active";
// }
// const dynamicIconFunction = (data/*: any*/)/*: any*/ => {

//     var ret = null;
//     if (data.edit === true) ret = active;
//     else ret = inactive;

//     return ret;

// }
export default class UserModifier extends UIComponent {
    constructor(props) {
        super(props);
        this._hl = null;;
        this._firCol = false
        this._fsal = new ArrayCollection()
        this._eusr = null;
        this._indx = -1
        this.editable/*: boolean*/ = true;
        this.gridRef = React.createRef();
        this.mediator =  new UserMediator();/* :UserMediator */;
    }

    get firCol() {
        return this._firCol
    }
    set firCol(val/*: boolean*/) {
        this._firCol = val
    }
    set fsal(val/*: ArrayCollection*/) {
        this._fsal = val
    }
    get fsal()/*: ArrayCollection*/ {
        return this._fsal
    }
    set eusr(val/*: IdUser*/) {
        this._eusr = val
    }
    get eusr() {
        return this._eusr
    }
    set indx(val/*: number*/) {
        this._indx = val
    }
    get indx()/*: number*/ {
        return this._indx
    }
    get grid()/*: any*/ {
        return this.gridRef.current;
    }
    editHandle = (data) => {
        if (data.edit) {
            if (window.confirm("Are you sure you want to cancel your changes?")) {//, "Confirm Cancel", Alert.YES | Alert.NO, this, function (event: CloseEvent)/*: void*/ {
                //Alert.show("Trigger delete on the backend: data: " + data)
                this._indx = (this.grid.getDataProvider()).indexOf(data)
                var evt/*: ManageUserEvent*/ = new ManageUserEvent(ManageUserEvent.CLR_USR)
                evt.data = data

                this.dispatchEvent(evt);
            } else {//if (this.event.detail === Alert.NO)

            }
        } else {
            data.edit = true
        }
        this.grid.refreshCells();
    }
    saveHandle = (data, i) => {
        //Alert.show("saveHandle(): data: " + data)
        var dpa = this.grid.getDataProvider()
        //Alert.show("" + dpa)
        this._indx = dpa.indexOf(data)
        //grid.refreshCells();
        //Alert.show("saveHandle():_indx: " + _indx)
        var event/*: ManageUserEvent*/ = new ManageUserEvent(ManageUserEvent.SAVE_USER)
        event.data = data
        var usr = (data);
        //Alert.show("*** " + (usr.roleMap.length-usr.remMaps.length))
        if (usr.userActiveFlag === 1 && ((usr.roleMap.length - usr.remMaps.length) < 1) && usr.addMaps.length < 1) {
            alert("An active user should have One role !")
            if (i === 2) usr.userActiveFlag = 0
        } else {
            this.dispatchEvent(event);
        }
        //grid.refreshCells();
        return false;
    }
    onEdit(data/*: any*/)/*: void*/ {
        if (this.editable) {
            data.edit = true;
            this.editable = false
            this.grid.cellEditableFunction = isCellEditable;
            this.grid.refreshCells();
        } else {
            alert("Please save the row previously being edited first !")
        }
    }
    onAddClick = () =>{
        this.dispatchEvent(new ManageUserEvent(ManageUserEvent.ADD_USER));
    }

    onToolbarExport()/*: void*/ {
        ExtendedExportController.instance().export(this.grid);
    }


    dateLabel(item/*: any*/, col/*: FlexDataGridColumn*/, cell/*: any*/)/*: string*/ {
        var dateStr/*: string*/ = ''
        if (item != null) {
            if (item.updateDate != null)
                dateStr = ExampleUtils.dateFormatter5.format(item.updateDate)
        }
        return dateStr;
    }
    set hl(val/*: ArrayCollection*/) {
        this._hl = val
    }
    get hl()/*: ArrayCollection*/ {
        return this._hl
    }

    vbox1_creationCompleteHandler(event/*: any*/)/*: void*/ {

        //grid.toolbarActions.addItem(new ToolbarAction("Add User", -1, "", "Add User", "org/monte/edi/idhub/assets/img/add.png", false, true)); 
        //grid.rebuildPager()
    }


    onDelete(data/*: Object*/)/*: boolean*/ {
        if (window.confirm("Are you sure you want to delete this item?")) {// "Confirm Delete", Alert.OK | Alert.CANCEL, this, function (event: CloseEvent)/*: void*/ {
            this.dispatchEvent(new AdminEditEvent(AdminEditEvent.DELETE, data));
            //Alert.show("Trigger delete on the backend")
        }
        else {
            alert("Cancel the delete.")
        }
        return true;
    }

    onSave(data/*: any*/)/*: boolean*/ {

        this.dispatchEvent(new AdminEditEvent(AdminEditEvent.SAVE, data));
        this.editable = true
        data.edit = false;
        this.grid.cellEditableFunction = isCellEditable;
        this.grid.refreshCells();
        return false;
    }
    onRem = (data/*: Object*/)/*: boolean*/ => {
        if (window.confirm("Are you sure you want to delete this item?")) {//}, "Confirm Delete", Alert.OK | Alert.CANCEL, this, function (event: CloseEvent)/*: void*/ {
            //            if (this.event.detail === Alert.OK) {
            //Alert.show("Trigger delete on the backend")
            this._indx = (this.grid.getDataProvider()).indexOf(data)
            var evt/*: ManageUserEvent*/ = new ManageUserEvent(ManageUserEvent.DELETE_USER)
            evt.data = data
            this.dispatchEvent(evt);
        }
        else {// if (this.event.detail === Alert.NO)
            
            alert("Cancel the delete.")
            
        }
        return true;
    }

    onExecuteToolbarAction(action/* : ToolbarAction */, currentTarget/*: Object*/, extendedPager/*: any*/)/*: void*/ {
        if (action.code === "Edit")
            alert("Launch Edit Window")
        else if (action.code === "Delete") {
            if (window.confirm("Are you sure you wish to delete this record?")) {//, "Confirm Delete", Alert.OK | Alert.CANCEL, this, function (event: CloseEvent)/*: void*/ {
                //do the delete....you have the grid.selectedKey or grid.selectedObject here...
                alert("Trigger delete on the backend")

            }
        }
        else if (action.code === "Add User") {
            this.dispatchEvent(new ManageUserEvent(ManageUserEvent.ADD_USER));
        }
        else
            alert("Invalid action!")
    }

    pageChanged(event/*: any*/)/*: void*/ {
        alert("pageChanged.")
    }

    componentDidMount() {
        this.mediator = new UserMediator();
        this.mediator.onRegister(this, this.gridRef.current);
        this.gridRef.current.setDataProvider([]);
    }
    componentWillUnmount() {
        this.mediator.onUnRegister();
    }

    render() {
        return (
            <div className="userModifier-main-container">
                <DataGrid ref={this.gridRef} id="grid" width="100%" height="100%" editable cellEditableFunction={cellEdit} enableCopy enableToolbarActions enableEagerDraw styleName="gridStyle" toolbarActionExecutedFunction={this.onExecuteToolbarAction} virtualScroll="true" onAddClick={this.onAddClick}>
                    <ReactDataGridColumnLevel rowHeight="21" enableFilters="true" enablePaging="true" pageSize="5000" pagerRenderer={new ClassFactory(StyledPagerRenderer)} >
                        <ReactDataGridColumnGroup headerText="Menu">
                            <ReactDataGridColumn width="50" dataField="userActiveFlag" enableCellClickRowSelect="false" headerAlign="center" headerText="Active" columnLockMode="right" excludeFromExport="true" itemEditorApplyOnValueCommit="true" itemRenderer={new ClassFactory(ActiveRenderer)} saveHandle={(data, i) => this.saveHandle(data, i)}>
                            </ReactDataGridColumn>
                            {/* <ReactDataGridColumn headerText="Edit" enableIcon iconFunction={dynamicIcon} uniqueIdentifier="Edit" width="50" headerAlign="center" columnLockMode="right" excludeFromExport="true" >  */}
                            <ReactDataGridColumn headerText="Edit" uniqueIdentifier="Edit" width="50" headerAlign="center" columnLockMode="right" excludeFromExport="true" itemRenderer={edit} onHandleEdit={(props) => { this.editHandle(props.cell.rowInfo.getData()) }}>
                                {/* <nestedtreedatagrid:itemRenderer>
									<fx:Component>
										<mx:HBox width="100%" horizontalAlign="center" horizontalScrollPolicy="off">
											<mx:Image source="{parentDocument.dynamicIcon(data)}" click="parentDocument.editHandle(data)" scaleContent="false" useHandCursor="true" buttonMode="true" mouseChildren="true"/>
										</mx:HBox>
									</fx:Component>
								</nestedtreedatagrid:itemRenderer> */}
                            </ReactDataGridColumn>
                            <ReactDataGridColumn width="50" enableCellClickRowSelect="false" headerAlign="center" headerText="Delete User" columnLockMode="right" excludeFromExport="true" itemRenderer={remove} onHandleDelete={(props) => { this.onRem(props.cell.rowInfo.getData()) }}>
                                {/* <nestedtreedatagrid:itemRenderer>
									<fx:Component>
										<mx:HBox width="100%" horizontalAlign="center" horizontalScrollPolicy="off">
											<mx:Image buttonMode="true" mouseChildren="false" scaleContent="false" source="@Embed('org/monte/edi/idhub/assets/img/delete.png')" useHandCursor="true" click="parentDocument.onRem(data)"/>
										</mx:HBox>
									</fx:Component>
								</nestedtreedatagrid:itemRenderer> */}
                            </ReactDataGridColumn>
                            <ReactDataGridColumn width="50" enableCellClickRowSelect="false" headerAlign="center" headerText="Save" columnLockMode="right" excludeFromExport="true" itemRenderer={save} onHandleSave={(props) => { this.saveHandle(props.cell.rowInfo.getData(), 1) }}>
                                {/* <nestedtreedatagrid:itemRenderer>
									<fx:Component>
										<mx:HBox width="100%" horizontalAlign="center" horizontalScrollPolicy="off">

											<fx:Script>
												<![CDATA[
													protected function saveHandle(data:MouseEvent):void
													{
														// TODO Auto-generated method stub

													}
												]]>
											</fx:Script>

											<mx:Image buttonMode="true" mouseChildren="false" scaleContent="false" source="@Embed('org/monte/edi/idhub/assets/img/saveB.png')" useHandCursor="true" click="parentDocument.saveHandle(data,1)"/>
										</mx:HBox>
									</fx:Component>
								</nestedtreedatagrid:itemRenderer> */}
                            </ReactDataGridColumn>
                        </ReactDataGridColumnGroup>
                    </ReactDataGridColumnLevel>
                </DataGrid>

            </div>
        )
    }
}
