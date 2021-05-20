import AdminService from "../../../service/cfc/AdminService.ts";
import UserModifier from "../Views/UserModifier";
import Mediator from "./Mediator.ts"
import IDRole from "../../../vo/main/IDRole"
import {
	FlexDataGridEvent,
	FlexDataGridColumn,
	ExtendedFilterPageSortChangeEvent,
	ClassFactory,
	UIUtils
} from '../../../flexicious';
import ManageUserEvent from "../../../events/ManageUserEvent.ts";
import AdminEvent from "../../../events/AdminEvent.ts";
import ArrayCollection from "../../../vo/ArrayCollection";
import IdUser from "../../../vo/main/IdUser";
import IdUserRoleMap from "../../../vo/main/IdUserRoleMap";
import GlobalEventDispatcher from "../../../service/utils/GlobalEventDispatcher";
import { toast } from 'react-toastify'
import { camelizeKeys } from "../../../shared/utils";
import UsrRole from "../Views/UsrRole";

export default class UserMediator extends Mediator {
	/*[Inject]*/
	public view: UserModifier;
	/*[Inject]*/
	public servc: AdminService = AdminService.getInstance();

	public onRegister(view: UserModifier): void {
		this.view = view
		this.mapListener(this.eventDispatcher, ManageUserEvent.USER_START, this.getLayout, ManageUserEvent);
		this.mapListener(this.eventDispatcher, ManageUserEvent.GET_USERS_AND_ROLES_ST, this.getUserRoles, ManageUserEvent);
		this.mapListener(this.view, ManageUserEvent.CLR_USR, this.clrUsr, ManageUserEvent);
		this.mapListener(this.eventDispatcher, AdminEvent.ROLE_USR, this.setRoleUser, AdminEvent)
		this.mapListener(this.eventDispatcher, AdminEvent.POP_USERS, this.setRoleUsr, AdminEvent)
		this.mapListener(this.eventDispatcher, ManageUserEvent.SET_ROLE_DONE, this.getUsers, ManageUserEvent);
		this.mapListener(this.view, ManageUserEvent.SAVE_USER, this.saveUsr, ManageUserEvent);
		this.mapListener(this.eventDispatcher, ManageUserEvent.SAVE_USER, this.saveUsr, ManageUserEvent);
		this.mapListener(this.eventDispatcher, ManageUserEvent.SV_USR_END, this.saveUsrRole, ManageUserEvent);
		this.mapListener(this.eventDispatcher, ManageUserEvent.USR_FSA_REF, this.refillFsa, ManageUserEvent);
		this.mapListener(this.eventDispatcher, ManageUserEvent.USR_FSA_REF_FIN, this.saveUsrFsa, ManageUserEvent);
		this.mapListener(this.view, ManageUserEvent.ADD_USER, this.addNewUser, ManageUserEvent);
		this.mapListener(this.view, ManageUserEvent.RFSH_DISP, this.refreshView, ManageUserEvent);
		this.mapListener(this.eventDispatcher, ManageUserEvent.USR_ROLE_REF, this.reshuffleUsrRole, ManageUserEvent);
		this.mapListener(this.view, ManageUserEvent.DELETE_USER, this.deleteUserRole, ManageUserEvent);
		this.mapListener(this.eventDispatcher, ManageUserEvent.RMV_USR_ROLE_ED, this.delUsrStart, ManageUserEvent);
		this.mapListener(this.eventDispatcher, ManageUserEvent.RMV_USR_ROLE_NON, this.delUsrStart, ManageUserEvent);
		this.mapListener(this.eventDispatcher, ManageUserEvent.DELETE_USER_FIN, this.delUsrEnd, ManageUserEvent);
		this.mapListener(this.view.grid, FlexDataGridEvent.VIRTUAL_SCROLL, this.changeViewVS, FlexDataGridEvent)
		this.mapListener(this.view.grid, ExtendedFilterPageSortChangeEvent.FILTER_PAGE_SORT_CHANGE, this.changeView, ExtendedFilterPageSortChangeEvent)
		this.mapListener(this.view.grid, ExtendedFilterPageSortChangeEvent.PAGE_CHANGE, this.changeViewPg, ExtendedFilterPageSortChangeEvent)
		var manageUserEvent: ManageUserEvent = new ManageUserEvent(ManageUserEvent.USER_START);
		this.dispatch(manageUserEvent);
		//this.getLayout(null) -> This is not needed because line 50 calls this.

	}

	dispatch(evt: any) {
		GlobalEventDispatcher.instance().dispatchEvent(evt);
	}

	private changeViewVS(event: FlexDataGridEvent): void {
		// Alert.show("changeViewVS: ")
		this.refreshView()
	}

	private changeView(event: ExtendedFilterPageSortChangeEvent): void {
		this.refreshView()
	}
	private changeViewPg(event: ExtendedFilterPageSortChangeEvent): void {
		this.refreshView()
	}

	private getUsers(event: ManageUserEvent): void {
		this.servc.getUsers()

	}
	private getUserFacs(event: ManageUserEvent): void {
	}
	private getUserRoles(event: ManageUserEvent): void {
		this.servc.getAllRoles4Usr();
	}
	private getUserSca(event: ManageUserEvent): void {
	}

	private arrColn(): void {
		if (!this.view.firCol) {
			var dummyCol: FlexDataGridColumn = new FlexDataGridColumn();
			dummyCol.setDataField("userId");
			dummyCol.setHeaderText("User");
			UIUtils.checkSetterAndApply(dummyCol, "itemEditorApplyOnValueCommit", true)
			UIUtils.checkSetterAndApply(dummyCol, "headerAlign", "center")
			UIUtils.checkSetterAndApply(dummyCol, "textAlign", "left")
			dummyCol.setStyle('fontWeight', 'bold')
			UIUtils.checkSetterAndApply(dummyCol, "columnWidthMode", "fitToContent")
			UIUtils.checkSetterAndApply(dummyCol, "columnLockMode", "left");
			UIUtils.checkSetterAndApply(dummyCol, "sortable", true)
			UIUtils.checkSetterAndApply(dummyCol, "filterControl", "TextInput")
			UIUtils.checkSetterAndApply(dummyCol, "filterOperation", "Contains");
			//dummyCol. .filterTriggerEvent="filterChange"	
			this.view.grid.addColumn(dummyCol);
			var lummyCol: FlexDataGridColumn = new FlexDataGridColumn();
			UIUtils.checkSetterAndApply(lummyCol, "dataField", "userLastName")
			UIUtils.checkSetterAndApply(lummyCol, "headerText", "Last Name")
			UIUtils.checkSetterAndApply(lummyCol, "itemEditorApplyOnValueCommit", true)
			UIUtils.checkSetterAndApply(lummyCol, "headerAlign", "center")
			UIUtils.checkSetterAndApply(lummyCol, "textAlign", "left")
			lummyCol.setStyle('fontWeight', 'bold')
			UIUtils.checkSetterAndApply(lummyCol, "columnWidthMode", "fitToContent")
			//UIUtils.checkSetterAndApply(lummyCol,"width=100	
			UIUtils.checkSetterAndApply(lummyCol, "columnLockMode", "left")
			UIUtils.checkSetterAndApply(lummyCol, "sortable", true)
			UIUtils.checkSetterAndApply(lummyCol, "filterControl", "TextInput")
			UIUtils.checkSetterAndApply(lummyCol, "filterOperation", "Contains")
			this.view.grid.addColumn(lummyCol);
			var fummyCol: FlexDataGridColumn = new FlexDataGridColumn();
			UIUtils.checkSetterAndApply(fummyCol, "dataField", "userFirstName")
			UIUtils.checkSetterAndApply(fummyCol, "headerText", "First Name")
			UIUtils.checkSetterAndApply(fummyCol, "itemEditorApplyOnValueCommit", true)
			UIUtils.checkSetterAndApply(fummyCol, "headerAlign", "center")
			UIUtils.checkSetterAndApply(fummyCol, "textAlign", "left")
			fummyCol.setStyle('fontWeight', 'bold')
			UIUtils.checkSetterAndApply(fummyCol, "columnWidthMode", "fitToContent")
			//UIUtils.checkSetterAndApply(lummyCol,"width=100	
			UIUtils.checkSetterAndApply(fummyCol, "columnLockMode", "left")
			UIUtils.checkSetterAndApply(fummyCol, "sortable", true)
			UIUtils.checkSetterAndApply(fummyCol, "filterControl", "TextInput")
			UIUtils.checkSetterAndApply(fummyCol, "filterOperation", "Contains")
			this.view.grid.addColumn(fummyCol);
			var tummyCol: FlexDataGridColumn = new FlexDataGridColumn();
			UIUtils.checkSetterAndApply(tummyCol, "dataField", "userEmail")
			UIUtils.checkSetterAndApply(tummyCol, "headerText", "Email")
			UIUtils.checkSetterAndApply(tummyCol, "itemEditorApplyOnValueCommit", true)
			UIUtils.checkSetterAndApply(tummyCol, "headerAlign", "center")
			UIUtils.checkSetterAndApply(tummyCol, "textAlign", "left")
			tummyCol.setStyle('fontWeight', 'bold')
			//UIUtils.checkSetterAndApply(tummyCol,"columnWidthMode="fitToContent"	
			UIUtils.checkSetterAndApply(tummyCol, "width", 200)
			UIUtils.checkSetterAndApply(tummyCol, "columnLockMode", "left")
			UIUtils.checkSetterAndApply(tummyCol, "sortable", false)
			UIUtils.checkSetterAndApply(tummyCol, "filterControl", "TextInput")
			UIUtils.checkSetterAndApply(tummyCol, "filterOperation", "Contains")
			this.view.grid.addColumn(tummyCol);
			var pummyCol: FlexDataGridColumn = new FlexDataGridColumn();
			UIUtils.checkSetterAndApply(pummyCol, "dataField", "userPhone")
			UIUtils.checkSetterAndApply(pummyCol, "headerText", "Phone Number")
			UIUtils.checkSetterAndApply(pummyCol, "itemEditorApplyOnValueCommit", true)
			UIUtils.checkSetterAndApply(pummyCol, "headerAlign", "center")
			pummyCol.setStyle('fontWeight', 'bold')
			UIUtils.checkSetterAndApply(pummyCol, "columnWidthMode", "fitToContent")
			//UIUtils.checkSetterAndApply(lummyCol,"width=100	
			UIUtils.checkSetterAndApply(pummyCol, "columnLockMode", "left")
			UIUtils.checkSetterAndApply(pummyCol, "sortable", false)
			UIUtils.checkSetterAndApply(pummyCol, "filterControl", "TextInput")
			UIUtils.checkSetterAndApply(pummyCol, "filterOperation", "Contains")

			this.view.grid.addColumn(pummyCol);

			this.view.firCol = true
		}
	}

	private getLayout(event: ManageUserEvent): void {
		this.arrColn();
		this.servc.getRoleUsr();
		this.view.grid.rebuild()

	}

	private setRoleUser(event: AdminEvent): void {
		//Alert.show("UserMediator:setRoleUser()");
		var hl: ArrayCollection = this.view.hl === null ? (new ArrayCollection()) : this.view.hl
		for (var x: number = 0; x < event.roleData.length; x++) {
			var role: IDRole = event.roleData[x]
			var ind: number = hl.getItemIndex(role.roleId)
			if (ind < 0 && !(role.roleId === 'Admin' || role.roleId === 'SDEmailer')) {
				var col: FlexDataGridColumn = new FlexDataGridColumn();
				col.setHeaderText(role.roleId);
				col.setWidth(100);
				//Alert.show("UserMediator:col header is: " + col.headerText);
				col.setUniqueIdentifier(role.roleId);
				col.sortable = false
				//col.columnLockMode="LOCK_MODE_LEFT"
				col.setEditable(true);// = true
				hl.addItem(col.getUniqueIdentifier())
				col.itemRenderer = new ClassFactory(UsrRole)
				this.view.grid.addColumn(col);
			}
		}
		var col2: FlexDataGridColumn = new FlexDataGridColumn();
		col2.setHeaderText('');
		col2.setWidth(100);
		this.view.grid.addColumn(col2);
		// this.view.grid.distributeColumnWidthsEqually();
		this.view.hl = hl
		this.view.grid.refreshCells();
		this.dispatch(new ManageUserEvent(ManageUserEvent.SET_ROLE_DONE))
	}

	private setUsers(event: ManageUserEvent): void {
		this.view.grid.setDataProvider(ArrayCollection.from(event.data));
		this.view.grid.refreshCells();

		var gridCgs: any[] = [];
		var allCols: any[] = [];
		var mCol: FlexDataGridColumn = new FlexDataGridColumn();
		mCol.headerText = "Make";
		mCol.dataField = "make";
		mCol.width = 100
		mCol.columnLockMode = "left";
		gridCgs.push(mCol);
		mCol = new FlexDataGridColumn();
		mCol.headerText = "Model";
		mCol.dataField = "model";
		mCol.width = 100
		mCol.columnLockMode = "left";
		gridCgs.push(mCol);
		mCol = new FlexDataGridColumn();
		mCol.headerText = "Color";
		mCol.dataField = "color";
		mCol.width = 100
		mCol.columnLockMode = "left";
		gridCgs.push(mCol);

		this.view.grid.columnLevel.groupedColumns = gridCgs;
		this.view.grid.distributeColumnWidthsEqually();

		this.view.grid.reDraw();

	}
	private setRoleUsr(event: AdminEvent): void {
		this.view.grid.setDataProvider(event.userData);
		this.refreshView()
	}


	private clrUsr(event: ManageUserEvent): void {

		// var usr: IdUser = event.data as IdUser;
		var idUser = new IdUser()
		var usr = event.data;
		if (usr.add) {
			var dataPd: ArrayCollection = <ArrayCollection>this.view.grid.getDataProvider()
			dataPd.removeItemAt(this.view.indx)
		} else {
			usr.undo()
		}
		usr.edit = false
		this.refreshView()
	}
	private saveUsr(event: ManageUserEvent): void {
		var ius: IdUser = <IdUser>event.data
		this.view.eusr = ius
		this.servc.saveUser(ius);
	}
	//
	//save usrFac
	private saveUsrFsa(event: ManageUserEvent): void {
		var idus: IdUser = this.view.eusr    //event.data as RcUser
		var adds: ArrayCollection = idus.addMaps
		var rems: ArrayCollection = idus.remMaps
		//Alert.show("fsaAdds is: " + adds.length + ", fsaRems is: " +rems.length)
		var nonchg: boolean = true
		if (adds != null && adds.length > 0) {
			for (var i: number = 0; i < adds.length; i++) {
				var oneAdd: IdUserRoleMap = adds[i] as IdUserRoleMap
				this.servc.addUsrFsa(oneAdd, ManageUserEvent.USR_FSA_REF)
				nonchg = false
			}
		}
		if (rems != null && rems.length > 0) {
			for (var j: number = 0; j < rems.length; j++) {
				var oneRem: IdUserRoleMap = <IdUserRoleMap>rems[j]
				this.servc.remUsrFsa(oneRem, ManageUserEvent.USR_FSA_REF)
				nonchg = false
			}
		}
		if (nonchg) {
			var evt: ManageUserEvent = new ManageUserEvent(ManageUserEvent.USR_FSA_REF)
			evt.data = idus
			this.dispatch(evt)
		}
	}

	private refillFsa(event: ManageUserEvent): void {
		var us: IdUser = this.view.eusr    //event.data as RcUser
		us.fsaRefresh()
		var evt: ManageUserEvent = new ManageUserEvent(ManageUserEvent.USR_FSA_REF_FIN)
		this.dispatch(evt)
	}

	//
	private saveUsrRole(event: ManageUserEvent): void {
		var dp: ArrayCollection = <ArrayCollection>this.view.grid.getDataProvider()
		var idUser = new IdUser()
		var us: IdUser = ((this.view.eusr))    //event.data as RcUser
		var adds: ArrayCollection = us.addMaps
		var rems: ArrayCollection = us.remMaps
		var nonchg: boolean = true
		if (adds != null && adds.length > 0) {
			for (var i: number = 0; i < adds.length; i++) {
				var oneAdd: IdUserRoleMap = <IdUserRoleMap>adds[i]
				this.servc.addUsrRole(oneAdd, ManageUserEvent.USR_ROLE_REF)
				nonchg = false
			}
		}
		if (rems != null && rems.length > 0) {
			for (var j: number = 0; j < rems.length; j++) {
				var oneRem: IdUserRoleMap = <IdUserRoleMap>rems[j]
				this.servc.remUsrRole(oneRem, ManageUserEvent.USR_ROLE_REF)
				nonchg = false
			}
		}
		if (nonchg) {
			var evt: ManageUserEvent = new ManageUserEvent(ManageUserEvent.USR_ROLE_REF)
			evt.data = us
			this.dispatch(evt)
		}
	}

	private reshuffleUsrRole(event: ManageUserEvent): void {
		var inx: number = this.view.indx
		var dp: ArrayCollection = <ArrayCollection>this.view.grid.getDataProvider()

		var idUser = new IdUser()
		var us = ((dp[inx]));
		// var us: IdUser = <IdUser>dp[inx]
		us = ((this.view.eusr))
		us.add = false
		us.edit = false
		us.reshuffle()
		var testus: IdUser = <IdUser>dp[inx]
		this.refreshView()
	}
	private editUser(event: ManageUserEvent): void {
		toast.warning("fix this editUser")
		// var addUser:AddUser=new AddUser();
		// PopUpManager.addPopUp(addUser, this.contextView, true);
		// PopUpManager.centerPopUp(addUser);
		// this.mediatorMap.createMediator(addUser)
	}

	private addNewUser(event: ManageUserEvent): void {
		toast.warning("fix this addNewUser")

		// var addUser:AddUser=new AddUser();
		// PopUpManager.addPopUp(addUser, this.contextView, true);
		// PopUpManager.centerPopUp(addUser);
		// this.mediatorMap.createMediator(addUser)
		// addUser.userId.setFocus();
	}
	private deleteUserFsa(event: ManageUserEvent): void {
		var rus: IdUser = <IdUser>event.data
		var fls: ArrayCollection = rus.facilityMap
		if (fls != null && fls.length > 0) {
			var sig: string = ""
			for (var i: number = 0; i < fls.length; i++) {
				var one: IdUserRoleMap = <IdUserRoleMap>fls[i]
				if (i >= (fls.length - 1)) sig = ManageUserEvent.RMV_USR_FSA_ED
				else sig = ManageUserEvent.RMV_USR_FSA_NON
				this.servc.remUsrFsa(one, sig) //  remUsrRole(one, sig)
			}
		} else {
			var evt: ManageUserEvent = new ManageUserEvent(ManageUserEvent.RMV_USR_FSA_ED)
			evt.data = rus
			this.dispatch(evt)
		}
	}

	private deleteUserRole(event: ManageUserEvent): void {
		var rus: IdUser = <IdUser>event.data
		var rls: ArrayCollection = rus.roleMap

		if (rls != null && rls.length > 0) {
			var sig: string = ""
			for (var i: number = 0; i < rls.length; i++) {
				var one: IdUserRoleMap = <IdUserRoleMap>rls[i]
				if (i >= (rls.length - 1)) sig = ManageUserEvent.RMV_USR_ROLE_ED
				else sig = ManageUserEvent.RMV_USR_ROLE_NON
				this.servc.remUsrRole(one, sig)
			}
		} else {
			var evt: ManageUserEvent = new ManageUserEvent(ManageUserEvent.RMV_USR_ROLE_NON)
			evt.data = rus
			this.dispatch(evt)
		}
	}
	private delUsrStart(event: ManageUserEvent): void {
		var etype: string = event.type;
		var us: IdUser
		if (etype == ManageUserEvent.RMV_USR_ROLE_ED) {
			var uid: string = (<IdUserRoleMap>event.data).id.userId
			us = new IdUser()
			us.userId = uid
		} else if (etype == ManageUserEvent.RMV_USR_ROLE_NON) {
			us = <IdUser>event.data
		}
		this.servc.deleteUser(us)
	}
	private delUsrEnd(event: ManageUserEvent): void {
		var rus: IdUser = <IdUser>event.data
		var dp: ArrayCollection = <ArrayCollection>this.view.grid.getDataProvider()
		dp.removeItemAt(this.view.indx)
		this.refreshView()
		this.view.grid.refreshGrid()
	}
	private activateUser(event: ManageUserEvent): void {
		//service.activateUser(event.user, event.activate)
	}

	private refreshDisp(event: ManageUserEvent): void {
		this.refreshView()
	}

	private refreshView = (): void => {
		if (this.view.hl != null) {
			for (var i: number = 0; i < this.view.hl.length; i++) {
				var hd: string = this.view.hl[i]
				var col: FlexDataGridColumn;
				if (hd.indexOf("-") >= 0) {
					for (var j: number = 0; j < this.view.fsal.length; j++) {
						var onefsa: any = this.view.fsal[j]
						if (onefsa.fsaTxt == hd) {
							col = this.view.grid.getColumnByUniqueIdentifier(onefsa.fsaid)
							col.itemRenderer = new ClassFactory(UsrRole)
							break;
						}
					}
				} else {
					col = this.view.grid.getColumnByUniqueIdentifier(hd)
					col.itemRenderer = new ClassFactory(UsrRole)
				}
			}
			this.view.grid.reDraw()
		}
	}
}



