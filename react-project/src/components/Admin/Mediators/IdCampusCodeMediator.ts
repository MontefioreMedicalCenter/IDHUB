import AdminService from "../../../service/cfc/AdminService.ts";
import Mediator from "./Mediator.ts";
import AdminEvent from "../../../events/AdminEvent.ts";
import IdCampusCodeAdminEvent from "../../../events/IdCampusCodeAdminEvent.ts";

import IdCampusCode from "../../../vo/main/IdCampusCode";
import DataGrid from "../../../shared/components/ExtendedDataGrid";
import ArrayCollection from "../../../vo/ArrayCollection";

export default class IdCampusCodeMediator extends Mediator {
	/*[Inject]*/
	public grid: DataGrid
	/*[Inject]*/
	public adminService: AdminService = AdminService.getInstance();

		/*override*/ public onRegister(grid: DataGrid): void {
		this.grid = grid;

		this.mapListener(this.eventDispatcher, AdminEvent.GET_CAMPUSCODE, this.getCampusCodes, AdminEvent);
		this.mapListener(this.eventDispatcher, AdminEvent.POP_CAMPUSCODE, this.popIdCampusCodeGW, AdminEvent);
		this.mapListener(this.grid, IdCampusCodeAdminEvent.SAVE, this.saveIdCampusCode, IdCampusCodeAdminEvent);
		this.mapListener(this.grid, IdCampusCodeAdminEvent.DELETE, this.deleteIdCampusCode, IdCampusCodeAdminEvent);
		var adminEvent: AdminEvent = new AdminEvent(AdminEvent.GET_CAMPUSCODE)
		this.dispatch(adminEvent);
		return this;
	}

	private getCampusCodes(event: AdminEvent): void {
		this.adminService.getAllCampusCodes();
	}

	private popIdCampusCodeGW(event: AdminEvent): void {
		this.grid.setDataProvider(ArrayCollection.from(event.campuscodeData))
		this.grid.refreshCells()
	}

	private saveIdCampusCode(event: IdCampusCodeAdminEvent): void {
		var idcampusClass: IdCampusCode = event.CampusCode;
		this.adminService.saveIdCampusCode(idcampusClass);
	}

	private deleteIdCampusCode(event: IdCampusCodeAdminEvent): void {
		var idcampusClass: IdCampusCode = event.CampusCode;
		this.adminService.deleteCampusCode(event.CampusCode);
	}
}



