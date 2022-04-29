const { createCoreController } = require("@strapi/strapi").factories;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SERVICE_FEE = 0.03;

module.exports = createCoreController("api::booking.booking", ({ strapi }) => ({
  async analyst(ctx) {
    ctx.query = { ...ctx.query, local: "en" };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    const bookingAnalyst = months.map((month, index) => {
      const bookingOfMonth = data.filter((booking) => {
        const bookedDate = new Date(booking.attributes.createdAt);

        return (
          bookedDate.getMonth() === index &&
          bookedDate.getFullYear() === new Date().getFullYear()
        );
      });

      const totalProfit = bookingOfMonth.reduce(
        (acc, curr) => acc + curr.attributes.totalPrice * SERVICE_FEE,
        0
      );

      return {
        month,
        bookingCount: bookingOfMonth.length,
        totalProfit,
      };
    });

    return {
      year: new Date().getFullYear(),
      bookingAnalyst,
    };
  },
}));
