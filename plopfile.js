module.exports = function (plop) {
  const directories = {
    handler: "src/handler/{{name}}.ts",
    middleware: "src/middleware/{{name}}Middleware.ts",
    repository: "src/repository/{{name}}Repository.ts",
  };
  plop.setHelper("eq", function (a, b) {
    return a === b;
  });
  plop.setGenerator("handler", {
    description: "Generate a new handler for an object",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Type an object for this handler (in singular form):",
      }
    ],
    actions: [
      {
        type: "add",
        path: directories.handler,
        templateFile: "templates/handler.hbs",
        data: {
          name: "{{name}}",
          route: "{{route}}",
          methods: ["GET", "POST", "PUT", "DELETE"]
        },
      },
    ],
  });

  plop.setGenerator("middleware", {
    description: "Generate a new custom middleware function",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Type a name for your middleware function ('Middleware' will be appended to the name you provide):",
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

  plop.setGenerator("repository", {
    description: "Generate a new repository for an object",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Type an object for your repository (in singular form):",
      },
      {
        type: "list",
        name: "database",
        message: "Select a database for the repository:",
        choices: [
          { name: "MySQL", value: "mysql" },
          { name: "MongoDB", value: "mongodb" },
        ],
      },
    ],
    actions: [
      {
        type: "add",
        path: directories.repository,
        templateFile: "templates/repository.hbs",
      },
    ],
  });
};
