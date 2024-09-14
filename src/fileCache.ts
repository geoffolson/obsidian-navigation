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
      if (fileCache.has(fileName.toLowerCase())) {
        fileCache.get(fileName.toLowerCase())?.push(relativePath);
      } else {
        fileCache.set(fileName.toLowerCase(), [relativePath]);
      }
    }
  });
}

export function getFileCache(): Map<string, string[]> {
  return fileCache;
}

export function updateFileCache(fileName: string, relativePath: string, isDelete: boolean = false) {
  const lowerFileName = fileName.toLowerCase();
  if (isDelete) {
    if (fileCache.has(lowerFileName)) {
      const updatedPaths = fileCache.get(lowerFileName)?.filter(p => p !== relativePath) || [];
      if (updatedPaths.length > 0) {
        fileCache.set(lowerFileName, updatedPaths);
      } else {
        fileCache.delete(lowerFileName);
      }
    }
  } else {
    if (fileCache.has(lowerFileName)) {
      fileCache.get(lowerFileName)?.push(relativePath);
    } else {
      fileCache.set(lowerFileName, [relativePath]);
    }
  }
}