import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Register a hover provider for markdown files
  const hoverProvider = vscode.languages.registerHoverProvider("markdown", {
    async provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position, /\[\[(.*?)\]\]/);
      if (!range) return;

      const [fileName] = document
        .getText(range)
        .replace(/\[\[|\]\]/g, "")
        .trim()
        .split("|");

      const [uri] = await vscode.workspace.findFiles(`**/${fileName}.md`);
      if (!uri) return new vscode.Hover(`File ${fileName}.md not found.`);

      const markdownString = new vscode.MarkdownString(
        `[Go to ${fileName}](${uri})`
      );
      markdownString.isTrusted = true; // Allow the link to be clickable
      return new vscode.Hover(markdownString, range);
    },
  });

  context.subscriptions.push(hoverProvider);
}

export function deactivate() {}
