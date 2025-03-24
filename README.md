# ASCII Logo Generator

A command-line tool for creating ASCII text art and converting it to SVG logos.

## Installation

```bash
npm install -g ascii-logo-generator
```

## Usage

### Generate ASCII Art

```bash
# Basic usage
ascii-logo generate "Hello World"

# Use a specific font
ascii-logo generate "Hello World" --font "Standard"

# Save to a file
ascii-logo generate "Hello World" --output hello.txt
```

### Convert to SVG

```bash
# Generate an SVG
ascii-logo generate "Hello World" --svg

# Customize SVG colors
ascii-logo generate "Hello World" --svg --color "#3366FF" --background "#EEEEEE"

# Set custom dimensions
ascii-logo generate "Hello World" --svg --width 800 --height 200

# Save to a specific file
ascii-logo generate "Hello World" --svg --output my-logo.svg
```

### List Available Fonts

```bash
ascii-logo list-fonts
```

## API Options

| Option         | Alias | Description                                 | Default                 |
| -------------- | ----- | ------------------------------------------- | ----------------------- |
| `--font`       | `-f`  | Font to use for text rendering              | "Standard"              |
| `--output`     | `-o`  | Output file path                            | Auto-generated filename |
| `--svg`        | `-s`  | Convert to SVG format                       | false                   |
| `--color`      | `-c`  | Text color for SVG (hex code or name)       | "#000000"               |
| `--background` | `-b`  | Background color for SVG (hex code or name) | "transparent"           |
| `--width`      | `-w`  | SVG width                                   | "500"                   |
| `--height`     | `-h`  | SVG height                                  | "auto"                  |

## Examples

### Basic ASCII Art Generation

```bash
ascii-logo generate "Big Text"
```

Output:

```
 ____  _       _____         _
| __ )(_) __ _|_   _|____  _| |_
|  _ \| |/ _` | | |/ _ \ \/ / __|
| |_) | | (_| | | |  __/>  <| |_
|____/|_|\__, | |_|\___/_/\_\\__|
         |___/
```

### Creating an SVG with Custom Colors

```bash
ascii-logo generate "Logo" --svg --color "#FF6600" --background "#EEEEEE" --output brand-logo.svg
```

This will create an SVG file named `brand-logo.svg` with orange text on a light gray background.

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/yourusername/ascii-logo-generator.git
cd ascii-logo-generator

# Install dependencies
npm install

# Build the project
npm run build

# Run locally
npm start
```

### Running the SVG Viewer

This package includes a web-based SVG viewer for testing:

```bash
npm run viewer
```

## License

MIT
