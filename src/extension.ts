import * as vscode from "vscode";
import { initializeFileCache, getFileCache } from "./fileCache";
import { setupFileWatcher } from "./fileWatcher";
import { setupHoverProvider } from "./hoverProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log("Extension activated");

  initializeFileCache();
  
  const watcher = setupFileWatcher(getFileCache());
  context.subscriptions.push(watcher);

  const hoverProvider = setupHoverProvider(getFileCache());
  context.subscriptions.push(hoverProvider);
}

export function deactivate() {}
