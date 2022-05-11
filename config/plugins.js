module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey:
          "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",
      },
      settings: {
        defaultFrom: "quy.nguyen@siliconstack.com.au",
        defaultReplyTo: "quy.nguyen@siliconstack.com.au",
      },
    },
  },
  // ...
});
