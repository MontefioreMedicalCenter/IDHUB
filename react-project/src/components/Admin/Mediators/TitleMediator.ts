export default class TitleMediator{
	
}
	// export default class TitleMediator extends Mediator
	// {
	// 	/*[Inject]*/
	// 	public view:TitleModifier
	// 	/*[Inject]*/
	// 	public adminService:AdminService
	// 	private log:ILogger=this.Log.getLogger("IdTitleMediator");

	// 	/*override*/ public onRegister():void
	// 	{
	// 		super.onRegister();
	// 		this.eventMap.mapListener(this.eventDispatcher, AdminEvent.GET_TITLE, this.getTitle, AdminEvent);
	// 		this.eventMap.mapListener(this.eventDispatcher, AdminEvent.POP_TITLE, this.popTitle, AdminEvent);
	// 		this.eventMap.mapListener(this.view, IdTitleAdminEvent.SAVE, this.saveTitle, IdTitleAdminEvent);
	// 		this.eventMap.mapListener(this.view, IdTitleAdminEvent.DELETE, this.deleteTitle, IdTitleAdminEvent);
	// 		var  adminEvent:AdminEvent = new AdminEvent(AdminEvent.GET_TITLE)
	// 		this.dispatch(adminEvent);
	// 	}
		
	// 	private getTitle(event:AdminEvent):void{ 
	// 		this.adminService.getAllTitle();
	// 	}
		
	// 	private popTitle(event:AdminEvent):void{
	// 			this.view.grid.dataProvider=event.titleData
	// 			this.view.grid.refreshCells()
	// 	}
		
	// 	private deleteTitle(event:IdTitleAdminEvent):void{
	// 		var title:IdTitle = event.title;
	// 		this.adminService.deleteIdTitle(title);
	// 	}
		
	// 	private saveTitle(event:IdTitleAdminEvent):void{
	// 		var title:IdTitle= event.title
	// 		this.adminService.saveIdTitle(title);
	// 	}
	// }

