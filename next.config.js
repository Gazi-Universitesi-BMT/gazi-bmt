/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    GET_EVENTS: process.env.GET_EVENTS,
    GET_ADMINS: process.env.GET_ADMINS,
    GET_MESSAGES: process.env.GET_MESSAGES,
    CREATE_MESSAGE: process.env.CREATE_MESSAGE,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  },
};
