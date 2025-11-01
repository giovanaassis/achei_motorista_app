export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: ["https://achei-motorista-app.vercel.app"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      credentials: true,
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
