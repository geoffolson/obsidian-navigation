# Change Log

All notable changes to the "obsidian-links" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.1] - 2024-09-09

- Initial release

## [XXX] - 2024-09-14

### Enhancements

- Implemented multi-file matching for files with the same name across the vault
- Added feature to create non-existent files with a configurable inbox folder
- Implemented support for Obsidian's alias notation ([[link|alias]])

### Implementation Improvements

- Added full vault watching and lookup for efficient file indexing
- Implemented file cache system for improved performance
- Added file watcher to keep the cache updated
- Updated extension configuration to include inbox folder setting
- Added command to create new files in the specified inbox folder

### Internal Improvements

- Added esbuild configuration for efficient bundling
- Updated package.json with new commands and configuration options