import * as vscode from "vscode";
import { initializeFileCache, getFileCache } from "./fileCache";
import { setupFileWatcher } from "./fileWatcher";
import { setupHoverProvider } from "./hoverProvider";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  console.log("Extension activated");

  initializeFileCache();
  
  const watcher = setupFileWatcher(getFileCache());
  context.subscriptions.push(watcher);

  const hoverProvider = setupHoverProvider(getFileCache());
  context.subscriptions.push(hoverProvider);

  context.subscriptions.push(
    vscode.commands.registerCommand('obsidian-navigation.createFile', async (filePath: string) => {
      const config = vscode.workspace.getConfiguration('obsidian-navigation');
      const inboxFolder = config.get<string>('inboxFolder') || 'Inbox/';
      const fullPath = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, inboxFolder, filePath);
      const dir = path.dirname(fullPath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, '');
        vscode.window.showInformationMessage(`Created file: ${fullPath}`);
        
        // Open the newly created file in a new tab
        const document = await vscode.workspace.openTextDocument(fullPath);
        await vscode.window.showTextDocument(document, { preview: false });
      } else {
        vscode.window.showWarningMessage(`File already exists: ${fullPath}`);
        
        // Open the existing file in a new tab
        const document = await vscode.workspace.openTextDocument(fullPath);
        await vscode.window.showTextDocument(document, { preview: false });
      }
    })
  );
}

export function deactivate() {}
