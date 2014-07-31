/**
 * Created by leiko on 31/07/14.
 *
 * Extend base content with the content of ext.
 */
function extend(base, ext) {
    base = JSON.parse(JSON.stringify(base));

    if (typeof (ext) === 'object' && ext !== null) {
        Object.keys(ext).forEach(function (prop) {
            if (typeof (ext[prop]) === 'object' && ext[prop] !== null) {
                if (Object.keys(ext[prop]).length === 0) {
                    base[prop] = ext[prop];
                } else {
                    if (typeof (base[prop]) === 'undefined') {
                        base[prop] = {};
                    }
                    base[prop] = extend(base[prop], ext[prop]);
                }
            } else {
                base[prop] = ext[prop];
            }
        });
    }

    return base;
}

module.exports = extend;