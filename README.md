# Obsidian Navigation for VS Code

This extension enhances navigation and file management for Obsidian-like vaults in Visual Studio Code.

## Features

1. **Wikilink Hover Navigation**: Hover over wikilinks (`[[link]]`) to see file information and navigation options.

2. **Multi-File Matching**: The extension matches multiple files with the same name across your vault.

3. **Full Vault Watching and Lookup**: Monitors and indexes all markdown files in your workspace, allowing for quick lookups.

4. **Alias Notation Support**: Supports Obsidian's alias notation (`[[link|alias]]`).

5. **Create Non-Existent Files**: Easily create new files that don't exist yet, with a configurable inbox folder.

## Usage

- Hover over a wikilink (`[[link]]`) to see matching files and navigation options.
- If a link doesn't match any existing file, you'll see an option to create a new file.
- The extension watches your entire workspace for changes and updates its file cache accordingly.

## Configuration

- `obsidian-navigation.inboxFolder`: Set the folder where new files are created (default: "Inbox/").

## Commands

- `obsidian-navigation.createFile`: Creates a new file in the specified inbox folder.

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Obsidian Navigation"
4. Click Install

## Requirements

- Visual Studio Code v1.91.0 or higher

## Known Issues

Please report any issues on the GitHub repository.

## Release Notes

See the [CHANGELOG.md](CHANGELOG.md) file for detailed release notes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This extension is licensed under the [MIT License](LICENSE).
