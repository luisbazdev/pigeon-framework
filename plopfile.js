module.exports = function (plop) {
  const directories = {
    handler: "src/handler/{{name}}.ts",
    middleware: "src/middleware/{{name}}Middleware.ts",
    repository: "src/repository/{{name}}.ts",
    model: "src/model/{{name}}.ts",
  };
  plop.setHelper("eq", function (a, b) {
    return a === b;
  });
  plop.addHelper("capitalize", function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });
  plop.setGenerator("handler", {
    description: "Generate a new handler, model and repository for an object",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Type an object for this handler (in singular form):",
      },
      {
        type: "list",
        name: "database",
        message: "Select a database for your repository:",
        choices: [
          { name: "MySQL", value: "mysql" },
          { name: "MongoDB", value: "mongodb" },
        ],
      },
    ],
    actions: [
      {
        type: "add",
        path: directories.handler,
        templateFile: "templates/handler.hbs",
        data: {
          name: "{{name}}",
          route: "{{route}}",
          methods: ["GET", "POST", "PUT", "DELETE"],
        },
      },
      {
        type: "add",
        path: directories.model,
        templateFile: "templates/object.hbs",
      },
      {
        type: "add",
        path: directories.repository,
        templateFile: "templates/repository.hbs",
      },
    ],
  });

  plop.setGenerator("middleware", {
    description: "Generate a new custom middleware function",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "Type a name for your middleware function ('Middleware' will be appended to the name you provide):",
      },
    ],
    actions: [
      {
        type: "add",
        path: directories.middleware,
        templateFile: "templates/middleware.hbs",
      },
    ],
  });
};
