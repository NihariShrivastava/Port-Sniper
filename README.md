
# PortSniper – Port and Process Cleaner CLI

## Problem Statement

During day-to-day development, I frequently run local servers such as Node.js applications, React development servers, or backend APIs on ports like 3000 or 8080. Often, these processes are not terminated properly and continue running in the background. When I try to restart the application, I encounter errors such as:

“Port already in use” or “Address already in use”.

Manually identifying which process is occupying the port and terminating it using system commands is time-consuming and interrupts the development workflow. This problem occurs regularly and motivated the creation of this tool.

---

## Solution Overview

PortSniper is a command-line utility that helps developers quickly identify and terminate processes running on a specific port. The tool scans the system for the given port, displays the process details, asks for user confirmation, and safely terminates the process if approved.

The utility is designed to work across Windows, Linux, and macOS using only standard Node.js libraries.

---

## Technology Stack

* Language: JavaScript (Node.js)
* Standard Libraries Used:

  * child_process
  * os
  * readline
  * process

No external dependencies or frameworks are used.

---

## How to Run the Program

### Prerequisites

* Node.js installed (version 14 or above)

### Steps

Clone the repository:

```bash
git clone <repository-link>
cd portsniper
```

Run the program:

```bash
node portsniper.js --port 3000
```

Replace `3000` with any port number you want to inspect.

---

## Sample Output

```
Scanning port 3000...

Process Found:
PID   : 14832
Name  : node

Do you want to terminate this process? (y/n): y

Process terminated successfully.
```

Screenshots of sample output are included in the `screenshots` folder.

---

## Design Decisions

* Node.js was chosen for its cross-platform capabilities and strong system-level APIs.
* The program detects the operating system to execute appropriate system commands.
* A user confirmation step is included to prevent accidental termination of critical processes.
* Only standard libraries are used to comply with assignment guidelines.
* Clear and descriptive error handling is implemented for invalid input, unused ports, and permission issues.

---

## Demo Video

A short demonstration video explaining the problem, showing the tool in action, and discussing design decisions is available at the following link:

YouTube (Unlisted): <https://youtu.be/lSJr4zWQZx4>

---

## Author

Nihari Shrivastava

B.Tech, Electronics and Telecommunication Engineering

Aspiring Software Developer

---

## License

This project was developed for educational and evaluation purposes.

---

