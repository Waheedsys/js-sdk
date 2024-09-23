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


import globalAxios, { AxiosInstance } from "axios";

import { assertParamExists, isWellFormedUriString } from "../validation";
import { FgaApiAuthenticationError, FgaApiError, FgaError, FgaValidationError } from "../errors";
import { attemptHttpRequest } from "../common";
import { AuthCredentialsConfig, ClientCredentialsConfig, CredentialsMethod } from "./types";
import { TelemetryAttributes } from "../telemetry/attributes";
import { MetricRecorder } from "../telemetry/metrics";
import { TelemetryCounters } from "../telemetry/counters";
import { TelemetryConfiguration } from "../telemetry/configuration";

export class Credentials {
  private accessToken?: string;
  private accessTokenExpiryDate?: Date;

  public static init(configuration: { credentials: AuthCredentialsConfig, telemetry: TelemetryConfiguration }): Credentials {
    return new Credentials(configuration.credentials, globalAxios, configuration.telemetry);
  }

  public constructor(private authConfig: AuthCredentialsConfig, private axios: AxiosInstance = globalAxios, private telemetryConfig: TelemetryConfiguration) {
    this.initConfig();
    this.isValid();
  }

  /**
   * Sets the default config values
   * @private
   */
  private initConfig() {
    switch (this.authConfig?.method) {
    case CredentialsMethod.ApiToken:

      if (this.authConfig.config) {
        if (!this.authConfig.config.headerName) {
          this.authConfig.config.headerName = "Authorization";
        }
        if (!this.authConfig.config.headerValuePrefix) {
          this.authConfig.config.headerValuePrefix = "Bearer";
        }
      }
      break;
    case CredentialsMethod.None:
    default:
      break;
    }
  }

  /**
   *
   * @throws {FgaValidationError}
   */
  public isValid(): void {
    const { authConfig } = this;
    switch (authConfig?.method) {
    case CredentialsMethod.None:
      break;
    case CredentialsMethod.ApiToken:
      assertParamExists("Credentials", "config.token", authConfig.config?.token);
      assertParamExists("Credentials", "config.headerName", authConfig.config?.headerName);
      assertParamExists("Credentials", "config.headerName", authConfig.config?.headerName);
      break;
    case CredentialsMethod.ClientCredentials:
      assertParamExists("Credentials", "config.clientId", authConfig.config?.clientId);
      assertParamExists("Credentials", "config.clientSecret", authConfig.config?.clientSecret);
      assertParamExists("Credentials", "config.apiTokenIssuer", authConfig.config?.apiTokenIssuer);
      assertParamExists("Credentials", "config.apiAudience", authConfig.config?.apiAudience);

      if (!isWellFormedUriString(`https://${authConfig.config?.apiTokenIssuer}`)) {
        throw new FgaValidationError(
          `Configuration.apiTokenIssuer does not form a valid URI (https://${authConfig.config?.apiTokenIssuer})`);
      }
      break;
    }
  }

  /**
   * Get access token, request a new one if not cached or expired
   * @return string
   */
  public async getAccessTokenHeader(): Promise<{ name: string; value: string } | undefined> {
    const accessTokenValue = await this.getAccessTokenValue();
    switch (this.authConfig?.method) {
    case CredentialsMethod.None:
      return;
    case CredentialsMethod.ApiToken:
      return {
        name: this.authConfig.config.headerName,
        value: `${this.authConfig.config.headerValuePrefix ? `${this.authConfig.config.headerValuePrefix} ` : ""}${accessTokenValue}`
      };
    case CredentialsMethod.ClientCredentials:
      return {
        name: "Authorization",
        value: `Bearer ${accessTokenValue}`
      };
    }
  }

  private async getAccessTokenValue(): Promise<string | undefined> {
    switch (this.authConfig?.method) {
    case CredentialsMethod.None:
      return;
    case CredentialsMethod.ApiToken:
      return this.authConfig.config.token;
    case CredentialsMethod.ClientCredentials:
      if (this.accessToken && (!this.accessTokenExpiryDate || this.accessTokenExpiryDate > new Date())) {
        return this.accessToken;
      }

      return this.refreshAccessToken();
    }
  }

  /**
   * Request new access token
   * @return string
   */
  private async refreshAccessToken() {
    const clientCredentials = (this.authConfig as { method: CredentialsMethod.ClientCredentials; config: ClientCredentialsConfig })?.config;

    try {
      const response = await attemptHttpRequest<{
          client_id: string,
          client_secret: string,
          audience: string,
          grant_type: "client_credentials",
        }, {
        access_token: string,
        expires_in: number,
      }>({
        url: `https://${clientCredentials.apiTokenIssuer}/oauth/token`,
        method: "post",
        data: {
          client_id: clientCredentials.clientId,
          client_secret: clientCredentials.clientSecret,
          audience: clientCredentials.apiAudience,
          grant_type: "client_credentials",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }, {
        maxRetry: 3,
        minWaitInMs: 100,
      }, globalAxios);

      if (response) {
        this.accessToken = response.data.access_token;
        this.accessTokenExpiryDate = new Date(Date.now() + response.data.expires_in * 1000);
      }

      if (this.telemetryConfig?.metrics?.counterCredentialsRequest?.attributes) {

        let attributes = {};

        attributes = TelemetryAttributes.fromRequest({
          credentials: clientCredentials,
          // resendCount: 0, // TODO: implement resend count tracking, not available in the current context
          attributes,
        });

        attributes = TelemetryAttributes.fromResponse({
          response,
          credentials: clientCredentials,
          attributes,
        });

        attributes = TelemetryAttributes.prepare(attributes);
        this.telemetryConfig.recorder.counter(TelemetryCounters.credentialsRequest, 1, attributes);
      }

      return this.accessToken;
    } catch (err: unknown) {
      if (err instanceof FgaApiError) {
        (err as any).constructor = FgaApiAuthenticationError;
        (err as any).name = "FgaApiAuthenticationError";
        (err as any).clientId = clientCredentials.clientId;
        (err as any).audience = clientCredentials.apiAudience;
        (err as any).grantType = "client_credentials";
      }

      throw err;
    }
  }
}
