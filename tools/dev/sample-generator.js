/**
 * Simple map of ASCII characters to SVG path data
 */
const charToPathMap = {
  A: "M0,12 L4,0 L8,12 M2,8 L6,8",
  B: "M0,0 L0,12 L6,12 C8,12 8,9 6,8 C8,7 8,4 6,3 L0,3 M0,8 L6,8",
  C: "M8,2 C8,0 4,0 2,0 C0,0 0,4 0,6 C0,8 0,12 2,12 C4,12 8,12 8,10",
  1: "M2,3 L4,0 L4,12 M2,12 L6,12",
  2: "M0,3 C0,0 4,0 6,0 C8,0 8,3 8,4 C8,6 6,8 4,10 L0,12 L8,12",
  3: "M0,2 C0,0 4,0 6,0 C8,0 8,3 6,6 C8,8 8,12 6,12 C4,12 0,12 0,10 M2,6 L6,6",
  "!": "M4,0 L4,8 M4,10 L4,12",
  "?": "M0,3 C0,0 4,0 6,0 C8,0 8,3 7,5 C6,7 4,7 4,9 M4,11 L4,12",
  " ": "",
  _default: "M0,0 L8,0 L8,12 L0,12 Z",
};

/**
 * Generate a text-based SVG (using <text> elements)
 */
export function generateTextSVG(options) {
  const { text, color = "black", backgroundColor = "transparent" } = options;
  const lines = text.split("\n");
  const lineHeight = 16; // Pixel height for each text line
  const width = 200;
  const height = lines.length * lineHeight + 20;

  // Start SVG markup
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;

  // Add background if not transparent
  if (backgroundColor !== "transparent") {
    svg += `<rect x="0" y="0" width="100%" height="100%" fill="${backgroundColor}" />`;
  }

  // Add each line of text
  lines.forEach((line, index) => {
    // Replace spaces with non-breaking spaces to preserve formatting
    const preservedLine = line.replace(/ /g, "\u00A0");

    svg += `<text x="10" y="${(index + 1) * lineHeight}" 
      font-family="monospace" 
      font-size="14px" 
      fill="${color}">${preservedLine}</text>`;
  });

  // Close SVG tag
  svg += "</svg>";

  return svg;
}

/**
 * Generate a path-based SVG (using <path> elements instead of text)
 */
export function generatePathSVG(options) {
  const { text, color = "black", backgroundColor = "transparent" } = options;
  const lines = text.split("\n");
  const lineHeight = 16; // Pixel height for each line
  const charWidth = 10; // Width of each character
  const width = 200;
  const height = lines.length * lineHeight + 20;

  // Start SVG markup
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;

  // Add background if not transparent
  if (backgroundColor !== "transparent") {
    svg += `<rect x="0" y="0" width="100%" height="100%" fill="${backgroundColor}" />`;
  }

  // Add each character as a path
  lines.forEach((line, lineIndex) => {
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char !== " ") {
        const x = 10 + i * charWidth;
        const y = lineIndex * lineHeight + 5;

        // Get path data for the character (or use default)
        const pathData = charToPathMap[char] || charToPathMap._default;

        if (pathData) {
          // Add the path element
          svg += `<path d="${pathData}" 
            fill="none" 
            stroke="${color}" 
            stroke-width="1" 
            transform="translate(${x}, ${y})" 
            data-char="${char}" />`;
        }
      }
    }
  });

  // Close SVG tag
  svg += "</svg>";

  return svg;
}
