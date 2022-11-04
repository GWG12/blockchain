import * as path from "path";
import * as fs from "fs";

export class BlockchainDB {
  constructor() {
    console.log("current wkdir", process.cwd(), typeof process.cwd());
    // const currentDir = path.basename(process.cwd());
    // this.path = `./${path.join(currentDir, "db", "db.txt")}`;
    this.path = "./db/db.txt";
    console.log("db path", this.path);
  }

  write(data) {
    if (!fs.existsSync(this.path)) {
      return fs.writeFile(this.path, data, function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      });
    }
    fs.writeFileSync(this.path, data, { flag: "a+" });
  }

  readLastBlock() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      console.log(data, typeof data);
      const totalBlocks = data.split("\n").slice(0, -1);
      return totalBlocks[totalBlocks.length - 1];
    } catch (err) {
      console.error(err);
    }
  }
}
