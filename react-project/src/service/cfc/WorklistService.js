import ServiceProxyBase from "./ServiceProxyBase";

export default class WorklistService extends ServiceProxyBase {
  constructor(props) {
    super(props);
    this.source = ''
  }

  findWorklistGroups(resultHandler, faultHandler) {

    if (typeof faultHandler == "undefined") faultHandler = null;
    var headerData = {
      userName: localStorage.getItem("user-id"),
      "Content-Type": "application/json"
    }

    return this.callServiceMethod(
      'post',
      'IdentityHub/api/worklistsvc/findWorklistGroups',
      null,
      null,
      resultHandler,
      faultHandler,
      null,
      headerData
    );
  }
}

WorklistService.prototype.typeName = WorklistService.typeName = "WorklistService"; //for quick inspection
WorklistService.instance = null;
WorklistService.getInstance = () => {
  if (WorklistService.instance == null) {
    WorklistService.instance = new WorklistService();
  }
  return WorklistService.instance;
};