import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const fileCache = new Map<string, vscode.Uri>();

  const findFile = async (fileName: string) => {
    let uri = fileCache.get(fileName);
    if (uri) return uri;
    [uri] = await vscode.workspace.findFiles(`**/${fileName}.md`);
    if (uri) fileCache.set(fileName, uri);
    return uri;
  };

  const evictStaleEntries = (uri: vscode.Uri) => {
    for (const [filename] of fileCache) {
      const pattern = new RegExp(`${filename}.md$`);
      if (pattern.test(uri.path)) fileCache.delete(filename);
    }
  };
  const fileSystemWatcher = vscode.workspace.createFileSystemWatcher("**/*.md");
  fileSystemWatcher.onDidCreate(evictStaleEntries); // remove cached filenames in the case this is a duplicate filename
  fileSystemWatcher.onDidDelete(evictStaleEntries);

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

      const uri = await findFile(fileName);
      if (!uri) return new vscode.Hover(`File ${fileName}.md not found.`);

      const markdownString = new vscode.MarkdownString(
        `[Go to ${fileName}](${uri})`
      );
      markdownString.isTrusted = true; // Allow the link to be clickable
      return new vscode.Hover(markdownString, range);
    },
  });

  context.subscriptions.push(hoverProvider);
  context.subscriptions.push(fileSystemWatcher);
}

export function deactivate() {}
