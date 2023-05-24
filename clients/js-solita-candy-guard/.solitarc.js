// @ts-check
const path = require('path');
const programDir = path.join(__dirname, '..', '..', 'programs', 'candy-guard', 'program');
const idlDir = path.join(__dirname, 'idl');
const sdkDir = path.join(__dirname, 'src', 'generated');
const binaryInstallDir = path.join(__dirname, '..', '..', '.crates');

const idlHook = (idl) => {
  idl.instructions.map((ix) => {
    ix.defaultOptionalAccounts = true;
  });
  return idl;
};

module.exports = {
  idlGenerator: 'anchor',
  programName: 'candy_guard',
  programId: 'CguarSUzT8jJEudNF9adPGeQnwcaf7i5CgFWdRbLEvfN',
  idlDir,
  idlHook,
  sdkDir,
  binaryInstallDir,
  programDir,
};
