import * as vscode from "vscode";
import * as path from "path";

export function setupHoverProvider(
  fileCache: Map<string, string[]>
): vscode.Disposable {
  return vscode.languages.registerHoverProvider("markdown", {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position, /\[\[(.*?)\]\]/);
      if (range) {
        const linkPath = document
          .getText(range)
          .replace(/\[\[|\]\]/g, "")
          .trim();
        const linkTarget = linkPath.split("|")[0].trim().toLowerCase();
        const fileName = path.basename(linkTarget, ".md").toLowerCase();
        const cachedFiles = fileCache.get(fileName);

        let targetFiles: string[] = [];

        if (cachedFiles) {
          if (linkTarget.includes("/")) {
            const normalizedPath = linkTarget.endsWith(".md")
              ? linkTarget
              : `${linkTarget}.md`;
            targetFiles = cachedFiles.filter((p) => p.toLowerCase() === normalizedPath);
          } else {
            targetFiles = cachedFiles.map((p) => p);
          }
        }

        const config = vscode.workspace.getConfiguration("obsidian-navigation");
        const inboxFolder = config.get<string>("inboxFolder") || "Inbox/";

        if (targetFiles && targetFiles.length > 0) {
          let links;
          if (targetFiles.length > 1) {
            links = targetFiles
              .map((filePath) => {
                const uri = vscode.Uri.file(
                  path.join(
                    vscode.workspace.workspaceFolders![0].uri.fsPath,
                    filePath
                  )
                );
                return `- [Go to ${path.basename(
                  filePath,
                  ".md"
                )}](${uri}) (${filePath})`;
              })
              .join("\n");
          } else {
            links = targetFiles
              .map((filePath) => {
                const uri = vscode.Uri.file(
                  path.join(
                    vscode.workspace.workspaceFolders![0].uri.fsPath,
                    filePath
                  )
                );
                return `[Go to ${path.basename(
                  filePath,
                  ".md"
                )}](${uri}) (${filePath})`;
              })
              .join("\n");
          }
          const markdownString = new vscode.MarkdownString(links);
          markdownString.isTrusted = true; // Allow the links to be clickable
          return new vscode.Hover(markdownString, range);
        } else {
          const createLink = `[Create in Inbox](command:obsidian-navigation.createFile?${encodeURIComponent(
            JSON.stringify(inboxFolder + linkTarget + ".md")
          )})`;
          console.log("createLink", createLink);
          const markdownString = new vscode.MarkdownString(
            `File ${linkTarget}.md not found. ${createLink}`
          );
          markdownString.isTrusted = true; // Allow the links to be clickable
          return new vscode.Hover(markdownString, range);
        }
      }
      return undefined;
    },
  });
}
