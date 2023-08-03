interface ISettings {
    AUTHENTICATION: {
      use: string;
      basic: {
        user: string;
        password: string;
      };
      jwt: {
        privateKey: string;
        routes: {
          enabled: boolean;
          path: string;
          login: string;
          register: string;
          logout: string;
        };
      };
    };
    DATABASE: {
      mysql: {
        enabled: boolean;
        host: string;
        user: string;
        password: string;
        database: string;
      };
      mongodb: {
        enabled: boolean;
        url: string;
        db: string;
        collection: string;
      };
    };
    PORT: string;
  }
  
  /**
   *  This is a configuration file for Pigeon, in this file you might modify
   *  different functionalities like: Authentication,  Database, and some other
   * general settings too.
   */
  export const settings: ISettings = {
    /**
     * Setting an authentication method will set it for the whole API, if your
     * intention is to set it for a sole handler or a route, you can do it
     * adding the middleware in the respective handler or route.
     */
    AUTHENTICATION: {
      use: "None",
      basic: {
        user: "guest",
        password: "guest",
      },
      jwt: {
        // ...
        privateKey: "secretKey",
        routes: {
          // Automatically create authentication routes
          enabled: false,
          path: "/api",
          login: "/login",
          register: "/signup",
          logout: "/logout",
        },
      },
    },
    DATABASE: {
      mysql: {
        enabled: true,
        host: "localhost",
        user: "pigeon",
        password: "pigeon",
        database: "pigeon",
      },
      mongodb: {
        enabled: true,
        url: "mongodb://127.0.0.1:27017/",
        db: "dummy",
        collection: "users",
      },
    },
    // Default port is 2020, you can change it by modifying this attribute
    PORT: "2020",
  };
  