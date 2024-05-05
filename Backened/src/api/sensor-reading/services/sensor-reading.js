'use strict';

/**
 * sensor-reading service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sensor-reading.sensor-reading');
