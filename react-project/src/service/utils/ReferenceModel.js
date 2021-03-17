/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */

// @flow
// FIXME: Add correct types where FlowFixMe's have been used

import { TypedObject } from "../../flexicious";


export default class ReferenceModel extends TypedObject {
  constructor() {
    super();
    //this.currentServicesFolder = "cfc20.";
  }

  resetAsyncCallCounter() {
    this.asyncCallCounter = this.asyncCallExecutedCounter = 0;
  }

  isAllAsyncCallsExecuted = () => {
    if (this.asyncCallCounter > this.asyncCallExecutedCounter) {
      this.asyncCallExecutedCounter++;
    }
    if (this.asyncCallCounter === this.asyncCallExecutedCounter) {
      this.resetAsyncCallCounter();
      return true;
    }
    return false;
  };
}

ReferenceModel.prototype.typeName = ReferenceModel.typeName = "ReferenceModel"; //for quick inspection
ReferenceModel.instance = null;
ReferenceModel.getInstance = () => {
  if (!ReferenceModel.instance) {
    ReferenceModel.instance = new ReferenceModel();
  }

  return ReferenceModel.instance;
};
