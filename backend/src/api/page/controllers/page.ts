/**
 * page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::page.page",
  ({ strapi }) => ({
    // Query by slug
    async findOne(ctx) {
      const { id } = ctx.params;
      const entity = await strapi.db.query("api::page.page").findOne({
        where: { slug: id.toLowerCase() },
        populate: ["blocks", "blocks.link"],
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
