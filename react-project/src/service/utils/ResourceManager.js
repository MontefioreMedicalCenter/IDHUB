// @flow
// FIXME: Add correct types where FlowFixMe's have been used

import axios from "axios";

export default class ResourceManager {
  localeObj: Object;
  localeMap: Object;
  localeMapEnglish : Object;
  localeChain: Array;
  locale: String;

  rootPath: String;

  constructor() {
    this.localeChain = ["en_US"];
    this.locale = ["en_US"];
    this.localeObj = {};
    this.localeMap = {};
    this.localeMapEnglish = {};
    // eslint-disable-next-line no-undef
    this.rootPath = `${process.env.PUBLIC_URL}/locale`;
  }

  toResultObject = (promise) => {
    return promise
      .then((result) => ({ success: true, result }))
      .catch((error) => ({ success: false, error }));
  };

  loadLocaleResources = (
    resourceIds: String | Array<String>,
    ready: Function,
  ) => {
    const promises = [];

    if (!Array.isArray(resourceIds)) {
      resourceIds = [resourceIds];
    }

    for (let i = 0; i < resourceIds.length; i++) {
      [].forEach.call(this.localeChain, (locale) => {
        promises.push(
          axios.get(
            this.rootPath +
              "/" +
              locale +
              "/" +
              resourceIds[i] +
              ".json#" +
              resourceIds[i] +
              "&" +
              locale,
            {
              /*
                    transformResponse: [
                        (data, headers) => {
                            //eslint no-param-reassign:0
                            if (typeof data === 'string' && headers["content-type"].indexOf("application/json") !== -1) {
                              try {
                                data = JSON.parse(data);
                              } catch (e) { 
                                  data = {};
                               }
                            }
                            return data;
                        }
                    ]
                    */
            },
          ),
        );
      });
    }

    Promise.all(promises.map(this.toResultObject)).then((responses) => {
      this.localeMap = {};
      // if( !this.localeMap.hasOwnProperty(this.locale) ) {
      //     this.localeMap[this.locale] = {};
      // }
      let successCount = 0;
      responses.forEach((response) => {
        if (response.success) {
          const resourceTokenIndex = response.result.config.url.lastIndexOf(
            "#",
          );
          const params = response.result.config.url
            .substring(resourceTokenIndex + 1)
            .split("&");
          const resourceId = params[0];
          const locale = params[1];
          this.localeMap[locale] = this.localeMap[locale] || {};
          this.localeMap[locale][resourceId] = response.result.data;
          successCount++;
        }
      });

      if (ready) {
        ready({ response: successCount ? "success" : "failure" });
      }
    });
  };

  getString = (resourceId: String, key: String) => {
    for (let i = 0; i < this.localeChain.length; i++) {
      const locale = this.localeChain[i];
      if (this.localeMap.hasOwnProperty(locale)) {
        const currentResourceBundle = this.localeMap[locale];
        if (currentResourceBundle.hasOwnProperty(resourceId)) {
          const currentResource = currentResourceBundle[resourceId];
          if (currentResource && currentResource.hasOwnProperty(key)) {
            return currentResource[key];
          }
        }
      }
    }
    ResourceManager.invalidResources = ResourceManager.invalidResources  || {};
    if(!ResourceManager.invalidResources[key]){
      ResourceManager.invalidResources[key]=resourceId + ":" + key;
    }
    for (let i = 0; i < this.localeChain.length; i++) {
      if (this.localeMapEnglish.hasOwnProperty("en_US")) {
        const currentResourceBundle = this.localeMapEnglish["en_US"];
        if (currentResourceBundle.hasOwnProperty(resourceId)) {
          const currentResource = currentResourceBundle[resourceId];
          if (currentResource && currentResource.hasOwnProperty(key)) {
            return currentResource[key];
          }
        }
      }
    }
    return key; //I am changing this, so if the resource manager does not have the key, we just return the ID - and figure out why resource manager does not have key.
  };

  getStringObj = (resourceId: String, key: String) => {
    const resourceObj = this.localeObj.children.find((item) => item.Screen_Name === (resourceId || "MRX_CommonProperties"));
    const resourceStrObj = resourceObj.children.find((resourceStr) => resourceStr.Property_Name === key);

    return resourceStrObj ? resourceStrObj : key;
  };
}

ResourceManager._instance = null;
ResourceManager.instance = () => {
  if (!ResourceManager._instance) {
    ResourceManager._instance = new ResourceManager();
  }
  return ResourceManager._instance;
};
