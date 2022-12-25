import fs from "fs";
import util from "util";

export default util.promisify(fs.unlink);
