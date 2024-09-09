import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  // Register a hover provider for markdown files
  const hoverProvider = vscode.languages.registerHoverProvider("markdown", {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position, /\[\[(.*?)\]\]/);
      if (range) {
        const fileName = document
          .getText(range)
          .replace(/\[\[|\]\]/g, "")
          .trim();
        const filePath = vscode.workspace.rootPath
          ? path.join(vscode.workspace.rootPath, `${fileName}.md`)
          : null;

        if (filePath && fs.existsSync(filePath)) {
          const uri = vscode.Uri.file(filePath);
          const markdownString = new vscode.MarkdownString(
            `[Go to ${fileName}](${uri})`
          );
          markdownString.isTrusted = true; // Allow the link to be clickable
          return new vscode.Hover(markdownString, range);
        } else {
          return new vscode.Hover(`File ${fileName}.md not found.`);
        }
      }
      return undefined;
    },
  });

  context.subscriptions.push(hoverProvider);
}

export function deactivate() {}
