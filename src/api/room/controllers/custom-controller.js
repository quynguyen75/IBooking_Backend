const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::room.room", ({ strapi }) => ({
  async analyst(ctx) {
    ctx.query = { ...ctx.query, local: "en" };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    return {
      count: data.length,
    };
  },

  async search(ctx) {
    const query = ctx.query;

    const rooms = await strapi.db.query("api::room.room").findMany({
      where: {
        ...query.filters,
      },
      populate: query.populate,
    });

    const sanitizedEntity = await this.sanitizeOutput(rooms, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
