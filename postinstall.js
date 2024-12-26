import { execSync } from "child_process";
import path from "path";
console.log("working");
try {
  const cliPath = path.join(__dirname, "cli.js");

  execSync(`node ${cliPath}`, { stdio: "inherit" });
} catch (error) {
  console.error(
    "An error occurred during the postinstall process:",
    error.message
  );
}
