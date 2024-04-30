/**
 * JavaScript and Node.js SDK for OpenFGA
 *
 * API version: 0.1
 * Website: https://openfga.dev
 * Documentation: https://openfga.dev/docs
 * Support: https://openfga.dev/community
 * License: [Apache-2.0](https://github.com/openfga/js-sdk/blob/main/LICENSE)
 *
 * NOTE: This file was auto generated by OpenAPI Generator (https://openapi-generator.tech). DO NOT EDIT.
 */


// Some imports not used depending on template conditions
import globalAxios, { AxiosInstance } from "axios";
import * as http from "http";
import * as https from "https";

import { Configuration, UserConfigurationParams } from "./configuration";
import { Credentials } from "./credentials";

const DEFAULT_CONNECTION_TIMEOUT_IN_MS = 10000;

/**
 *
 * @export
 * @interface RequestArgs
 */
export interface RequestArgs {
    url: string;
    options: any;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
  protected configuration: Configuration;
  protected credentials: Credentials;

  constructor(configuration: UserConfigurationParams | Configuration, protected axios?: AxiosInstance) {
    if (configuration instanceof Configuration) {
      this.configuration = configuration;
    } else {
      this.configuration = new Configuration(configuration);
    }
    this.configuration.isValid();

    this.credentials = Credentials.init(this.configuration);

    if (!this.axios) {
      const httpAgent = new http.Agent({ keepAlive: true });
      const httpsAgent = new https.Agent({ keepAlive: true });
      this.axios = globalAxios.create({
        httpAgent,
        httpsAgent,
        timeout: DEFAULT_CONNECTION_TIMEOUT_IN_MS,
        headers: this.configuration.baseOptions?.headers,
      });
    }
  }
}
