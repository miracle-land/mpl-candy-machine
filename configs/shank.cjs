const path = require("path");
const { generateIdl } = require("@metaplex-foundation/shank-js");

const idlDir = path.join(__dirname, "..", "idls");
const binaryInstallDir = path.join(__dirname, "..", ".crates");
const programDir = path.join(__dirname, "..", "programs");

generateIdl({
  generator: "anchor",
  programName: "candy_machine_core",
  programId: "CMv3YQQ7nbhFUjArAcGuRcDa6avoYN1a72HRZMvJ6WnU",
  idlDir,
  binaryInstallDir,
  programDir: path.join(programDir, "candy-machine-core", "program"),
});

generateIdl({
  generator: "anchor",
  programName: "candy_guard",
  programId: "cgrdgM8aM2K2vCyKx3XRgF24qfFJnbNsvEa8EmRi4tK",
  idlDir,
  binaryInstallDir,
  programDir: path.join(programDir, "candy-guard", "program"),
});
