"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("tiny-conf");
const btoa = require("./btoa");
function token() {
    const accessToken = config.get('user.access_token');
    if (accessToken) {
        return accessToken;
    }
    throw new Error('Unable to find a valid token');
}
exports.token = token;
function isTokenExpired() {
    const user = config.get('user');
    return !user || !user.access_token || !user.expires_at || (Date.now() >= user.expires_at);
}
exports.isTokenExpired = isTokenExpired;
function baseUrl() {
    const conf = config.get('registry');
    if (conf) {
        return `${conf.ssl ? 'https' : 'http'}://${conf.host}:${conf.port}`;
    }
    else {
        throw new Error('Unable to find "registry" in config');
    }
}
exports.baseUrl = baseUrl;
function clientAuthorization() {
    const clientId = config.get('registry.oauth.client_id');
    const clientSecret = config.get('registry.oauth.client_secret');
    return btoa(`${clientId}:${clientSecret}`);
}
exports.clientAuthorization = clientAuthorization;
exports.default = config;
//# sourceMappingURL=config.js.map