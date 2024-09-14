# Obsidian Navigation for VS Code

Navigate Your Obsidian Notes Directly in VS Code!
This extension allows you to quickly jump between your Obsidian-style Markdown notes (`[[FileName]]`) directly from the text editor in VS Code. If you're an Obsidian user or just prefer organizing your Markdown notes with wiki-style links, this extension will streamline your workflow by letting you open linked Markdown files in your workspace with a single click.

## Features

- Jump to files: Automatically detects Obsidian-style `[[FileName]]` links and lets you quickly navigate to the referenced .md files within your VS Code workspace.
- Hover Preview: See a tooltip with the file name when hovering over `[[FileName]]` links.
- Markdown Language Support: Works seamlessly within Markdown (.md) files.
- Multi-File Matching: The extension matches multiple files with the same name across your vault.
- Full Vault Watching and Lookup: Monitors and indexes all markdown files in your workspace, allowing for quick lookups.
- Alias Notation Support: Supports Obsidian's alias notation (`[[link|alias]]`).
- Create Non-Existent Files: Easily create new files that don't exist yet, with a configurable inbox folder.

## Usage

1. **Activate the Extension:** The extension will activate whenever you open a Markdown file.
2. **Jump to Linked Files:** Simply click or hover over any Obsidian-style `[[FileName]]` link in the editor, and the extension will attempt to open the corresponding .md file in your workspace.
3. **Create New Files:** If a link doesn't match any existing file, you'll see an option to create a new file.

### Example

If you have the following text in your Markdown file:

```
This note references [[MyOtherNote]].
```

When you hover over `[[MyOtherNote]]`, you'll see a tooltip with matching files and navigation options. Click on the link, and if `MyOtherNote.md` exists in your workspace, it will open in a new editor tab.

## Configuration

- `obsidian-navigation.inboxFolder`: Set the folder where new files are created (default: "Inbox/").

## Commands

- `obsidian-navigation.createFile`: Creates a new file in the specified inbox folder.

## Installation

1. Open VS Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or using the shortcut `Ctrl+Shift+X`.
3. Search for Obsidian Navigation.
4. Click Install.

## Requirements

- Visual Studio Code v1.91.0 or higher

## Known Issues

- **Preview Section:** The extension does not currently support link navigation from the Markdown preview pane, only from the text editor.

## Planned Features

- Support for Markdown Preview: Future updates will include functionality to jump between links in the rendered Markdown preview window.

## Contributing

If you have any ideas, requests, or bug reports, feel free to open an issue or contribute via pull requests on the project's repository.

## Release Notes

See the [CHANGELOG.md](CHANGELOG.md) file for detailed release notes.

## License

This extension is licensed under the MIT License.
