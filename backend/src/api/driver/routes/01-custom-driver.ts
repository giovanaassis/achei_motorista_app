export default {
  routes: [
    // padrão (usa nosso controller sobreposto)
    {
      method: "GET",
      path: "/drivers",
      handler: "driver.find",
    },
    {
      method: "GET",
      path: "/drivers/:id",
      handler: "driver.findOne",
    },
    {
      method: "POST",
      path: "/drivers",
      handler: "driver.create",
    },
    {
      method: "PUT",
      path: "/drivers/:id",
      handler: "driver.update",
    },
    {
      method: "DELETE",
      path: "/drivers/:id",
      handler: "driver.delete",
    },

    // custom
    {
      method: "GET",
      path: "/drivers/me",
      handler: "driver.me",
    },
  ],
};
