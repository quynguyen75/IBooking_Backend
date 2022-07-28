module.exports = {
  routes: [
    {
      method: "GET",
      path: "/room-analyst",
      handler: "custom-controller.analyst",
    },
    {
      method: "GET",
      path: "/rooms/search",
      handler: "custom-controller.search",
    },
  ],
};
