# ASCII Logo Generator

A CLI tool to generate pretty ASCII fonts and convert them to SVG logos.

## Installation

```bash
npm install -g ascii-logo-generator
```

Or run directly with npx:

```bash
npx ascii-logo-generator
```

## Usage

### List Available Fonts

```bash
ascii-logo list-fonts
```

### Generate ASCII Art

```bash
ascii-logo generate "Hello World"
```

### Generate ASCII Art with Custom Font

```bash
ascii-logo generate "Hello World" --font "Graffiti"
```

### Save ASCII Art to File

```bash
ascii-logo generate "Hello World" --output hello.txt
```

### Generate SVG Logo

```bash
ascii-logo generate "Hello World" --svg
```

### Customize SVG Logo

```bash
ascii-logo generate "Hello World" --svg --color "#FF0000" --background "#000000" --width 800
```

## Options

- `-f, --font <font>`: Font to use (default: "Standard")
- `-o, --output <outputFile>`: Output file (optional)
- `-s, --svg`: Convert to SVG
- `-c, --color <color>`: Text color for SVG (hex code or name, default: "#000000")
- `-b, --background <color>`: Background color for SVG (hex code or name, default: "transparent")
- `-w, --width <width>`: SVG width (default: "500")
- `-h, --height <height>`: SVG height (default: "auto")

## License

MIT
