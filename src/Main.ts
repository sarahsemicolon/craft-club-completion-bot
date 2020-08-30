import { Client } from "@typeit/discord";

export default {
  BOT_TOKEN: process.env.BOT_TOKEN ?? '',
  COMPLETION_ROLE_ID: process.env.COMPLETION_ROLE_ID ?? ''
}

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static config = {
    BOT_TOKEN: process.env.BOT_TOKEN ?? '',
    COMPLETION_ROLE_ID: process.env.COMPLETION_ROLE_ID ?? ''
  }
  
  static start() {
    this._client = new Client();
    // In the login method, you must specify the glob string to load your classes (for the framework).
    // In this case that's not necessary because the entry point of your application is this file.
    this._client.login(
        this.config.BOT_TOKEN,
        `${__dirname}/discords/*.ts`, // glob string to load the classes
        `${__dirname}/discords/*.js` // If you compile your bot, the file extension will be .js
      );
  }
}

Main.start();