import Logger from "./Logger";
import {get} from "./Utils";
import "whatwg-fetch";
import retryPromise from "promise-retry";

const setContentType = (options, contentType) => {
    if (!options) {
        options = {};
    }

    const headers = options["headers"] || {};
    headers["Content-Type"] = contentType;
    options["headers"] = headers;
    return options;
};

const fetchWithTimeOutAndRetry = (requestUrl, options) => {
    const fetch_timeout = options.timeout || 3000;
    
    const fetchWithTimeout = (retryCallback) => 
        Promise.race([
            fetch(requestUrl, options),
            new Promise(function (resolve, reject) {
            // Rejecting the promise when the fetch doesn't complete within the specified timeout. 
                setTimeout(() => reject(new Error("request timeout")), fetch_timeout);
            })
        ]).catch(function(err) {
            retryCallback(err);
        });

    // Wrapping with retryPromise to retry the fetch for 3 times at an interval of fetch_timeout.
    return retryPromise(fetchWithTimeout, 
        {minTimeout: fetch_timeout, retries: (options.retries !== undefined ? options.retries : 3)}
    );
};

const doFetch = (requestUrl, options) => {
    options = Object.assign({}, options, {credentials: "same-origin"});
    options.headers["X-Requested-With"] = "XMLHttpRequest";
    return fetchWithTimeOutAndRetry(requestUrl, options).then(function (response) {
        if (response.ok) {
            const headers = get(options, "headers", {});
            if (headers["Content-Type"] == "application/json") {
                return response.json();
            } else {
                return response.text();
            }
        }
        throw new Error("Network response was not ok.");
    }).catch((ex) => {
        // const params = requestUrl.split("?");
        // GAEventsReporter.getActiveInstance().reportEvent({
        //     category: "WC-ServiceProxy-ServerIssues",
        //     action: params[0],
        //     label: params[1]
        // });
        Logger.error("Failure in making the call to resource url : " + requestUrl, ex);
    });
};

export class ServiceProxy {
    fetchJson(requestUrl, options) {return Promise.resolve("");}
    fetchText(requestUrl, options) {return Promise.resolve("");}
}

class ServiceProxyImpl extends ServiceProxy {
    constructor() {
        super();
        this.cache = {};
    }

    fetchJson(requestUrl, options) {
        options = setContentType(options,  "application/json");
        return this._fetchResponse(requestUrl, options);
    }

    fetchText(requestUrl, options) {
        options = setContentType(options,  "application/x-www-form-urlencoded;charset=UTF-8");
        return this._fetchResponse(requestUrl, options);
    }

    _fetchResponse(requestUrl, options) {
        const cacheKey = JSON.stringify({requestUrl, options});
        if (options.method != "POST" && cacheKey in this.cache) {
            return this.cache[cacheKey];
        }
        const promise = doFetch(requestUrl, options);
        this.cache[cacheKey] = promise;
        return promise;
    }
}

let serviceProxy;
const getInstance = () => {
    if (!serviceProxy) {
        serviceProxy = new ServiceProxyImpl();
    }
    return serviceProxy;
};

export default {getInstance};