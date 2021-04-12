import Command, { flags } from "@oclif/command";

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
      description: `[wipe] wipes all of the given structure type
[migrate] migrates document structure to structure given in structure.json`,
    },
    {
      name: "structure_type",
      required: false,
      description: "e.g. 'documents', 'files'",
    },
  ];

  static flags = {
    remote: flags.boolean({
      description:
        "if flag is set, migre will look for an .env.remote file. Fallback is .env",
      char: "r",
      default: false,
    }),
  };

  async run() {
    const { args, flags } = this.parse(Migre);
  }
}

export = Migre;
