import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

let fileCache: Map<string, string[]> = new Map();

export function initializeFileCache() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    return;
  }

  workspaceFolders.forEach(folder => {
    recursiveSearch(folder.uri.fsPath, folder.uri.fsPath);
  });
}

function recursiveSearch(dir: string, workspaceRoot: string) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      recursiveSearch(fullPath, workspaceRoot);
    } else if (stats.isFile() && path.extname(fullPath) === ".md") {
      const relativePath = path.relative(workspaceRoot, fullPath);
      const fileName = path.basename(fullPath, ".md");
      if (fileCache.has(fileName)) {
        fileCache.get(fileName)?.push(relativePath);
      } else {
        fileCache.set(fileName, [relativePath]);
      }
    }
  });
}

export function getFileCache(): Map<string, string[]> {
  return fileCache;
}

export function updateFileCache(fileName: string, relativePath: string, isDelete: boolean = false) {
  if (isDelete) {
    if (fileCache.has(fileName)) {
      const updatedPaths = fileCache.get(fileName)?.filter(p => p !== relativePath) || [];
      if (updatedPaths.length > 0) {
        fileCache.set(fileName, updatedPaths);
      } else {
        fileCache.delete(fileName);
      }
    }
  } else {
    if (fileCache.has(fileName)) {
      fileCache.get(fileName)?.push(relativePath);
    } else {
      fileCache.set(fileName, [relativePath]);
    }
  }
}