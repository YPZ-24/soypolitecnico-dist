"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DB: {
        URL: `mongodb://${process.env.DB_USR}:${process.env.DB_PWD}@cluster0-shard-00-00.3jg2i.mongodb.net:27017,cluster0-shard-00-01.3jg2i.mongodb.net:27017,cluster0-shard-00-02.3jg2i.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-ykt0xe-shard-0&authSource=admin&retryWrites=true&w=majority`,
        USR: process.env.DB_USR,
        PWD: process.env.DB_PWD
    },
    JWT_SECRET: process.env.JWT_SECRET,
    BCRYP: {
        SALT: Number(process.env.BCRYPT_SALT)
    },
    PORT: process.env.PORT,
    DOMAIN: {
        DOMAIN_NAME: 'soypolitecnico.org',
        DOMAIN_LINK: 'https://soypolitecnico.org',
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PORT: process.env.EMAIL_PORT,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
    }
};
