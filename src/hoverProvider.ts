import * as vscode from "vscode";
import * as path from "path";

export function setupHoverProvider(fileCache: Map<string, string[]>): vscode.Disposable {
  return vscode.languages.registerHoverProvider("markdown", {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position, /\[\[(.*?)\]\]/);
      if (range) {
        const linkPath = document.getText(range).replace(/\[\[|\]\]/g, "").trim();
        const fileName = path.basename(linkPath, ".md");
        const cachedFiles = fileCache.get(fileName);

        let targetFiles: string[] = [];

        if (cachedFiles) {
          if (linkPath.includes('/')) {
            const normalizedPath = linkPath.endsWith(".md") ? linkPath : `${linkPath}.md`;
            targetFiles = cachedFiles.filter(p => p === normalizedPath);
          } else {
            targetFiles = cachedFiles.map(p => p);
          }
        }

        if (targetFiles && targetFiles.length > 0) {
          let links;
          if (targetFiles.length > 1) {
            links = targetFiles.map(filePath => {
              const uri = vscode.Uri.file(path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, filePath));
              return `- [Go to ${path.basename(filePath, ".md")}](${uri}) (${filePath})`;
            }).join("\n");
          } else {
            links = targetFiles.map(filePath => {
              const uri = vscode.Uri.file(path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, filePath));
              return `[Go to ${path.basename(filePath, ".md")}](${uri}) (${filePath})`;
            }).join("\n");
          }
          const markdownString = new vscode.MarkdownString(links);
          markdownString.isTrusted = true; // Allow the links to be clickable
          return new vscode.Hover(markdownString, range);
        } else {
          return new vscode.Hover(`File ${linkPath}.md not found.`);
        }
      }
      return undefined;
    },
  });
}