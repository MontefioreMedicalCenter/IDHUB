import AdminService from "../../../service/cfc/AdminService.ts";
import IdDepartmentModifier from "../Views/IdDepartmentModifier";
import Mediator from "./Mediator.ts";
import AdminEvent from "../../../events/AdminEvent.ts";
import IdTitleAdminEvent from "../../../events/IdTitleAdminEvent.ts";

import IdTitle from "../../../vo/main/IdTitle";
import DataGrid from "../../../shared/components/ExtendedDataGrid";
import ArrayCollection from "../../../vo/ArrayCollection";
export default class TitleMediator extends Mediator {
	/*[Inject]*/
	public grid: DataGrid
	/*[Inject]*/
	public adminService: AdminService = AdminService.getInstance();

		/*override*/ public onRegister(grid: DataGrid) {
		this.grid = grid;
		this.mapListener(this.eventDispatcher, AdminEvent.GET_TITLE, this.getTitle, AdminEvent);
		this.mapListener(this.eventDispatcher, AdminEvent.POP_TITLE, this.popTitle, AdminEvent);
		this.mapListener(this.grid, IdTitleAdminEvent.SAVE, this.saveTitle, IdTitleAdminEvent);
		this.mapListener(this.grid, IdTitleAdminEvent.DELETE, this.deleteTitle, IdTitleAdminEvent);
		var adminEvent: AdminEvent = new AdminEvent(AdminEvent.GET_TITLE)
		this.dispatch(adminEvent);
		return this;
	}

	private getTitle(event: AdminEvent): void {
		this.adminService.getAllTitle();
	}

	private popTitle(event: AdminEvent): void {
		this.grid.setDataProvider(ArrayCollection.from(event.titleData))
		this.grid.refreshCells();
	}

	private deleteTitle(event: IdTitleAdminEvent): void {
		var title: IdTitle = event.title;
		this.adminService.deleteIdTitle(title);
	}

	private saveTitle(event: IdTitleAdminEvent): void {
		var title: IdTitle = event.title
		this.adminService.saveIdTitle(title);
	}
}

