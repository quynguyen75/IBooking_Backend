const { createCoreController } = require("@strapi/strapi").factories;

function checkCorrespondRoom(room, checkInDate, checkOutDate) {
  const bookings = room.bookings;
  if (checkOutDate) {
    const existBooking = bookings.some((booking) => {
      if (!booking.paymentReference) {
        return false;
      }
      const searchCheckInDate = moment(checkInDate);
      const searchCheckOutDate = moment(checkOutDate);
      return (
        searchCheckOutDate.isBetween(
          booking.checkInDate,
          booking.checkOutDate,
          undefined,
          "[]"
        ) ||
        searchCheckInDate.isBetween(
          booking.checkInDate,
          booking.checkOutDate,
          undefined,
          "[]"
        ) ||
        moment(booking.checkInDate).isBetween(
          searchCheckInDate,
          searchCheckOutDate,
          undefined,
          "[]"
        ) ||
        moment(booking.checkOutDate).isBetween(
          searchCheckInDate,
          searchCheckOutDate,
          undefined,
          "[]"
        )
      );
    });

    return !existBooking;
  } else {
    const existBooking = bookings.find((booking) => {
      const searchCheckIn = moment(checkInDate);

      return searchCheckIn.isBetween(
        booking.checkInDate,
        booking.checkOutDate,
        undefined,
        "[]"
      );
    });
    return !Boolean(existBooking);
  }
}

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

    let results = [];

    const searchCheckIn = query.checkInDate;
    const searchCheckOut = query.checkOutDate;

    const rooms = await strapi.db.query("api::room.room").findMany({
      where: {
        ...query.filters,
      },
      populate: query.populate,
    });

    if (searchCheckIn && searchCheckOut) {
      results = rooms.filter((room) =>
        checkCorrespondRoom(room, searchCheckIn, searchCheckOut)
      );
    } else if (searchCheckIn) {
      results = rooms.filter((room) =>
        checkCorrespondRoom(room, searchCheckIn, searchCheckOut)
      );
    } else results = rooms;

    const sanitizedEntity = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
