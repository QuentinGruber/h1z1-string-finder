const locale = require("soe-locale");
const fs = require("fs");
const Jenkins = require("hash-jenkins");
const { program } = require("commander");

const strings = locale.parseFromBuffer(
  fs.readFileSync("Locale/en_us_data.dat"),
  fs.readFileSync("Locale/en_us_data.dir")
);

function lookupString(stringId) {
  var hash = Jenkins.lookup2("Global.Text." + stringId);
  if (hash in strings) {
    return strings[hash].string;
  } else {
    return "[STRING #" + stringId + "NOT FOUND]";
  }
}

program.option("-a, --all", "log all strings");
program.parse(process.argv);

if (program.all) {
  Object.keys(strings).forEach((string, stringid) => {
    console.log(`String ID #${stringid}: ${lookupString(stringid)}`);
  });
} else {
  const { args } = program.parse(process.argv);
  args.forEach((arg) => {
    console.log(`String ID #${arg}: ${lookupString(arg)}`);
  });
}
