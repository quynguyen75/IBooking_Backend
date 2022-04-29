module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "quy.nguyen@siliconstack.com.au",
        defaultReplyTo: "quy.nguyen@siliconstack.com.au",
      },
    },
  },
  // ...
});
