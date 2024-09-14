import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function updateChangelog(entry: string) {
  const changelogPath = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, 'changelog.md');
  const logEntry = `- ${entry}`;
  if (fs.existsSync(changelogPath)) {
    fs.appendFileSync(changelogPath, `\n${logEntry}`);
  } else {
    const subheading = `## File Cache Updates\n\n${logEntry}`;
    fs.writeFileSync(changelogPath, subheading);
  }
}