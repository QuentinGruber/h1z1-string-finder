const locale = require("soe-locale");
const fs = require("fs");
const Jenkins = require("hash-jenkins");
const { program } = require("commander");

const strings = locale.parseFromBuffer(
  fs.readFileSync("Locale/en_us_data.dat"),
  fs.readFileSync("Locale/en_us_data.dir"),
);

function lookupString(stringId) {
  var hash = Jenkins.lookup2("Global.Text." + stringId);
  if (hash in strings) {
    return strings[hash].string;
  } /*else {
    return "[STRING #" + stringId + "NOT FOUND]";
  }*/
}

program.option("-a, --all", "log all strings");
program.option("-j, --json", "log all strings in a .json file");
program.parse(process.argv);

if (program.json) {
  const stringList = [];
  Object.keys(strings).forEach((string, stringid) => {
    stringList.push({ id: stringid, text: lookupString(stringid) });
  });
  fs.writeFileSync("strings.json", JSON.stringify(stringList));
} else {
  if (program.all) {
    for (let i = 0; i < 2147483647; i++) {
      const result = lookupString(i);
      if (result) {
        console.log(`String ID #${i}: ${result}`);
      }
    }
  } else {
    const { args } = program.parse(process.argv);
    args.forEach((arg) => {
      console.log(`String ID #${arg}: ${lookupString(arg)}`);
    });
  }
}
