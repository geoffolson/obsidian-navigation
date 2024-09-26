# Obsidian Navigation for VS Code

Navigate Your Obsidian Notes Directly in VS Code!
This extension allows you to quickly jump between your Obsidian-style Markdown notes (`[[FileName]]`) directly from the text editor in VS Code. If you're an Obsidian user or just prefer organizing your Markdown notes with wiki-style links, this extension will streamline your workflow by letting you open linked Markdown files in your workspace with a single click.

## Features

- Jump to files: Automatically detects Obsidian-style `[[FileName]]` links and lets you quickly navigate to the referenced .md files within your VS Code workspace.
- Hover Preview: See a tooltip with the file name when hovering over `[[FileName]]` links.
- Markdown Language Support: Works seamlessly within Markdown (.md) files.

## Usage

1. **Activate the Extension:** The extension will activate whenever you open a Markdown file.
2. **Jump to Linked Files:** Simply click or hover over any Obsidian-style `[[FileName]]` link in the editor, and the extension will attempt to open the corresponding .md file in your workspace.

### Example

If you have the following text in your Markdown file:

```
This note references [[MyOtherNote]].
```

When you hover over `[[MyOtherNote]]`, you'll see a tooltip. Click on the link, and if `MyOtherNote.md` exists in your workspace, it will open in a new editor tab.

## Limitations

- **Preview Window Support:** Currently, this extension works only in the text editor section of VS Code. Support for the Markdown preview window is not implemented yet but is planned for a future release.
- **File Scope:** The extension searches for .md files within your current workspace. Files outside the workspace won't be opened.

## Installation

1. Open VS Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or using the shortcut `Ctrl+Shift+X`.
3. Search for Obsidian Navigation.
4. Click Install.

## Known Issues

- **Non-existent Files:** If you attempt to jump to a file that doesn't exist, an error message will be shown. Ensure the linked file is present in your workspace.
- **Preview Section:** The extension does not currently support link navigation from the Markdown preview pane, only from the text editor.

## Planned Features

- Support for Markdown Preview: Future updates will include functionality to jump between links in the rendered Markdown preview window.
- Better Link Error Handling: Improvements to handle invalid or broken links more gracefully.
  Contributing
  If you have any ideas, requests, or bug reports, feel free to open an issue or contribute via pnticatedUser =
  | AuthenticatedAdmull requests on the project's repository.

## License

This extension is licensed under the MIT License.
