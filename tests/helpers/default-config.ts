/**
 * JavaScript and Node.js SDK for OpenFGA
 *
 * API version: 1.x
 * Website: https://openfga.dev
 * Documentation: https://openfga.dev/docs
 * Support: https://openfga.dev/community
 * License: [Apache-2.0](https://github.com/openfga/js-sdk/blob/main/LICENSE)
 *
 * NOTE: This file was auto generated by OpenAPI Generator (https://openapi-generator.tech). DO NOT EDIT.
 */


import { ClientConfiguration, UserClientConfigurationParams } from "../../client";
import { CredentialsMethod } from "../../credentials";

export const OPENFGA_STORE_ID = "01H0H015178Y2V4CX10C2KGHF4";
export const OPENFGA_MODEL_ID = "01HWBBMZTT7F1M97DVXQK4Z7J3";
export const OPENFGA_API_URL = "https://api.fga.example";
export const OPENFGA_API_TOKEN_ISSUER = "tokenissuer.fga.example";
export const OPENFGA_API_AUDIENCE = "https://api.fga.example/";
export const OPENFGA_CLIENT_ID = "01H0H3D8TD07EWAQHXY9BWJG3V";
export const OPENFGA_CLIENT_SECRET = "this-is-very-secret";
export const OPENFGA_API_TOKEN = "fga_abcdef";

export const baseConfig: UserClientConfigurationParams = {
  storeId: OPENFGA_STORE_ID,
  authorizationModelId: OPENFGA_MODEL_ID,
  apiUrl: OPENFGA_API_URL,
  credentials: {
    method: CredentialsMethod.ClientCredentials,
    config: {
      apiTokenIssuer: OPENFGA_API_TOKEN_ISSUER,
      apiAudience: OPENFGA_API_AUDIENCE,
      clientId: OPENFGA_CLIENT_ID,
      clientSecret: OPENFGA_CLIENT_SECRET,
    }
  }
};

export const defaultConfiguration = new ClientConfiguration(baseConfig);
