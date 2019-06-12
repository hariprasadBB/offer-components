export const createMockForKlass = (klass) => {
    const mockedObject = new Object();
    Object.getOwnPropertyNames(klass.prototype).forEach((method) => {
        mockedObject[method] = jest.fn();
    });

    return mockedObject;
};

let instance;
const createInstance = () => {
    const ServiceProxy = require.requireActual("../ServiceProxy").ServiceProxy;
    instance = createMockForKlass(ServiceProxy);
    return instance;
};

const getInstance = () => {
    if (!instance) {
        createInstance();
    }
    return instance;
};

export default {createInstance, getInstance};