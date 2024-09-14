import * as vscode from "vscode";
import * as path from "path";
import { updateFileCache } from "./fileCache";

export function setupFileWatcher(fileCache: Map<string, string[]>): vscode.FileSystemWatcher {
  const watcher = vscode.workspace.createFileSystemWatcher("**/*.md");

  watcher.onDidCreate((uri) => {
    const relativePath = path.relative(vscode.workspace.workspaceFolders![0].uri.fsPath, uri.fsPath);
    const fileName = path.basename(uri.fsPath, ".md");
    updateFileCache(fileName.toLowerCase(), relativePath);
  });

  watcher.onDidDelete((uri) => {
    const relativePath = path.relative(vscode.workspace.workspaceFolders![0].uri.fsPath, uri.fsPath);
    const fileName = path.basename(uri.fsPath, ".md");
    updateFileCache(fileName.toLowerCase(), relativePath, true);
  });

  return watcher;
}