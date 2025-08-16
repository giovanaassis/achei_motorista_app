export default {
  routes: [
    // padrão (usa nosso controller sobreposto)
    {
      method: "GET",
      path: "/drivers",
      handler: "driver.find",
      config: { auth: true },
    },
    {
      method: "GET",
      path: "/drivers/:id",
      handler: "driver.findOne",
      config: { auth: true },
    },
    {
      method: "POST",
      path: "/drivers",
      handler: "driver.create",
      config: { auth: true },
    },
    {
      method: "PUT",
      path: "/drivers/:id",
      handler: "driver.update",
      config: { auth: true },
    },
    {
      method: "DELETE",
      path: "/drivers/:id",
      handler: "driver.delete",
      config: { auth: true },
    },

    // custom
    {
      method: "GET",
      path: "/drivers/me",
      handler: "driver.me",
      config: { auth: true },
    },
  ],
};
