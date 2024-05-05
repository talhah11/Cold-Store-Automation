'use strict';

/**
 * sensor-reading controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sensor-reading.sensor-reading', ({strapi}) => ({
	async sendEmail(ctx) {
		const toPerson = "muzzammil@zeptosystems.com";
		const { subject, html } = ctx.request.body;
		try {
			await strapi.plugins['email'].services.email.send(
			{
				to: toPerson,
				subject: subject,
				html: html,
			}
			);
			return "Successful";
		}
		catch (err) {
			//todo: handle error
			console.log(err);
		}
	},
}));
