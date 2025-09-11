import { Context } from "koa";

export default (plugin: any) => {
  plugin.controllers.user.updateMe = async (ctx: Context) => {
    try {
      if (!ctx.state.user || !ctx.state.user.id) {
        return ctx.unauthorized;
      }

      const data = ctx.request.body;
      const updatedUser = await strapi
        .documents("plugin::users-permissions.user")
        .update({
          documentId: ctx.state.user.documentId,
          data,
        });

      return ctx.send(updatedUser);
    } catch (error) {
      console.log("Error on update user: ", error);
      return ctx.badRequest("Unable to update user");
    }
  };

  const originalContentApi = plugin.routes?.["content-api"];

  plugin.routes["content-api"] = (strapi: any) => {
    const routesDef =
      typeof originalContentApi === "function"
        ? originalContentApi(strapi)
        : { type: "content-api", routes: [] };

    routesDef.routes.push({
      method: "PUT",
      path: "/user/me",
      handler: "user.updateMe",
      config: {
        prefix: "",
        policies: [],
      },
    });

    return routesDef;
  };

  return plugin;
};
