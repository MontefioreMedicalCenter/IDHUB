import ServiceProxyBase from "./ServiceProxyBase";

export default class StorageService extends ServiceProxyBase {
    constructor(props) {
        super(props);
        this.source = ''
    }

    listDocumentLibraryFiles(resultHandler, faultHandler) {

        if (typeof faultHandler == "undefined") faultHandler = null;

        return this.callServiceMethod(
            'get',
            'IdentityHub/api/storagesvc/listDocumentLibraryFiles',
            null,
            null,
            resultHandler,
            faultHandler
        );
    }



}

StorageService.prototype.typeName = StorageService.typeName = "StorageService"; //for quick inspection
StorageService.instance = null;
StorageService.getInstance = () => {
    if (StorageService.instance == null) {
        StorageService.instance = new StorageService();
    }
    return StorageService.instance;
};