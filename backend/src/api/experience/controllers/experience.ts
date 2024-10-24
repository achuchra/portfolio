/**
 * experience controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::experience.experience",
  ({ strapi }) => ({
    // Query by slug
    async findOne(ctx) {
      const { id } = ctx.params;
      const entity = await strapi.db
        .query("api::experience.experience")
        .findOne({
          where: { slug: id.toLowerCase() },
          populate: ["paragraph", "references", "references.link"],
        });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
