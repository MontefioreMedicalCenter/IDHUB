
export default class IdCampusCodeMediator{
	
}
	// export default class IdCampusCodeMediator extends Mediator
	// {
	// 	/*[Inject]*/
	// 	public view:IdCampusCodeModifier
	// 	/*[Inject]*/
	// 	public adminService:AdminService
	// 	private log:ILogger=this.Log.getLogger("IdCampusCodeMediator");
		
	// 	/*override*/ public onRegister():void
	// 	{
	// 		super.onRegister();
	// 		this.eventMap.mapListener(this.eventDispatcher, AdminEvent.GET_CAMPUSCODE, this.getCampusCodes, AdminEvent);
	// 		this.eventMap.mapListener(this.eventDispatcher, AdminEvent.POP_CAMPUSCODE, this.popIdCampusCodeGW, AdminEvent);
	// 		this.eventMap.mapListener(this.view, IdCampusCodeAdminEvent.SAVE, this.saveIdCampusCode, IdCampusCodeAdminEvent);
	// 		this.eventMap.mapListener(this.view, IdCampusCodeAdminEvent.DELETE, this.deleteIdCampusCode, IdCampusCodeAdminEvent);
	// 		var  adminEvent:AdminEvent = new AdminEvent(AdminEvent.GET_CAMPUSCODE)
	// 		this.dispatch(adminEvent);
	// 	}
		
	// 	private getCampusCodes(event:AdminEvent):void{ 
	// 		this.adminService.getAllCampusCodes();
	// 	}
		
	// 	private popIdCampusCodeGW(event:AdminEvent):void{
	// 		this.view.grid.dataProvider=event.campuscodeData
	// 		this.view.grid.refreshCells()
	// 	}
		
	// 	private saveIdCampusCode(event:IdCampusCodeAdminEvent):void{
	// 		var idcampusClass:IdCampusCode = event.CampusCode;
	// 		this.adminService.saveIdCampusCode(idcampusClass);
	// 	}
		
	// 	private deleteIdCampusCode(event:IdCampusCodeAdminEvent):void{
	// 		var idcampusClass:IdCampusCode = event.CampusCode;
	// 		this.adminService.deleteCampusCode(event.CampusCode);
	// 	}
	// }



