/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
import ServiceProxyBase from "./ServiceProxyBase";
export default class LoginService extends ServiceProxyBase {
  constructor(props) {
    super(props);
    this.source = ''  }

  getClassNames() {
    return ["LoginService", "ServiceProxyBase"];
  }
}

LoginService.prototype.typeName = LoginService.typeName = "LoginService"; //for quick inspection
LoginService.instance = null;
LoginService.getInstance = () => {
  if (LoginService.instance == null) {
    LoginService.instance = new LoginService();
  }
  return LoginService.instance;
};
