/**
 * driver controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::driver.driver",
  ({ strapi }) => ({
    async create(ctx) {
      const userId = ctx.state.user?.id;
      if (!userId) return ctx.unauthorized();

      const body = ctx.request.body?.data || ctx.request.body;
      const data = { ...body, user: userId }; // força o owner

      const entry = await strapi
        .documents("api::driver.driver")
        .create({ data });

      return this.transformResponse(entry);
    },

    async find(ctx) {
      const userId = ctx.state.user?.id;
      if (!userId) return ctx.unauthorized();

      const entries = await strapi.documents("api::driver.driver").findMany({
        filters: { user: userId },
      });

      return this.transformResponse(entries);
    },

    async findOne(ctx) {
      const userId = ctx.state.user?.id;
      const { id } = ctx.params;
      const entry = await strapi
        .documents("api::driver.driver")
        .findOne({ documentId: id, populate: { user: true } });
      if (!entry || entry.user?.id !== userId) return ctx.forbidden();
      return this.transformResponse(entry);
    },

    async update(ctx) {
      const userId = ctx.state.user?.id;
      const { id } = ctx.params;

      const existing = await strapi
        .documents("api::driver.driver")
        .findOne({ documentId: id, populate: { user: true } });
      if (!existing || existing.user?.id !== userId) return ctx.forbidden();

      const body = ctx.request.body?.data || ctx.request.body;
      // impede troca de owner
      if ("user" in body) delete body.user;

      const entry = await strapi.documents("api::driver.driver").update({
        documentId: id,
        data: body,
      });

      return this.transformResponse(entry);
    },

    async delete(ctx) {
      const userId = ctx.state.user?.id;
      const { id } = ctx.params;

      const existing = await strapi
        .documents("api::driver.driver")
        .findOne({ documentId: id, populate: { user: true } });
      if (!existing || existing.user?.id !== userId) return ctx.forbidden();

      const entry = await strapi
        .documents("api::driver.driver")
        .delete({ documentId: id });
      return this.transformResponse(entry);
    },

    // GET /api/drivers/me
    async me(ctx) {
      const userId = ctx.state.user?.id;
      if (!userId) return ctx.unauthorized();

      const [driver] = await strapi.documents("api::driver.driver").findMany({
        filters: { user: userId },
      });

      return this.transformResponse(driver || null);
    },
  })
);
