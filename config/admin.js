module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3d0397625b38436a986b20fe21dda777'),
  },
});
