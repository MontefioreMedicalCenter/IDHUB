export default class IdDepartmentMediator{
	
}
	// export default class IdDepartmentMediator extends Mediator
	// {
	// 	/*[Inject]*/
	// 	public view:IdDepartmentModifier
	// 	/*[Inject]*/
	// 	public adminService:AdminService
	// 	private log:ILogger=this.Log.getLogger("IdDepartmentModifierMediator");

	// 	/*override*/ public onRegister():void
	// 	{
	// 		super.onRegister();
	// 		this.mapListener(this.eventDispatcher, AdminEvent.GET_DEPT, this.getDeptCC, AdminEvent);
	// 		this.mapListener(this.eventDispatcher, AdminEvent.POP_DEPT, this.popIdDepartmentClass, AdminEvent);
	// 		this.mapListener(this.view, IdDepartmentAdminEvent.SAVE, this.saveIdDepartment, IdDepartmentAdminEvent);
	// 		this.mapListener(this.view, IdDepartmentAdminEvent.DELETE, this.deleteIdDepartment, IdDepartmentAdminEvent);
	// 		var  adminEvent:AdminEvent = new AdminEvent(AdminEvent.GET_DEPT)
	// 		this.dispatch(adminEvent);
	// 	}
		
	// 	private getDeptCC(event:AdminEvent):void{ 
	// 		this.adminService.getAllDepartments();
	// 	}
		
	// 	private popIdDepartmentClass(event:AdminEvent):void{
	// 			this.view.grid.dataProvider=event.departmentsData
	// 			this.view.grid.refreshCells()
	// 	}
		
	// 	private deleteIdDepartment(event:IdDepartmentAdminEvent):void{
	// 		var iddepartmentClass:IdDepartment = event.Department;
	// 		this.adminService.deleteIdDepartment(iddepartmentClass);
	// 	}
		
	// 	private saveIdDepartment(event:IdDepartmentAdminEvent):void{
	// 		var iddepartmentClass:IdDepartment = event.Department;
	// 		this.adminService.saveIdDepartment(iddepartmentClass);
	// 	}
	// }



