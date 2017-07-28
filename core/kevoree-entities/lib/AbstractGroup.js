'use strict';

var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractGroup entity
 *
 * @class
 */
var AbstractGroup = KevoreeEntity.extend({
    toString: 'AbstractGroup',

    /**
     *
     * @param model
     */
    updateModel: function (model) {
        this.kCore.deploy(model);
    }
});

module.exports = AbstractGroup;
