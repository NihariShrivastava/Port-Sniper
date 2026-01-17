#!/usr/bin/env node

/**
 * PortSniper
 * A cross-platform CLI tool to detect and terminate
 * processes running on a given port.
 */

const { exec } = require("child_process");
const os = require("os");
const readline = require("readline");

// -------------------- Utility Functions --------------------

function isValidPort(port) {
  return Number.isInteger(port) && port > 0 && port <= 65535;
}

function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
}

// -------------------- Core Logic --------------------

function findProcessByPort(port) {
  const platform = os.platform();

  return new Promise((resolve, reject) => {
    let command;

    if (platform === "win32") {
      command = `netstat -ano | findstr :${port}`;
    } else {
      command = `lsof -i :${port} -sTCP:LISTEN`;
    }

    exec(command, (error, stdout) => {
      if (error || !stdout) {
        reject(new Error("No process found on this port."));
        return;
      }

      try {
        if (platform === "win32") {
          const lines = stdout.trim().split("\n");
          const parts = lines[0].trim().split(/\s+/);
          const pid = parseInt(parts[parts.length - 1], 10);
          resolve({ pid, name: "Unknown (Windows)" });
        } else {
          const lines = stdout.trim().split("\n");
          const columns = lines[1].split(/\s+/);
          const name = columns[0];
          const pid = parseInt(columns[1], 10);
          resolve({ pid, name });
        }
      } catch {
        reject(new Error("Failed to parse process information."));
      }
    });
  });
}

function killProcess(pid) {
  try {
    process.kill(pid);
    return true;
  } catch {
    return false;
  }
}

// -------------------- CLI Entry --------------------

async function main() {
  const args = process.argv.slice(2);
  const portIndex = args.indexOf("--port");

  if (portIndex === -1 || !args[portIndex + 1]) {
    console.error("❌ Usage: node portsniper.js --port <PORT>");
    process.exit(1);
  }

  const port = parseInt(args[portIndex + 1], 10);

  if (!isValidPort(port)) {
    console.error("❌ Invalid port number.");
    process.exit(1);
  }

  console.log(`🔍 Scanning port ${port}...\n`);

  try {
    const processInfo = await findProcessByPort(port);

    console.log("Process Found:");
    console.log(`PID   : ${processInfo.pid}`);
    console.log(`Name  : ${processInfo.name}\n`);

    const confirm = await askConfirmation(
      "⚠ Do you want to terminate this process? (y/n): "
    );

    if (!confirm) {
      console.log("❎ Operation cancelled by user.");
      return;
    }

    const success = killProcess(processInfo.pid);

    if (success) {
      console.log("✅ Process terminated successfully.");
    } else {
      console.error("❌ Failed to terminate the process.");
    }
  } catch (err) {
    console.error(`❌ ${err.message}`);
  }
}

main();
