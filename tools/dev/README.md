# SVG Viewer Development Tool

This directory contains a simple web-based SVG viewer tool to help with development and testing of the ASCII Logo Generator.

## Features

- Displays sample SVG files from the public directory
- Drag and drop additional SVG files to view them
- Compare text-based and path-based SVG implementations side by side

## Usage

Run the viewer with:

```bash
npm run viewer
```

## SVG Implementations

The viewer includes two sample SVG implementations:

1. **Text-based SVG**: Uses standard `<text>` elements to render text
2. **Path-based SVG**: Uses `<path>` elements to render text characters

This makes it easy to compare the visual differences between these approaches.

## Note

This viewer is a development tool and is not included in the published npm package. It's only available in the repository for development purposes.
