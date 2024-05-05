'use strict';

/**
 * predicted-reading service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::predicted-reading.predicted-reading');
