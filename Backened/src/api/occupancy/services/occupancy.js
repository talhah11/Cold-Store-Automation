'use strict';

/**
 * occupancy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::occupancy.occupancy');
