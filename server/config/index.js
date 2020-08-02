const convict = require("convict");

// Schema Configuration
let config = convict({
    environment: {
        doc: "The application environment.",
        format: ["dev"],
        default: "dev",
        env: "NODE_ENV",
        arg: "environment"
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3333,
        arg: "port"
    },
    sessionStoreSecret: {
        doc: "Session store secret.",
        format: "String",
        default: "khebcDv9hsJGEyzEQ4TvZdDdihkaHDjf",
        arg: "sessionStoreSecret"
    },
});

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;