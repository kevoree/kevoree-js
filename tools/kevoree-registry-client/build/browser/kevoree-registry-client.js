(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fetch"), require("TinyConf"), require("btoa"));
	else if(typeof define === 'function' && define.amd)
		define(["fetch", "TinyConf", "btoa"], factory);
	else if(typeof exports === 'object')
		exports["KevoreeRegistryClient"] = factory(require("fetch"), require("TinyConf"), require("btoa"));
	else
		root["KevoreeRegistryClient"] = factory(root["fetch"], root["TinyConf"], root["btoa"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/browser/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************************************!*\
  !*** ./build/main/util/fetch-wrapper.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fetch = __webpack_require__(/*! node-fetch */ 6);
var client_error_1 = __webpack_require__(/*! ./client-error */ 7);
function checkStatus(resp) {
    if (resp.status >= 200 && resp.status < 300) {
        return resp;
    } else {
        var contentType = resp.headers.get('Content-Type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return resp.json().then(function (data) {
                if (data.message) {
                    throw new client_error_1.default(resp, " - " + data.message);
                } else if (data.error_description) {
                    throw new client_error_1.default(resp, " - " + data.error_description);
                } else {
                    throw new client_error_1.default(resp);
                }
            });
        } else {
            throw new client_error_1.default(resp, " - " + resp.url);
        }
    }
}
function parseJSON(resp) {
    var contentType = resp.headers.get('Content-Type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return resp.json();
    } else {
        return resp;
    }
}
function fetchWrapper(url, options) {
    return fetch(url, Object.assign({ headers: {
            Accept: 'application/json'
        } }, options)).then(checkStatus).then(parseJSON);
}
exports.default = fetchWrapper;
//# sourceMappingURL=fetch-wrapper.js.map

/***/ }),
/* 1 */
/*!***********************************!*\
  !*** ./build/main/util/config.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var config = __webpack_require__(/*! tiny-conf */ 8);
var btoa = __webpack_require__(/*! ./btoa */ 9);
function token() {
    var accessToken = config.get('user.access_token');
    if (accessToken) {
        return accessToken;
    }
    throw new Error('Unable to find a valid token');
}
exports.token = token;
function isTokenExpired() {
    var user = config.get('user');
    return !user || !user.access_token || !user.expires_at || Date.now() >= user.expires_at;
}
exports.isTokenExpired = isTokenExpired;
function baseUrl() {
    var conf = config.get('registry');
    if (conf) {
        return (conf.ssl ? 'https' : 'http') + "://" + conf.host + ":" + conf.port;
    } else {
        throw new Error('Unable to find "registry" in config');
    }
}
exports.baseUrl = baseUrl;
function clientAuthorization() {
    var clientId = config.get('registry.oauth.client_id');
    var clientSecret = config.get('registry.oauth.client_secret');
    return btoa(clientId + ":" + clientSecret);
}
exports.clientAuthorization = clientAuthorization;
exports.default = config;
//# sourceMappingURL=config.js.map

/***/ }),
/* 2 */
/*!****************************!*\
  !*** ./build/main/auth.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fetch_wrapper_1 = __webpack_require__(/*! ./util/fetch-wrapper */ 0);
var config_1 = __webpack_require__(/*! ./util/config */ 1);
var qs_encode_1 = __webpack_require__(/*! ./util/qs-encode */ 3);
function oauthToken(body) {
    return fetch_wrapper_1.default(config_1.baseUrl() + "/oauth/token", {
        method: 'POST',
        body: qs_encode_1.default(Object.assign({ client_id: config_1.default.get('registry.oauth.client_id'), client_secret: config_1.default.get('registry.oauth.client_secret') }, body)),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': "Basic " + config_1.clientAuthorization()
        }
    }).then(function (data) {
        var user = config_1.default.get('user');
        var expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + data.expires_in);
        user.login = body.username ? body.username : user.login;
        user.access_token = data.access_token;
        user.refresh_token = data.refresh_token;
        user.expires_at = expiredAt.getTime();
        return config_1.default.save('user');
    });
}
exports.default = {
    login: function login(username, password) {
        return oauthToken({ username: username, password: password, grant_type: 'password', scope: 'read%20write' });
    },
    logout: function logout() {
        config_1.default.set('user.access_token', null);
        config_1.default.set('user.expires_at', 0);
        return Promise.resolve();
    },
    refresh: function refresh() {
        var refreshToken = config_1.default.get('user.refresh_token');
        if (refreshToken) {
            return oauthToken({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                scope: 'read%20write'
            });
        } else {
            return Promise.reject(new Error("Invalid refresh_token: " + refreshToken));
        }
    },
    ensureLogin: function ensureLogin() {
        var accessToken = this.getToken();
        if (accessToken) {
            if (this.isTokenExpired()) {
                return this.refresh();
            } else {
                return Promise.resolve();
            }
        } else {
            return Promise.reject(new Error('Unable to find valid token'));
        }
    },
    getToken: function getToken() {
        return config_1.token();
    },
    isTokenExpired: function isTokenExpired() {
        return config_1.isTokenExpired();
    }
};
//# sourceMappingURL=auth.js.map

/***/ }),
/* 3 */
/*!**************************************!*\
  !*** ./build/main/util/qs-encode.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function qsEncode(obj) {
    return Object.keys(obj).reduce(function (params, key, i) {
        return params + (i > 0 ? '&' : '') + key + '=' + obj[key];
    }, '');
}
exports.default = qsEncode;
//# sourceMappingURL=qs-encode.js.map

/***/ }),
/* 4 */
/*!*****************************!*\
  !*** ./build/main/index.js ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var account_1 = __webpack_require__(/*! ./account */ 5);
exports.account = account_1.default;
var auth_1 = __webpack_require__(/*! ./auth */ 2);
exports.auth = auth_1.default;
var namespace_1 = __webpack_require__(/*! ./namespace */ 10);
exports.namespace = namespace_1.default;
var tdef_1 = __webpack_require__(/*! ./tdef */ 11);
exports.tdef = tdef_1.default;
var du_1 = __webpack_require__(/*! ./du */ 12);
exports.du = du_1.default;
//# sourceMappingURL=index.js.map

/***/ }),
/* 5 */
/*!*******************************!*\
  !*** ./build/main/account.js ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fetch_wrapper_1 = __webpack_require__(/*! ./util/fetch-wrapper */ 0);
var config_1 = __webpack_require__(/*! ./util/config */ 1);
var auth_1 = __webpack_require__(/*! ./auth */ 2);
exports.default = {
    get: function get() {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/account", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + config_1.token()
                }
            });
        });
    }
};
//# sourceMappingURL=account.js.map

/***/ }),
/* 6 */
/*!************************!*\
  !*** external "fetch" ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/*!*****************************************!*\
  !*** ./build/main/util/client-error.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });

var KevoreeRegistryClientError = function (_Error) {
    _inherits(KevoreeRegistryClientError, _Error);

    function KevoreeRegistryClientError(response, detail) {
        _classCallCheck(this, KevoreeRegistryClientError);

        var _this = _possibleConstructorReturn(this, (KevoreeRegistryClientError.__proto__ || Object.getPrototypeOf(KevoreeRegistryClientError)).call(this, response.status + ' - ' + response.statusText + (detail ? detail : '')));

        Object.setPrototypeOf(_this, KevoreeRegistryClientError.prototype);
        _this.name = 'KevoreeRegistryClientError';
        _this.statusCode = response.status;
        _this.statusText = response.statusText;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, _this.constructor);
        } else {
            _this.stack = new Error().stack;
        }
        return _this;
    }

    return KevoreeRegistryClientError;
}(Error);

exports.default = KevoreeRegistryClientError;
//# sourceMappingURL=client-error.js.map

/***/ }),
/* 8 */
/*!***************************!*\
  !*** external "TinyConf" ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/*!***********************!*\
  !*** external "btoa" ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/*!*********************************!*\
  !*** ./build/main/namespace.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fetch_wrapper_1 = __webpack_require__(/*! ./util/fetch-wrapper */ 0);
var config_1 = __webpack_require__(/*! ./util/config */ 1);
var auth_1 = __webpack_require__(/*! ./auth */ 2);
exports.default = {
    all: function all() {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces");
    },
    get: function get(name) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + name);
    },
    create: function create(name) {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + config_1.token()
                },
                body: JSON.stringify({ name: name })
            });
        });
    },
    delete: function _delete(name) {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + name, {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + config_1.token()
                }
            });
        });
    },
    addMember: function addMember(name, member) {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + name + "/members", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + config_1.token()
                },
                body: JSON.stringify({ name: member })
            });
        });
    },
    removeMember: function removeMember(name, member) {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + name + "/members/" + member, {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + config_1.token()
                }
            });
        });
    }
};
//# sourceMappingURL=namespace.js.map

/***/ }),
/* 11 */
/*!****************************!*\
  !*** ./build/main/tdef.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fetch_wrapper_1 = __webpack_require__(/*! ./util/fetch-wrapper */ 0);
var config_1 = __webpack_require__(/*! ./util/config */ 1);
var auth_1 = __webpack_require__(/*! ./auth */ 2);
exports.default = {
    all: function all() {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/tdefs");
    },
    get: function get(id) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/tdefs/" + id);
    },
    getAllByNamespace: function getAllByNamespace(namespace) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs");
    },
    getLatestsByNamespace: function getLatestsByNamespace(namespace) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs?version=latest");
    },
    getAllByNamespaceAndName: function getAllByNamespaceAndName(namespace, name) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + name);
    },
    getLatestByNamespaceAndName: function getLatestByNamespaceAndName(namespace, name) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + name + "/latest");
    },
    getByNamespaceAndNameAndVersion: function getByNamespaceAndNameAndVersion(namespace, name, version) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + name + "/" + version);
    },
    create: function create(namespace, tdef) {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + config_1.token()
                },
                body: JSON.stringify(tdef)
            });
        });
    },
    delete: function _delete(id) {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/tdefs/" + id, {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + config_1.token()
                }
            });
        });
    },
    deleteByNamespaceAndNameAndVersion: function deleteByNamespaceAndNameAndVersion(namespace, name, version) {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + name + "/" + version, {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + config_1.token()
                }
            });
        });
    }
};
//# sourceMappingURL=tdef.js.map

/***/ }),
/* 12 */
/*!**************************!*\
  !*** ./build/main/du.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fetch_wrapper_1 = __webpack_require__(/*! ./util/fetch-wrapper */ 0);
var config_1 = __webpack_require__(/*! ./util/config */ 1);
var qs_encode_1 = __webpack_require__(/*! ./util/qs-encode */ 3);
var auth_1 = __webpack_require__(/*! ./auth */ 2);
exports.default = {
    all: function all() {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/dus");
    },
    get: function get(id) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/dus/" + id);
    },
    getAllByNamespaceAndTdefName: function getAllByNamespaceAndTdefName(namespace, tdefName) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + tdefName + "/dus");
    },
    getAllByNamespaceAndTdefNameAndTdefVersion: function getAllByNamespaceAndTdefNameAndTdefVersion(namespace, tdefName, tdefVersion) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + tdefName + "/" + tdefVersion + "/dus");
    },
    getByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform: function getByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform(namespace, tdefName, tdefVersion, name, version, platform) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + tdefName + "/" + tdefVersion + "/dus/" + name + "/" + version + "/" + platform);
    },
    getSpecificByNamespaceAndTdefNameAndTdefVersion: function getSpecificByNamespaceAndTdefNameAndTdefVersion(namespace, tdefName, tdefVersion, filters) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + tdefName + "/" + tdefVersion + "/specific-dus?" + qs_encode_1.default(filters));
    },
    getLatests: function getLatests(namespace, tdefName, tdefVersion) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + tdefName + "/" + tdefVersion + "/dus?version=latest");
    },
    getReleases: function getReleases(namespace, tdefName, tdefVersion) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + tdefName + "/" + tdefVersion + "/dus?version=release");
    },
    getLatestByPlatform: function getLatestByPlatform(namespace, tdefName, tdefVersion, platform) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + tdefName + "/" + tdefVersion + "/dus?version=latest&platform=" + platform).then(function (dus) {
            return dus[0];
        });
    },
    getReleaseByPlatform: function getReleaseByPlatform(namespace, tdefName, tdefVersion, platform) {
        return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + tdefName + "/" + tdefVersion + "/dus?version=release&platform=" + platform).then(function (dus) {
            return dus[0];
        });
    },
    create: function create(namespace, tdefName, tdefVersion, du) {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + tdefName + "/" + tdefVersion + "/dus", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + config_1.token()
                },
                body: JSON.stringify(du)
            });
        });
    },
    update: function update(du) {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + du.namespace + "/tdefs/" + du.tdefName + "/" + du.tdefVersion + "/dus/" + du.name + "/" + du.version + "/" + du.platform, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + config_1.token()
                },
                body: JSON.stringify(du)
            });
        });
    },
    delete: function _delete(id) {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/dus/" + id, {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + config_1.token()
                }
            });
        });
    },
    deleteByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform: function deleteByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform(namespace, tdefName, tdefVersion, name, version, platform) {
        return auth_1.default.ensureLogin().then(function () {
            return fetch_wrapper_1.default(config_1.baseUrl() + "/api/namespaces/" + namespace + "/tdefs/" + tdefName + "/" + tdefVersion + "/dus/" + name + "/" + version + "/" + platform, {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + config_1.token()
                }
            });
        });
    }
};
//# sourceMappingURL=du.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=kevoree-registry-client.js.map