import { AxiosPromise } from "axios";
import AdminEditEvent from "../../events/AdminEditEvent.ts";
import AdminEvent from "../../events/AdminEvent.ts";
import ManageUserEvent from "../../events/ManageUserEvent.ts";

import IdUser from "../../vo/main/IdUser";
import ServiceProxyBase from "./ServiceProxyBase";
import qs from 'qs'
import IdUserRoleMap from "../../vo/main/IdUserRoleMap";
import GlobalEventDispatcher from "../utils/GlobalEventDispatcher";
import { toast } from "react-toastify"
import MontefioreUtils from "../utils/MontefioreUtils";
import IdCampusCode from "../../vo/admin/IdCampusCode";
import IdEmployeeSubgroup from "../../vo/admin/IdEmployeeSubgroup";
import IdTitle from "../../vo/admin/IdTitle";
import IdDepartment from "../../vo/admin/IdDepartment";

export default class AdminService extends ServiceProxyBase {

	dispatchEvent(evt){
		GlobalEventDispatcher.instance().dispatchEvent(evt);
	}
    /**
     * Name of the Remote Service Destination
     */
    public static REMOTE_DESTINATION: string = "AdminService";
    /**
     * The RemoteObject will be injected in by the framework.
     * This is configured in ConfigureServicesCommand.
     */
    /*[Inject(name="AdminService")]*/
    // public service: RemoteObject;

    private searchStartDt: Date = null;
    private searchEndDt: Date = null;
    private _editor: boolean = false;
    static instance: any;
    static getInstance: () => any;

    protected failureFaultEvent(event: any, token: Object = null): void {
        var msg = event.message;
        /*var fmsg:String=event.fault.faultString
        if(fmsg.indexOf('Foreign Key Conflicts when deleting user')>=0){
            Alert.show("Foreign key")
        }
        Alert.show("fault: " + fmsg)	*/
        debugger;
        MontefioreUtils.showError(event)
    }

    //addfailureFaultEvent
    protected addfailureFaultEvent(event: any, token: Object = null): void {
        var msg = event.message;
        var dp: number = msg.faultString.indexOf("User Already Existed");
        var smsg: string = "User Already Existed!"
        if (dp >= 0) {
            smsg = "User Already Existed!"
        }
        alert(smsg)
    }

    protected savefailureFaultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEditEvent = new AdminEditEvent(AdminEditEvent.ERR);
        adminEvent.errMsg = (event.message).faultString;
        this.dispatchEvent(adminEvent);
    }

    protected deleteUserFailureFaultEvent(event: any, token: Object = null): void {
        // var msg = event.message;
        // var fmsg: string = event.fault.faultString
        /*if(fmsg.indexOf('Foreign Key Conflicts when deleting user')>=0){
            Alert.show("Foreign key")
        }
        Alert.show("fault: " + fmsg) */
        alert('User cannot be deleted because he/she already has request(s) assigned')
    }

    public getUsers(): AxiosPromise<any> {
        return this.callServiceMethod(
            'get',
            'IdentityHub/api/adminsvc/getAllUsers',
            null,
            null,
            this.usersResultEvent.bind(this),
            this.failureFaultEvent.bind(this)
        );
        // var rpcCall: AsyncToken = this.service.getAllUsers();
        // rpcCall.addResponder(new AsyncResponder(this.usersResultEvent, this.failureFaultEvent));
    }

    protected usersResultEvent(event: any, token: Object = null): void {
        var manageUserEvent: AdminEvent = new AdminEvent(AdminEvent.POP_USERS)
        manageUserEvent.userData = this.convertToVo(event.result, ()=>{return new IdUser()});
        //Alert.show("getRolesUsrResultEvent(): userData is: [" + manageUserEvent.userData.length + "].");
        this.dispatchEvent(manageUserEvent);
    }

    public getAllRoles(startDate: Date = null, endDate: Date = null): AxiosPromise<any> {
        return this.callServiceMethod(
            'get',
            'IdentityHub/api/adminsvc/getAllRoles',
            null,
            null,
            this.getAllRolesResultEvent.bind(this),
            this.failureFaultEvent.bind(this)
        );
        // var rpcCall: AsyncToken = this.service.getAllRoles();
        // rpcCall.addResponder(new AsyncResponder(this.getAllRolesResultEvent, this.failureFaultEvent));
    }

    protected getAllRolesResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_ROLES)
        adminEvent.roleData = event.result;
        this.dispatchEvent(adminEvent);
    }
    public addNewUser(user: IdUser): AxiosPromise<any> {
        var formData = qs.stringify({
            user: user
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/addUserOnly',
            formData,
            null,
            this.resultEvent.bind(this),
            this.addfailureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        )
        // var rpcCall: AsyncToken = this.service.addUserOnly(user);
        // rpcCall.addResponder(new AsyncResponder(this.resultEvent, this.addfailureFaultEvent));
    }

    protected resultEvent(event: any, token: Object = null): void {
        //adminModel.usersAndRoles=event.result as ArrayCollection;
        var adminEvent: ManageUserEvent = new ManageUserEvent(ManageUserEvent.GET_USERS_AND_ROLES_ST);
        adminEvent.data = this.convertToVo(event.result, ()=>{return new IdUser()});
        this.dispatchEvent(adminEvent);

    }
    public getAllRoles4Usr(): AxiosPromise<any> {
        return this.callServiceMethod(
            'get',
            'IdentityHub/api/adminsvc/getAllRoles',
            null,
            null,
            this.roleUsrResultEvent.bind(this),
            this.failureFaultEvent.bind(this)
        );
        // var rpcCall: AsyncToken = this.service.getAllRoles();
        // rpcCall.addResponder(new AsyncResponder(this.roleUsrResultEvent, this.failureFaultEvent));
    }
    protected roleUsrResultEvent(event: any, toker: Object = null): void {
        var manageUsrEvent: AdminEvent = new AdminEvent(AdminEvent.ROLE_USR);
        manageUsrEvent.roleData = event.result;
        this.dispatchEvent(manageUsrEvent);
    }


    public getRoleUsr(): AxiosPromise<any> {
        //Alert.show("getRoleUsr():")
        return this.callServiceMethod(
            'get',
            'IdentityHub/api/adminsvc/getAllRoles',
            null,
            null,
            this.getRolesUsrResultEvent.bind(this),
            this.failureFaultEvent.bind(this)
        );
        // var rpcCall: AsyncToken = this.service.getAllRoles();
        // rpcCall.addResponder(new AsyncResponder(this.getRolesUsrResultEvent, this.failureFaultEvent));

    }

    public getAllDepartments(): AxiosPromise<any> {
        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/findDepartments',
            null,
            null,
            this.getAllDepartmentsSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this)
        );
        // var rpcCall: AsyncToken = this.service.findDepartments();
        // rpcCall.addResponder(new AsyncResponder(this.getAllDepartmentsSuccessResultEvent, this.failureFaultEvent));
    }

    protected getAllDepartmentsSuccessResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_DEPT);
        adminEvent.departmentsData = this.convertToVo(event.result, ()=>{return new IdDepartment()});
        this.dispatchEvent(adminEvent);
    }

    public saveIdDepartment(depart: Object): AxiosPromise<any> {
        var formData = qs.stringify({
            depart: depart
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/saveDepartment',
            formData,
            null,
            this.saveIdDepartSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        )
        // var rpcCall: AsyncToken = this.service.saveDepartment(<IdDepartment>depart);
        // rpcCall.addResponder(new AsyncResponder(this.saveIdDepartSuccessResultEvent, this.failureFaultEvent));
    }

    public saveIdDepartSuccessResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_DEPT);
        adminEvent.departmentsData = this.convertToVo(event.result, ()=>{return new IdDepartment()});;
        this.dispatchEvent(adminEvent);
    }

    public deleteIdDepartment(depart: Object): AxiosPromise<any> {
        var formData = qs.stringify({
            depart: depart
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/deleteDepartment',
            formData,
            null,
            this.deleteIdDepartSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        )
        // var rpcCall: AsyncToken = this.service.deleteDepartment(<IdDepartment>depart);
        // rpcCall.addResponder(new AsyncResponder(this.deleteIdDepartSuccessResultEvent, this.failureFaultEvent));
    }

    public deleteIdDepartSuccessResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_DEPT);
        adminEvent.departmentsData = this.convertToVo(event.result, ()=>{return new IdDepartment()});;
        this.dispatchEvent(adminEvent);
    }



    protected getRolesUsrResultEvent(event: any, token: Object = null): void {
        //Alert.show("getRolesUsrResultEvent():");
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.ROLE_USR)
        adminEvent.roleData = event.result;
        //Alert.show("getRolesUsrResultEvent(): roleData is: [" + adminEvent.roleData.length + "].");
        this.dispatchEvent(adminEvent);
    }


    public saveUser(userData: IdUser): AxiosPromise<any> {
        var formData = qs.stringify({
            user: JSON.stringify(userData)
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/saveUserOnly',
            formData,
            null,
            this.saveUserHandler.bind(this),
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );
        // var rpcCall: AsyncToken = this.service.saveUserOnly(user);
        // rpcCall.addResponder(new AsyncResponder(this.saveUserHandler, this.failureFaultEvent));
    }

    protected saveUserHandler(event: any, toker: Object = null): void {
        var adminEvent: ManageUserEvent = new ManageUserEvent(ManageUserEvent.SV_USR_END);
        adminEvent.data = this.convertToVo(event.result, ()=>{return new IdUser()});
        this.dispatchEvent(adminEvent);
    }
    public addUsrFsa(ur: IdUserRoleMap, signal: string): AxiosPromise<any> {
        var formData = qs.stringify({
            ur: ur
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/addUserFacilityMap',
            formData,
            null,
            (signal == ManageUserEvent.USR_FSA_REF) ? this.addUsrFsaResult.bind(this) : () => { },
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );
        // var rpcCall: AsyncToken = this.service.addUserFacilityMap(ur)
        // if (signal == ManageUserEvent.USR_FSA_REF) {
        //     rpcCall.addResponder(new AsyncResponder(this.addUsrFsaResult, this.failureFaultEvent))
        // } else {
        //     rpcCall.addResponder(new AsyncResponder(null, this.failureFaultEvent))
        // }
    }
    protected addUsrFsaResult(event: any, token: Object = null): void {
        var manageUserEvent: ManageUserEvent = new ManageUserEvent(ManageUserEvent.USR_FSA_REF);
        //manageUserEvent.data=event.result;
        this.dispatchEvent(manageUserEvent);
    }
    public remUsrFsa(ur: IdUserRoleMap, signal: string): AxiosPromise<any> {
        var formData = qs.stringify({
            ur: ur
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/removeUserFacilityMap',
            formData,
            null,
            (signal == ManageUserEvent.USR_FSA_REF) ? this.remUsrFsaHandle.bind(this) :
                (signal == ManageUserEvent.RMV_USR_FSA_ED) ? this.remUsrFsaHandleDel.bind(this) : () => { },
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );
        // var rpcCall: AsyncToken = this.service.removeUserFacilityMap(ur)
        // if (signal == ManageUserEvent.USR_FSA_REF) {
        //     rpcCall.addResponder(new AsyncResponder(this.remUsrFsaHandle, this.failureFaultEvent));
        // } else if (signal == ManageUserEvent.RMV_USR_FSA_ED) {
        //     rpcCall.addResponder(new AsyncResponder(this.remUsrFsaHandleDel, this.failureFaultEvent));
        // } else {
        //     rpcCall.addResponder(new AsyncResponder(null, this.failureFaultEvent))
        // }
    }
    protected remUsrFsaHandle(event: any, token: Object = null): void {
        var manageUserEvent: ManageUserEvent = new ManageUserEvent(ManageUserEvent.USR_FSA_REF);
        manageUserEvent.data = event.result;
        this.dispatchEvent(manageUserEvent);
    }

    public addUsrRole(ur: IdUserRoleMap, signal: string): AxiosPromise<any> {
        //Alert.show("AdminService:addUsrRole()");
        var formData = qs.stringify({
            userId: ur.id.userId, 
            roleId: ur.id.roleId
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/setRole',
            formData,
            null,
            (signal == ManageUserEvent.USR_ROLE_REF) ? this.addUsrRoleResult.bind(this) : () => { },
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );
        // var rpcCall: AsyncToken = this.service.setRole(ur.id.userId, ur.id.roleId)
        // if (signal == ManageUserEvent.USR_ROLE_REF) {
        //     rpcCall.addResponder(new AsyncResponder(this.addUsrRoleResult, this.failureFaultEvent));
        // } else {
        //     rpcCall.addResponder(new AsyncResponder(null, this.failureFaultEvent))
        // }
    }
    protected addUsrRoleResult(event: any, token: Object = null): void {
        //Alert.show("AdminService:addUsrRoleResult()");
        var manageUserEvent: ManageUserEvent = new ManageUserEvent(ManageUserEvent.USR_ROLE_REF);
        manageUserEvent.data = event.result;
        this.dispatchEvent(manageUserEvent);
    }
    protected remUsrFsaHandleDel(event: any, token: Object = null): void {

        var manageUserEvent: ManageUserEvent = new ManageUserEvent(ManageUserEvent.RMV_USR_FSA_ED);
        manageUserEvent.data = event.result;
        this.dispatchEvent(manageUserEvent);
    }
    public remUsrRole(ur: IdUserRoleMap, signal: string): AxiosPromise<any> {
        //Alert.show("AdminService:remUsrRole()");
        var formData = qs.stringify({
            userId: ur.id.userId,
            roleId: ur.id.roleId
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/unsetRole',
            formData,
            null,
            (signal == ManageUserEvent.USR_ROLE_REF) ? this.remUsrRoleResult.bind(this) :
                (signal == ManageUserEvent.RMV_USR_ROLE_ED) ? this.remUsrRoleResultDel.bind(this) : () => { },
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );
        // var rpcCall: AsyncToken = this.service.unsetRole(ur.id.userId, ur.id.roleId)
        // if (signal == ManageUserEvent.USR_ROLE_REF) {
        //     rpcCall.addResponder(new AsyncResponder(this.remUsrRoleResult, this.failureFaultEvent));
        // } else if (signal == ManageUserEvent.RMV_USR_ROLE_ED) {
        //     rpcCall.addResponder(new AsyncResponder(this.remUsrRoleResultDel, this.failureFaultEvent));
        // } else {
        //     rpcCall.addResponder(new AsyncResponder(null, this.failureFaultEvent))
        // }
    }
    protected remUsrRoleResultDel(event: any, token: Object = null): void {
        var manageUserEvent: ManageUserEvent = new ManageUserEvent(ManageUserEvent.RMV_USR_ROLE_ED);
        manageUserEvent.data = event.result;
        this.dispatchEvent(manageUserEvent);
    }
    protected remUsrRoleResult(event: any, token: Object = null): void {
        var manageUserEvent: ManageUserEvent = new ManageUserEvent(ManageUserEvent.USR_ROLE_REF);
        manageUserEvent.data = event.result;
        this.dispatchEvent(manageUserEvent);
    }
    public deleteUser(user: IdUser): AxiosPromise<any> {
        var formData = qs.stringify({
            user: user
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/deleteUser',
            formData,
            null,
            this.deleteUserSuccessfulHandler.bind(this),
            this.deleteUserFailureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );
        // var rpcCall: AsyncToken = this.service.deleteUser(user);
        // rpcCall.addResponder(new AsyncResponder(this.deleteUserSuccessfulHandler, this.deleteUserFailureFaultEvent));
    }

    protected deleteUserSuccessfulHandler(event: any, toker: Object = null): void {
        var adminEvent: ManageUserEvent = new ManageUserEvent(ManageUserEvent.DELETE_USER_FIN);
        adminEvent.data = this.convertToVo(event.result, ()=>{return new IdUser()});
        this.dispatchEvent(adminEvent);
    }

    public getAllCampusCodes(): AxiosPromise<any> {

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/findCampusCodes',
            null,
            null,
            this.getAllCampusCodeSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this),
            null,
            this.getHeaderData()
        );
        // var rpcCall: AsyncToken = this.service.findCampusCodes();
        // rpcCall.addResponder(new AsyncResponder(this.getAllCampusCodeSuccessResultEvent, this.failureFaultEvent));
    }

    protected getAllCampusCodeSuccessResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_CAMPUSCODE);
        adminEvent.campuscodeData = this.convertToVo(event.result, ()=>{return new IdCampusCode()});
        this.dispatchEvent(adminEvent);
    }
    //---
    public saveIdCampusCode(val: Object): AxiosPromise<any> {
        var formData = qs.stringify({
            campusCode: val
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/saveCampusCode',
            formData,
            null,
            this.saveCampusCodeSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );
        // var rpcCall: AsyncToken = this.service.saveCampusCode(<IdCampusCode>val);
        // rpcCall.addResponder(new AsyncResponder(this.saveCampusCodeSuccessResultEvent, this.failureFaultEvent));
    }

    public saveCampusCodeSuccessResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_CAMPUSCODE);
        adminEvent.campuscodeData = this.convertToVo(event.result, ()=>{return new IdCampusCode()});;
        this.dispatchEvent(adminEvent);
    }

    public deleteCampusCode(val: Object): AxiosPromise<any> {
        var formData = qs.stringify({
            campusCode: val
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/deleteCampusCode',
            formData,
            null,
            this.deleteCampusCodeSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );
        // var rpcCall: AsyncToken = this.service.deleteCampusCode(<IdCampusCode>val);
        // rpcCall.addResponder(new AsyncResponder(this.deleteCampusCodeSuccessResultEvent, this.failureFaultEvent));
    }

    public deleteCampusCodeSuccessResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_CAMPUSCODE);
        adminEvent.campuscodeData = this.convertToVo(event.result, ()=>{return new IdCampusCode()});;
        this.dispatchEvent(adminEvent);
    }

    //---IdEmployeeGroup

    public getAllIdEmployeeGroups(): AxiosPromise<any> {
        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/findEmployeeSubgroup',
            null,
            null,
            this.getAllEmployeeGroupSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this),
            null,
            this.getHeaderData()
        );
        // var rpcCall: AsyncToken = this.service.findEmployeeSubgroup();
        // rpcCall.addResponder(new AsyncResponder(this.getAllEmployeeGroupSuccessResultEvent, this.failureFaultEvent));
    }

    protected getAllEmployeeGroupSuccessResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_EMPSUBGROUP);
        adminEvent.employeeSubgroupData = this.convertToVo(event.result, ()=>{return new IdEmployeeSubgroup()});
        this.dispatchEvent(adminEvent);
    }

    public saveIdEmployeeSubgroup(val: Object): AxiosPromise<any> {
        var formData = qs.stringify({
            employeeSubgroup: val
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/saveEmployeeSubgroup',
            formData,
            null,
            this.saveEmployeeSubgroupSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );

        // var rpcCall: AsyncToken = this.service.saveEmployeeSubgroup(<IdEmployeeSubgroup>val);
        // rpcCall.addResponder(new AsyncResponder(this.saveEmployeeSubgroupSuccessResultEvent, this.failureFaultEvent));
    }

    public saveEmployeeSubgroupSuccessResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_EMPSUBGROUP);
        adminEvent.employeeSubgroupData = this.convertToVo(event.result, ()=>{return new IdEmployeeSubgroup()});
        this.dispatchEvent(adminEvent);
    }

    public deleteEmployeeSubgroup(val: Object): AxiosPromise<any> {
        var formData = qs.stringify({
            employeeSubgroup: val
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/deleteEmployeeSubgroup',
            formData,
            null,
            this.deleteEmployeeSubgroupSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );
        // var rpcCall: AsyncToken = this.service.deleteEmployeeSubgroup(<IdEmployeeSubgroup>val);
        // rpcCall.addResponder(new AsyncResponder(this.deleteEmployeeSubgroupSuccessResultEvent, this.failureFaultEvent));
    }

    public deleteEmployeeSubgroupSuccessResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_EMPSUBGROUP);
        adminEvent.employeeSubgroupData = this.convertToVo(event.result, ()=>{return new IdEmployeeSubgroup()});
        this.dispatchEvent(adminEvent);
    }

    public getAllTitle(): AxiosPromise<any> {
        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/findTitles',
            null,
            null,
            this.getAllTitleSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this),
            null,
            this.getHeaderData()
        );
        // var rpcCall: AsyncToken = this.service.findTitles();
        // rpcCall.addResponder(new AsyncResponder(this.getAllTitleSuccessResultEvent, this.failureFaultEvent));
    }

    protected getAllTitleSuccessResultEvent(event: any, token: Object = null): void {

        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_TITLE);
        adminEvent.titleData = this.convertToVo(event.result, ()=>{return new IdTitle()});
        this.dispatchEvent(adminEvent);
    }

    public saveIdTitle(title: Object): AxiosPromise<any> {
        var formData = qs.stringify({
            title
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/saveTitle',
            formData,
            null,
            this.saveIdTitleSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );
        // var rpcCall: AsyncToken = this.service.saveTitle(<IdTitle>title);
        // rpcCall.addResponder(new AsyncResponder(this.saveIdTitleSuccessResultEvent, this.failureFaultEvent));
    }

    public saveIdTitleSuccessResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.GET_TITLE);
        adminEvent.titleData = this.convertToVo(event.result, ()=>{return new IdTitle()});
        this.dispatchEvent(adminEvent);
    }

    public deleteIdTitle(title: Object): AxiosPromise<any> {
        var formData = qs.stringify({
            title
        })

        return this.callServiceMethod(
            'post',
            'IdentityHub/api/adminsvc/deleteTitle',
            formData,
            null,
            this.deleteIdTitleSuccessResultEvent.bind(this),
            this.failureFaultEvent.bind(this),
            'form',
            this.getHeaderFormData()
        );
        // var rpcCall: AsyncToken = this.service.deleteTitle(<IdTitle>title);
        // rpcCall.addResponder(new AsyncResponder(this.deleteIdTitleSuccessResultEvent, this.failureFaultEvent));
    }

    public deleteIdTitleSuccessResultEvent(event: any, token: Object = null): void {
        var adminEvent: AdminEvent = new AdminEvent(AdminEvent.POP_TITLE);
        adminEvent.titleData = this.convertToVo(event.result, ()=>{return new IdTitle()});
        this.dispatchEvent(adminEvent);
    }
}

AdminService.prototype.typeName = AdminService.typeName =
    'AdminService' //for quick inspection
AdminService.instance = null;
AdminService.getInstance = () => {
    if (AdminService.instance == null) {
        AdminService.instance = new AdminService()
    }
    return AdminService.instance
}



