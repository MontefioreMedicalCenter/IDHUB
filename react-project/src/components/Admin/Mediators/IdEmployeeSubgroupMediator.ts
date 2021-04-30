export default class IdEmployeeSubgroupMediator{
	
}
	// export default class IdEmployeeSubgroupMediator extends Mediator
	// {
	// 	/*[Inject]*/
	// 	public view:IdEmployeeSubgroupModifier
	// 	/*[Inject]*/
	// 	public adminService:AdminService
	// 	private log:ILogger=this.Log.getLogger("IdEmployeeSubgroupMediator");
		
	// 	/*override*/ public onRegister():void
	// 	{
	// 		super.onRegister();
	// 		this.eventMap.mapListener(this.eventDispatcher, AdminEvent.GET_EMPSUBGROUP, this.getEmployeeSubgroups, AdminEvent);
	// 		this.eventMap.mapListener(this.eventDispatcher, AdminEvent.POP_EMPSUBGROUP, this.popEmployeeSubgroups, AdminEvent);
	// 		this.eventMap.mapListener(this.view, IdEmployeeSubgroupAdminEvent.SAVE, this.saveIdEmployeeSubgroup, IdEmployeeSubgroupAdminEvent);
	// 		this.eventMap.mapListener(this.view, IdEmployeeSubgroupAdminEvent.DELETE, this.deleteIdEmployeeSubgroup, IdEmployeeSubgroupAdminEvent);
	// 		var  adminEvent:AdminEvent = new AdminEvent(AdminEvent.GET_EMPSUBGROUP)
	// 		this.dispatch(adminEvent);
	// 	}
		
	// 	private getEmployeeSubgroups(event:AdminEvent):void{ 
	// 		this.adminService.getAllIdEmployeeGroups();
	// 	}
		
	// 	private popEmployeeSubgroups(event:AdminEvent):void{
	// 		this.view.grid.dataProvider=event.employeeSubgroupData
	// 		this.view.grid.refreshCells()
	// 	}
		
	// 	private saveIdEmployeeSubgroup(event:IdEmployeeSubgroupAdminEvent):void{
	// 		var val:IdEmployeeSubgroup = event.EmployeeSubgroup;
	// 		this.adminService.saveIdEmployeeSubgroup(val);
	// 	}
		
	// 	private deleteIdEmployeeSubgroup(event:IdEmployeeSubgroupAdminEvent):void{
	// 		var val:IdEmployeeSubgroup = event.EmployeeSubgroup;
	// 		this.adminService.deleteEmployeeSubgroup(event.EmployeeSubgroup);
	// 	}
	// }



