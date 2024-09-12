import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import markdownit from "markdown-it";

// plugin to replace obsidian [[internal-link]] with valid markdown internal links
const replaceFilenamePlugin = (md: markdownit) => {
  md.core.ruler.push("replace_filename", (state) => {
    const Token = state.Token;

    state.tokens.forEach((blockToken) => {
      if (blockToken.type === "inline" && blockToken.children) {
        blockToken.children.forEach((token, idx) => {
          if (token.type === "text" && blockToken.children) {
            const text = token.content;

            // Regex to match [[filename]]
            const regex = /\[\[([^\]]+)\]\]/g;
            const newContent = text.replace(regex, "foo-bar");

            if (newContent !== text) {
              const newToken = new Token("text", "", 0);
              newToken.content = newContent;
              blockToken.children[idx] = newToken;
            }
          }
        });
      }
    });
  });
};

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

  // extending the markdown preview
  return {
    extendMarkdownIt(md: markdownit) {
      return md.use(replaceFilenamePlugin);
    },
  };
}

export function deactivate() {}
