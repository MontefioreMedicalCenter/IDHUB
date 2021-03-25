import VoBase from "../VoBase";
import IdUser from "./IdUser";

export default class LoginModel extends VoBase {
    get user() {
        return this._user;
    }
    set user(value) {
        this._user = value;
    }

    getComplexProperty(key){
        if(key === "user"){
            return new IdUser();
        }
        return super.getComplexProperty(key);
    }
}