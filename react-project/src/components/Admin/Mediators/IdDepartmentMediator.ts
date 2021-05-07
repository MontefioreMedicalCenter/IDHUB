import AdminService from "../../../service/cfc/AdminService.ts";
import IdDepartmentModifier from "../Views/IdDepartmentModifier";
import Mediator from "./Mediator.ts";
import AdminEvent from "../../../events/AdminEvent.ts";
import IdDepartmentAdminEvent from "../../../events/IdDepartmentAdminEvent.ts";

import IdDepartment from "../../../vo/main/IdDepartment";
import DataGrid from "../../../shared/components/ExtendedDataGrid";
import ArrayCollection from "../../../vo/ArrayCollection";
export default class IdDepartmentMediator extends Mediator {
	/*[Inject]*/
	public view: IdDepartmentModifier
	/*[Inject]*/
	public adminService: AdminService = AdminService.getInstance();

	public onRegister(grid: DataGrid): IdDepartmentMediator {
		this.grid = grid;
		this.mapListener(this.eventDispatcher, AdminEvent.GET_DEPT, this.getDeptCC, AdminEvent);
		this.mapListener(this.eventDispatcher, AdminEvent.POP_DEPT, this.popIdDepartmentClass, AdminEvent);
		this.mapListener(this.grid, IdDepartmentAdminEvent.SAVE, this.saveIdDepartment, IdDepartmentAdminEvent);
		this.mapListener(this.grid, IdDepartmentAdminEvent.DELETE, this.deleteIdDepartment, IdDepartmentAdminEvent);
		var adminEvent: AdminEvent = new AdminEvent(AdminEvent.GET_DEPT)
		this.dispatch(adminEvent);
		return this;
	}

	private getDeptCC(event: AdminEvent): void {
		this.adminService.getAllDepartments();
	}

	private popIdDepartmentClass(event: AdminEvent): void {
		this.grid.setDataProvider(ArrayCollection.from(event.departmentsData));
		this.grid.refreshCells()
	}

	private deleteIdDepartment(event: IdDepartmentAdminEvent): void {
		var iddepartmentClass: IdDepartment = event.Department;
		this.adminService.deleteIdDepartment(iddepartmentClass);
	}

	private saveIdDepartment(event: IdDepartmentAdminEvent): void {
		var iddepartmentClass: IdDepartment = event.Department;
		this.adminService.saveIdDepartment(iddepartmentClass);
	}
}



