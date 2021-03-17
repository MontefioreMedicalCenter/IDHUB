import { TypedObject } from "../../flexicious";

/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
// const uiUtil = flexiciousNmsp.UIUtils;

// const flxConstants = flexiciousNmsp.Constants;

export default class ApplicationModel extends TypedObject {
  constructor() {
    super();
    this.rootURL = null;
    this.screenIsDirty = false;
    this.currentSection = "Home";
    this.currentSectionState = "Home";
    this.nonSecureRootURL = null;
    this.appName = "Montefiore";

    this.user = null;
  }

  getClassNames() {
    return ["ApplicationModel", "TypedObject"];
  }

  getScreenWidth() {
    // const screen = FlexGlobals.topLevelApplication.systemManager.screen;
    // return screen.width;
  }

  getScreenHeight() {
    // const screen = FlexGlobals.topLevelApplication.systemManager.screen;
    // return screen.height;
  }
}

// flexiciousNmsp.ApplicationModel = ApplicationModel; //add to name space
ApplicationModel.prototype.typeName = ApplicationModel.typeName =
  "ApplicationModel"; //for quick inspection
ApplicationModel.instance = null;

ApplicationModel.getInstance = () => {
  if (!ApplicationModel.instance) {
    ApplicationModel.instance = new ApplicationModel();
  } else {
    const appVariables = fetchFromLocalStorage("app");

    if (appVariables) {
      ApplicationModel.instance = fetchFromLocalStorage("app");
    }

  return ApplicationModel.instance;
};
