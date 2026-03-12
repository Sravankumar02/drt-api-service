"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiChecker = void 0;
const request = require("supertest");
class ApiChecker {
    constructor(endpoint, httpServer) {
        this.endpoint = endpoint;
        this.httpServer = httpServer;
        this.skipFields = [];
        this.defaultParams = {};
    }
    async checkPagination() {
        const items = await this.requestList({ size: 100 });
        const paginationParams = [
            { from: 0, size: 1 },
            { from: 1, size: 5 },
            { from: 5, size: 5 },
            { from: 10, size: 20 },
        ];
        for (const params of paginationParams) {
            await this.checkPaginationInternal(items, params.from, params.size);
        }
    }
    async checkDetails(field) {
        const [item] = await this.requestList({ size: 1 });
        const idAttribute = field ? field : Object.keys(item)[0];
        const id = item[idAttribute];
        const details = await this.requestItemParallel(id, Object.keys(item));
        expect(details).toEqual(item);
    }
    async requestItemParallel(id, fields) {
        const requests = fields.map(field => this.requestItem(id, { fields: field }));
        const responses = await Promise.all(requests);
        return responses.reduce((acc, response) => {
            return Object.assign(Object.assign({}, acc), response);
        }, {});
    }
    async checkTokensDetails() {
        const [item] = await this.requestList({ size: 1 });
        const idAttribute = [item];
        const details = await this.requestItem(idAttribute[0].identifier, { fields: Object.keys(item).join(',') });
        delete details.circulatingSupply;
        delete details.supply;
        delete item.circulatingSupply;
        delete item.supply;
        expect(details).toEqual(item);
    }
    async checkAlternativeCount(params = {}) {
        const count = await this.requestCount(params);
        const alternativeCount = await this.requestAlternativeCount(params);
        try {
            expect(count).toStrictEqual(alternativeCount);
        }
        catch (error) {
            throw new Error(`Count value ${count} for '/count' is not equal with count value ${alternativeCount} of '/c' endpoint`);
        }
    }
    async checkFilter(criterias) {
        for (const criteria of criterias) {
            await this.checkFilterInternal(criteria);
        }
    }
    async checkFilterInternal(criteria) {
        const items = await this.requestList({ size: 100, fields: criteria });
        const distinctCriteria = items.map(x => x[criteria]).distinct();
        const shuffled = distinctCriteria.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        for (const value of selected) {
            await this.checkFilterValueInternal(criteria, value);
        }
    }
    async checkStatus() {
        const status = await this.requestStatus();
        try {
            expect(status).toStrictEqual(200);
        }
        catch (error) {
            throw new Error(`Endpoint status code ${status}`);
        }
    }
    async checkFilterValueInternal(criteria, value) {
        const items = await this.requestList({ size: 100, [criteria]: value, fields: criteria });
        const count = await this.requestCount({ [criteria]: value, fields: criteria });
        if (count < items.length) {
            const params = {
                size: 100,
                [criteria]: value,
            };
            const url = this.endpoint + '?' + new URLSearchParams(params);
            throw new Error(`Filter count for criteria '${criteria}' failed (length = ${items.length}, count = ${count}). request: '${url}'`);
        }
        const isValid = items.every(item => item[criteria] === value);
        if (!isValid) {
            const params = {
                size: 1000,
                [criteria]: value,
            };
            const url = this.endpoint + '?' + new URLSearchParams(params);
            throw new Error(`Filter for criteria '${criteria}' failed. request: '${url}'`);
        }
    }
    async checkPaginationInternal(allItems, from, size) {
        const items = await this.requestList({ from, size });
        expect(items).toEqual(allItems.slice(from, from + size));
    }
    async requestItem(id, params = {}) {
        const urlParams = new URLSearchParams(params);
        const { body: result } = await request(this.httpServer)
            .get(`/${this.endpoint}/${id}?${urlParams}`);
        for (const skipField of this.skipFields) {
            delete result[skipField];
        }
        return result;
    }
    async requestList(params) {
        const allParams = Object.assign(Object.assign({}, this.defaultParams), params);
        const urlParams = new URLSearchParams(allParams);
        const { body: result } = await request(this.httpServer)
            .get(`/${this.endpoint}?${urlParams}`);
        for (const item of result) {
            for (const skipField of this.skipFields) {
                delete item[skipField];
            }
        }
        return result;
    }
    async requestCount(params) {
        const urlParams = new URLSearchParams(Object.assign(Object.assign({}, this.defaultParams), params));
        const { body: result } = await request(this.httpServer)
            .get(`/${this.endpoint}/count?${urlParams}`);
        return result;
    }
    async requestAlternativeCount(params) {
        const urlParams = new URLSearchParams(Object.assign(Object.assign({}, this.defaultParams), params));
        const { body: result } = await request(this.httpServer)
            .get(`/${this.endpoint}/c?${urlParams}`);
        return result;
    }
    async requestStatus() {
        const result = await request(this.httpServer)
            .get(`/${this.endpoint}`);
        return result.statusCode;
    }
}
exports.ApiChecker = ApiChecker;
//# sourceMappingURL=api.checker.js.map