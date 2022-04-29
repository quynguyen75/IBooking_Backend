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
}));
