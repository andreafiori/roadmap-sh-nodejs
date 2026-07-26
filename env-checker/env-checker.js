// envChecker.js
function printError(message) {
  console.error(`error: ${message}`);
  return { success: false, message };
}

function getMissingNames(names, env = process.env) {
  if (!Array.isArray(names)) {
    throw new Error("names must be an array");
  }
  return names.filter((name) => !(name in env));
}

function printSuccess(names) {
  names.forEach((name) => console.log(`Set: ${name}`));
  console.log("All required environment variables are set.");
  return { success: true };
}

function validateInput(names) {
  if (!names || names.length === 0) {
    return printError("please provide at least one environment variable name");
  }
  return null;
}

function checkEnvironmentVariables(names, env = process.env) {
  const error = validateInput(names);
  if (error) return error;

  const missingNames = getMissingNames(names, env);
  if (missingNames.length > 0) {
    return printError(`missing environment variables: ${missingNames.join(", ")}`);
  }
  return printSuccess(names);
}

// Main function for CLI usage
function main() {
  const requiredNames = process.argv.slice(2);
  const result = checkEnvironmentVariables(requiredNames);
  if (!result.success) {
    process.exitCode = 1;
  }
}

// Export for testing
module.exports = {
  getMissingNames,
  validateInput,
  checkEnvironmentVariables,
  printError,
  printSuccess,
};

// Run if executed directly
if (require.main === module) {
  main();
}
