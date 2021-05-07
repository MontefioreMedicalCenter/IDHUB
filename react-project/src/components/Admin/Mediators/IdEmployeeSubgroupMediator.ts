import AdminService from "../../../service/cfc/AdminService.ts";
import IdEmployeeSubgroupModifier from "../Views/IdEmployeeSubgroupModifier";
import Mediator from "./Mediator.ts";
import AdminEvent from "../../../events/AdminEvent.ts";
import IdEmployeeSubgroupAdminEvent from "../../../events/IdEmployeeSubgroupAdminEvent.ts";

import IdTitle from "../../../vo/main/IdTitle";
import DataGrid from "../../../shared/components/ExtendedDataGrid";
import ArrayCollection from "../../../vo/ArrayCollection";
export default class IdEmployeeSubgroupMediator extends Mediator {
	/*[Inject]*/
	public grid: DataGrid
	/*[Inject]*/
	public adminService: AdminService = AdminService.getInstance();

		/*override*/ public onRegister(grid: DataGrid): void {
		this.grid = grid;
		this.mapListener(this.eventDispatcher, AdminEvent.GET_EMPSUBGROUP, this.getEmployeeSubgroups, AdminEvent);
		this.mapListener(this.eventDispatcher, AdminEvent.POP_EMPSUBGROUP, this.popEmployeeSubgroups, AdminEvent);
		this.mapListener(this.grid, IdEmployeeSubgroupAdminEvent.SAVE, this.saveIdEmployeeSubgroup, IdEmployeeSubgroupAdminEvent);
		this.mapListener(this.grid, IdEmployeeSubgroupAdminEvent.DELETE, this.deleteIdEmployeeSubgroup, IdEmployeeSubgroupAdminEvent);
		var adminEvent: AdminEvent = new AdminEvent(AdminEvent.GET_EMPSUBGROUP)
		this.dispatch(adminEvent);
		return this;
	}

	private getEmployeeSubgroups(event: AdminEvent): void {
		this.adminService.getAllIdEmployeeGroups();
	}

	private popEmployeeSubgroups(event: AdminEvent): void {
		this.grid.setDataProvider(ArrayCollection.from(event.employeeSubgroupData));
		this.grid.refreshCells();
	}

	private saveIdEmployeeSubgroup(event: IdEmployeeSubgroupAdminEvent): void {
		var val: IdEmployeeSubgroup = event.EmployeeSubgroup;
		this.adminService.saveIdEmployeeSubgroup(val);
	}

	private deleteIdEmployeeSubgroup(event: IdEmployeeSubgroupAdminEvent): void {
		var val: IdEmployeeSubgroup = event.EmployeeSubgroup;
		this.adminService.deleteEmployeeSubgroup(event.EmployeeSubgroup);
	}
}



