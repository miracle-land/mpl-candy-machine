const path = require("path");

const programDir = path.join(__dirname, "..", "programs");
function getProgram(dir, programName) {
  return path.join(programDir, dir, "target", "deploy", programName);
}
function getExternalProgram(programName) {
  return path.join(__dirname, "external-programs", programName);
}

module.exports = {
  validator: {
    commitment: "processed",
    accountsCluster: "https://metaplex.devnet.rpcpool.com/",
    programs: [
      {
        label: "Candy Machine Core",
        programId: "CMv3YQQ7nbhFUjArAcGuRcDa6avoYN1a72HRZMvJ6WnU",
        deployPath: getProgram(
          "candy-machine-core",
          "mpl_candy_machine_core.so"
        ),
      },
      {
        label: "Candy Guard",
        programId: "cgrdgM8aM2K2vCyKx3XRgF24qfFJnbNsvEa8EmRi4tK",
        deployPath: getProgram("candy-guard", "mpl_candy_guard.so"),
      },
      {
        label: "Token Metadata",
        programId: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
        deployPath: getExternalProgram("mpl_token_metadata.so"),
      },
      {
        label: "Token Auth Rules",
        programId: "auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg",
        deployPath: getExternalProgram("mpl_token_auth_rules.so"),
      },
      {
        label: "System Extras",
        programId: "SysExL2WDyJi9aRZrXorrjHJut3JwHQ7R9bTyctbNNG",
        deployPath: getExternalProgram("mpl_system_extras.so"),
      },
      {
        label: "Token Extras",
        programId: "TokExjvjJmhKaRBShsBAsbSvEWMA1AgUNK7ps4SAc2p",
        deployPath: getExternalProgram("mpl_token_extras.so"),
      },
      {
        label: "Civic Gateway",
        programId: "gatem74V238djXdzWnJf94Wo1DcnuGkfijbf3AuBhfs",
        deployPath: getExternalProgram("civic_gateway.so"),
      },
    ],
    accounts: [
      {
        label: "Metaplex Default RuleSet",
        accountId: "eBJLFYPxJmMGKuFwpDWkzxZeUrad92kZRC5BJLpzyT9",
        executable: false,
      },
    ],
  },
};
