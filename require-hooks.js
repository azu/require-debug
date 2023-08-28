const MODULE = require('module');
const REQUIRE_SO_SLOW = Symbol('hooks');
const orig = MODULE._load;
if (orig[REQUIRE_SO_SLOW]) {
    return;
}
// requireのmodule loadに対してhook処理を入れる
MODULE._load = function (request) {
    const args = arguments;
    let exports;
    const start = Date.now();
    console.log(`Loading ${request}...`);
    exports = orig.apply(this, args);
    const end = Date.now();
    console.log(`Loaded ${request} in ${end - start}ms`);
    return exports;
};
