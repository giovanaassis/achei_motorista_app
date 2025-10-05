/**
 * driver controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::driver.driver",
  ({ strapi }) => ({
    async create(ctx) {
      const body = ctx.request.body?.data || ctx.request.body;

      const entry = await strapi.documents("api::driver.driver").create({
        data: body,
      });

      return this.transformResponse(entry);
    },

    async find(ctx) {
      const entries = await strapi.documents("api::driver.driver").findMany({
        ...ctx.query,
      });

      const sanitized = await Promise.all(
        entries.map((entry) =>
          strapi.contentAPI.sanitize.output(
            entry,
            strapi.getModel("api::driver.driver")
          )
        )
      );

      return this.transformResponse(sanitized);
    },

    async findOne(ctx) {
      const { id } = ctx.params;

      const entry = await strapi.documents("api::driver.driver").findOne({
        documentId: id,
      });

      if (!entry) return ctx.notFound("Driver não encontrado");

      const sanitized = await strapi.contentAPI.sanitize.output(
        entry,
        strapi.getModel("api::driver.driver")
      );

      return this.transformResponse(sanitized);
    },

    async update(ctx) {
      const { id } = ctx.params;
      const body = ctx.request.body?.data || ctx.request.body;

      const existing = await strapi.documents("api::driver.driver").findOne({
        documentId: id,
      });

      if (!existing) return ctx.notFound("Driver não encontrado");

      const entry = await strapi.documents("api::driver.driver").update({
        documentId: id,
        data: body,
      });

      return this.transformResponse(entry);
    },

    async delete(ctx) {
      const { id } = ctx.params;

      const existing = await strapi.documents("api::driver.driver").findOne({
        documentId: id,
      });

      if (!existing) return ctx.notFound("Driver não encontrado");

      const entry = await strapi.documents("api::driver.driver").delete({
        documentId: id,
      });

      return this.transformResponse(entry);
    },

    // GET /api/drivers/me
    async me(ctx) {
      // Sem user, retorna todos os drivers
      const drivers = await strapi.documents("api::driver.driver").findMany();

      const sanitized = await Promise.all(
        drivers.map((entry) =>
          strapi.contentAPI.sanitize.output(
            entry,
            strapi.getModel("api::driver.driver")
          )
        )
      );

      return this.transformResponse(sanitized);
    },
  })
);
