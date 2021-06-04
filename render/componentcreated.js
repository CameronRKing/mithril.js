const handlers = [];
const run = (...args) => handlers.forEach(cb => cb(...args));
const addHandler = (cb) => handlers.push(cb);

module.exports = {
    handlers,
    run,
    addHandler
}