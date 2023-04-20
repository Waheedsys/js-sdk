/**
 * JavaScript and Node.js SDK for OpenFGA
 *
 * API version: 0.1
 * Website: https://openfga.dev
 * Documentation: https://openfga.dev/docs
 * Support: https://discord.gg/8naAwJfWN6
 * License: [Apache-2.0](https://github.com/openfga/js-sdk/blob/main/LICENSE)
 *
 * NOTE: This file was auto generated by OpenAPI Generator (https://openapi-generator.tech). DO NOT EDIT.
 */


import * as nock from "nock";

import { ClientWriteStatus, CredentialsMethod, FgaValidationError, OpenFgaClient } from "../index";
import { baseConfig, defaultConfiguration, getNocks } from "./helpers";

const nocks = getNocks(nock);
nock.disableNetConnect();

describe("OpenFGA Client", () => {

  describe("Using the OpenFGA Client", () => {
    let fgaClient: OpenFgaClient;

    beforeAll(() => {
      fgaClient = new OpenFgaClient({ ...baseConfig, credentials: { method: CredentialsMethod.None } });
    });

    afterEach(() => {
      nock.cleanAll();
    });

    /* Stores */

    describe("ListStores", () => {
      it("should properly call the OpenFga API", async () => {
        const store = { id: "some-id", name: "some-name" };
        const scope = nocks.listStores(defaultConfiguration.getBasePath(), { stores: [store] });

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.listStores();

        expect(scope.isDone()).toBe(true);
        expect(response.stores).toHaveLength(1);
        expect(response.stores?.[0]).toMatchObject(store);
      });
    });

    describe("CreateStore", () => {
      it("should properly call the OpenFga API", async () => {
        const store = { id: "some-id", name: "some-name" };
        const scope = nocks.createStore(defaultConfiguration.getBasePath(), store);

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.createStore(store);

        expect(scope.isDone()).toBe(true);
        expect(response).toMatchObject(store);
      });
    });

    describe("GetStore", () => {
      it("should properly call the OpenFga API", async () => {
        const store = { id: defaultConfiguration.storeId, name: "some-name" };
        const scope = nocks.getStore(store.id, defaultConfiguration.getBasePath(), store);

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.getStore();

        expect(scope.isDone()).toBe(true);
        expect(response).toMatchObject(store);
      });
    });

    describe("DeleteStore", () => {
      it("should properly call the OpenFga API", async () => {
        const scope = nocks.deleteStore(defaultConfiguration.storeId!);

        expect(scope.isDone()).toBe(false);
        await fgaClient.deleteStore();

        expect(scope.isDone()).toBe(true);
      });
    });

    /* Authorization Models */
    describe("ReadAuthorizationModels", () => {
      it("should properly call the OpenFga API", async () => {
        const scope = nocks.readAuthorizationModels(defaultConfiguration.storeId!);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.readAuthorizationModels();

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({
          authorization_models: expect.arrayContaining([]),
        });
      });
    });

    describe("WriteAuthorizationModel", () => {
      it("should properly call the OpenFga API", async () => {
        const authorizationModel = {
          schema_version: "1.1",
          type_definitions: [
            { type: "workspace", relations: { admin: { this: {} } } },
          ],
        };
        const scope = nocks.writeAuthorizationModel(
          baseConfig.storeId!,
          authorizationModel
        );

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.writeAuthorizationModel(
          authorizationModel
        );

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({ id: expect.any(String) });
      });
    });

    describe("ReadAuthorizationModel", () => {
      it("should properly call the OpenFga API", async () => {
        const modelId = "string";
        const scope = nocks.readSingleAuthzModel(defaultConfiguration.storeId!, modelId);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.readAuthorizationModel({ authorizationModelId: modelId });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({
          authorization_model: {
            id: expect.any(String),
            schema_version: "1.1",
            type_definitions: expect.arrayContaining([]),
          },
        });
      });
    });

    describe("ReadLatestAuthorizationModel", () => {
      it("should properly call the OpenFga API", async () => {
        const modelId = "some-id";
        const scope = nock(defaultConfiguration.getBasePath())
          .get(`/stores/${defaultConfiguration.storeId!}/authorization-models`)
          .query({ page_size: 1 })
          .reply(200, {
            authorization_models: [{ id: modelId, schema_version: "1.1", type_definitions: [] }],
          });

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.readLatestAuthorizationModel();

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({
          authorization_model: {
            id: expect.any(String),
            schema_version: "1.1",
            type_definitions: expect.arrayContaining([]),
          },
        });
      });
    });

    /* Relationship Tuples */
    describe("ReadChanges", () => {
      it("should properly call the OpenFga ReadChanges API", async () => {
        const type = "repo";
        const pageSize = 25;
        const continuationToken = "eyJwayI6IkxBVEVTVF9OU0NPTkZJR19hdXRoMHN0b3JlIiwic2siOiIxem1qbXF3MWZLZExTcUoyN01MdTdqTjh0cWgifQ==";

        const scope = nocks.readChanges(baseConfig.storeId!, type, pageSize, continuationToken);

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.readChanges({ type }, { pageSize, continuationToken });

        expect(scope.isDone()).toBe(true);
        expect(response).toMatchObject({ changes: expect.arrayContaining([]) });
      });
    });

    describe("Read", () => {
      it("should properly call the OpenFga Read API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.read(baseConfig.storeId!, tuple);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.read(tuple);

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({});
      });
    });

    describe("Write", () => {
      it("should properly call the OpenFga Write API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.write(baseConfig.storeId!);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.write({
          writes: [tuple],
        }, {
          authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1",
        });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({});
      });

      it("should properly chunk the calls when called in non-transaction mode", async () => {
        const tuples = [{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:2",
        }];
        const scope0 = nocks.write(baseConfig.storeId!).matchHeader("X-OpenFGA-Client-Method", "Write");
        const scope1 = nocks.write(baseConfig.storeId!).matchHeader("X-OpenFGA-Client-Method", "Write");
        const scope2 = nocks.write(baseConfig.storeId!).matchHeader("X-OpenFGA-Client-Method", "Write");

        expect(scope0.isDone()).toBe(false);
        expect(scope1.isDone()).toBe(false);
        expect(scope2.isDone()).toBe(false);
        const data = await fgaClient.write({
          writes: tuples,
        }, {
          authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1",
          transaction: { disable: true },
        });

        expect(scope0.isDone()).toBe(true);
        expect(scope1.isDone()).toBe(true);
        expect(scope2.isDone()).toBe(false);
        expect(data).toMatchObject({});
      });

      it("should not fail the request on errors in non-transaction mode", async () => {
        const tuples = [{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:2",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "reader",
          object: "workspace:3",
        }];
        const scope0 = nocks.write(baseConfig.storeId!).matchHeader("X-OpenFGA-Client-Method", "Write");
        const scope1 = nocks.write(baseConfig.storeId!).matchHeader("X-OpenFGA-Client-Method", "Write");
        const scope2 = nocks.write(baseConfig.storeId!, defaultConfiguration.getBasePath(), {
          "code": "validation_error",
          "message": "relation &#39;workspace#reader&#39; not found"
        }, 400).matchHeader("X-OpenFGA-Client-Method", "Write");

        expect(scope0.isDone()).toBe(false);
        expect(scope1.isDone()).toBe(false);
        expect(scope2.isDone()).toBe(false);
        const data = await fgaClient.write({
          writes: tuples,
        }, {
          authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1",
          transaction: { disable: true },
        });

        expect(scope0.isDone()).toBe(true);
        expect(scope1.isDone()).toBe(true);
        expect(scope2.isDone()).toBe(true);
        expect(data.writes.length).toBe(3);
        expect(data.writes.find(tuple => tuple.tuple_key.object === tuples[0].object)?.status).toBe(ClientWriteStatus.SUCCESS);
        expect(data.writes.find(tuple => tuple.tuple_key.object === tuples[1].object)?.status).toBe(ClientWriteStatus.SUCCESS);
        expect(data.writes.find(tuple => tuple.tuple_key.object === tuples[2].object)?.status).toBe(ClientWriteStatus.FAILURE);
      });
    });

    describe("WriteTuples", () => {
      it("should properly call the OpenFga Write API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.write(baseConfig.storeId!);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.writeTuples([tuple], {
          authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1",
        });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({});
      });
    });

    describe("DeleteTuples", () => {
      it("should properly call the OpenFga Write API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.write(baseConfig.storeId!);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.deleteTuples([tuple], {
          authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1",
        });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({});
      });
    });

    /* Relationship Queries */
    describe("Check", () => {
      it("should properly call the OpenFga Check API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.check(baseConfig.storeId!, tuple);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.check(tuple);

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({ allowed: expect.any(Boolean) });
      });
    });

    describe("BatchCheck", () => {
      it("should properly call the OpenFga Check API", async () => {
        const tuples = [{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "guest",
          object: "workspace:2",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "reader",
          object: "workspace:3",
        }];
        const scope0 = nocks.check(defaultConfiguration.storeId!, tuples[0], defaultConfiguration.getBasePath(), { allowed: true }, 200).matchHeader("X-OpenFGA-Client-Method", "BatchCheck");
        const scope1 = nocks.check(defaultConfiguration.storeId!, tuples[1], defaultConfiguration.getBasePath(), { allowed: false }, 200).matchHeader("X-OpenFGA-Client-Method", "BatchCheck");
        const scope2 = nocks.check(defaultConfiguration.storeId!, tuples[2], defaultConfiguration.getBasePath(), {
          "code": "validation_error",
          "message": "relation &#39;workspace#reader&#39; not found"
        }, 400).matchHeader("X-OpenFGA-Client-Method", "BatchCheck");

        expect(scope0.isDone()).toBe(false);
        expect(scope1.isDone()).toBe(false);
        expect(scope2.isDone()).toBe(false);
        const response = await fgaClient.batchCheck([tuples[0], tuples[1], tuples[2]]);

        expect(scope0.isDone()).toBe(true);
        expect(scope1.isDone()).toBe(true);
        expect(scope2.isDone()).toBe(true);
        expect(response.responses.length).toBe(3);
        expect(response.responses.sort((a, b) => String(a._request.object).localeCompare(b._request.object)))
          .toMatchObject(expect.arrayContaining([
            { _request: tuples[0], allowed: true, },
            { _request: tuples[1], allowed: false },
            { _request: tuples[2], error: expect.any(Error) },
          ]));
      });
    });

    describe("Expand", () => {
      it("should properly call the OpenFga Expand API", async () => {
        const tuple = {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        };
        const scope = nocks.expand(baseConfig.storeId!, tuple);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.expand(tuple, { authorizationModelId: "01GXSA8YR785C4FYS3C0RTG7B1" });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({});
      });
    });

    describe("ListObjects", () => {
      it("should call the api and return the response", async () => {
        const mockedResponse = { objects: ["document:roadmap"] };
        const scope = nocks.listObjects(baseConfig.storeId!, mockedResponse);

        expect(scope.isDone()).toBe(false);
        const response = await fgaClient.listObjects({
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "can_read",
          type: "document",
          contextualTuples:
            [{
              user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
              relation: "editor",
              object: "folder:product"
            }, {
              user: "folder:product",
              relation: "parent",
              object: "document:roadmap"
            }]
        }, {
          authorizationModelId: "01GAHCE4YVKPQEKZQHT2R89MQV",
        });

        expect(scope.isDone()).toBe(true);
        expect(response.objects).toHaveLength(mockedResponse.objects.length);
        expect(response.objects).toEqual(expect.arrayContaining(mockedResponse.objects));
      });
    });

    describe("ListRelations", () => {
      it("should properly pass the request and return an allowed API response", async () => {
        const tuples = [{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "admin",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "guest",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "reader",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "viewer",
          object: "workspace:1",
        }, {
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "can_read",
          object: "workspace:1",
        }];
        const scope0 = nocks.check(defaultConfiguration.storeId!, tuples[0], defaultConfiguration.getBasePath(), { allowed: true }).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope1 = nocks.check(defaultConfiguration.storeId!, tuples[1], defaultConfiguration.getBasePath(), { allowed: false }).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope2 = nocks.check(defaultConfiguration.storeId!, tuples[2], defaultConfiguration.getBasePath(), { allowed: true }).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope3 = nocks.check(defaultConfiguration.storeId!, tuples[3], defaultConfiguration.getBasePath(), "" as any, 500).matchHeader("X-OpenFGA-Client-Method", "ListRelations");
        const scope4 = nocks.check(defaultConfiguration.storeId!, tuples[4], defaultConfiguration.getBasePath(), {
          "code": "validation_error",
          "message": "relation &#39;workspace#can_read&#39; not found"
        }, 400).matchHeader("X-OpenFGA-Client-Method", "ListRelations");

        expect(scope0.isDone()).toBe(false);
        expect(scope1.isDone()).toBe(false);
        expect(scope2.isDone()).toBe(false);
        expect(scope3.isDone()).toBe(false);
        expect(scope4.isDone()).toBe(false);
        const response = await fgaClient.listRelations({
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          object: "workspace:1",
          relations: ["admin", "guest", "reader", "viewer"],
        });

        expect(scope0.isDone()).toBe(true);
        expect(scope1.isDone()).toBe(true);
        expect(scope2.isDone()).toBe(true);
        expect(scope3.isDone()).toBe(true);
        expect(scope4.isDone()).toBe(false);
        expect(response.relations.length).toBe(2);
        expect(response.relations.sort()).toEqual(expect.arrayContaining(["admin", "reader"]));
      });

      it("should throw an error if no relations passed", async () => {
        try {
          await fgaClient.listRelations({
            user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
            object: "workspace:1",
          });
        } catch (err) {
          expect(err).toBeInstanceOf(FgaValidationError);
          expect((err as FgaValidationError).field).toBe("relations");
          expect((err as FgaValidationError).message).toBe("When calling listRelations, at least one relation must be passed in the relations field");
        }
      });
    });

    /* Assertions */
    describe("ReadAssertions", () => {
      it("should properly call the OpenFga ReadAssertions API", async () => {
        const modelId = "string";
        const scope = nocks.readAssertions(defaultConfiguration.storeId!, modelId);

        expect(scope.isDone()).toBe(false);
        const data = await fgaClient.readAssertions({ authorizationModelId: modelId });

        expect(scope.isDone()).toBe(true);
        expect(data).toMatchObject({
          authorization_model_id: modelId,
          assertions: expect.arrayContaining([]),
        });
      });
    });

    describe("WriteAssertions", () => {
      it("should properly call the OpenFga WriteAssertions API", async () => {
        const modelId = "string";
        const scope = nocks.writeAssertions(defaultConfiguration.storeId!, modelId);

        expect(scope.isDone()).toBe(false);
        await fgaClient.writeAssertions([{
          user: "user:81684243-9356-4421-8fbf-a4f8d36aa31b",
          relation: "viewer",
          object: "document:roadmap",
          expectation: true,
        }], { authorizationModelId: modelId });

        expect(scope.isDone()).toBe(true);
      });
    });
  });
});
