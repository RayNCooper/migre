import Command, { flags } from "@oclif/command";
const appwrite = require("node-appwrite");
const dotenv = require("dotenv");

class Migre extends Command {
  static description = `
migre is a CLI tool for generically migrating appwrite structures.
At its heart, it tries to automate the process of wiping and migrating appwrite documents and files.
Thanks to the usage of optionally provided .env and .env.remote files, it works for both local and remote appwrite instances. 
  `;

  static args = [
    {
      name: "operation",
      required: true,
      options: ["wipe", "migrate"],
      description: `
[wipe] wipes all documents of the given structure type
[migrate] migrates appwrite collection structure to structure given in structure.json`,
    },
  ];

  static flags = {
    remote: flags.boolean({
      description:
        "if flag is set, migre will look for an .env.remote file. Fallback is .env",
      char: "r",
      default: false,
    }),
    type: flags.string({
      description: "structure type to manipulate",
      options: ["documents", "files"],
      char: "t",
    }),
  };

  async run() {
    const { args, flags } = this.parse(Migre);
    const client = new appwrite.Client();

    /* use different environment variables depending on remote flag */
    if (flags.remote) {
      const d = dotenv.config({ path: ".env.appwrite.remote" });
      if (d.error) this.error(`There was a problem with accessing ENV variables, did you create .env.appwrite.remote? See github.com/RayNCooper/migre`);
    } else if (!flags.remote) {
      const d = dotenv.config({ path: ".env.appwrite" });
      if (d.error) this.error('There was a problem with accessing ENV variables, did you create .env.appwrite?');
    }

    /* execute operations for the wipe argument */
    if (args.operation == "wipe") {
      if (flags.type == "documents") {
        // TODO
        this.error(
          "This version of migre does not allow wiping of documents yet"
        );
      } else if (flags.type == "files") {
        const storage = new appwrite.Storage(client);

        client
          .setEndpoint(process.env.APPWRITE_DOMAIN)
          .setProject(process.env.APPWRITE_PROJECT_ID)
          .setKey(process.env.APPWRITE_API_KEY);

        const filesPromise = await storage.listFiles();

        filesPromise.files.forEach(async (file: any) => {
          await storage.deleteFile(file.$id);
        });
      }
      this.error("You need to set a flag so migre knows what to wipe.");
    } 
    /* execute operations for the migrate argument */
    else if (args.operation == "migrate") {
      /* files cannot be migrated, only wiped in appwrite */
      if (flags.type == "files") this.error("You cannot migrate files!");

      if (flags.type == "documents") {
        // TODO
        this.error(
          "This version of migre does not migrating of documents yet."
        );
      }
    }
  }
}

export = Migre;
