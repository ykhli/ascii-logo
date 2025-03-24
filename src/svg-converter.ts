import svgBuilder from "svg-builder";

export interface SVGOptions {
  color: string;
  backgroundColor: string;
  width: string;
  height: string | null;
}

/**
 * Convert ASCII art to SVG
 *
 * @param asciiArt The ASCII art to convert
 * @param options SVG options
 * @returns SVG content as string
 */
export function createSVG(asciiArt: string, options: SVGOptions): string {
  const lines = asciiArt.split("\n");
  const lineHeight = 16; // Pixel height for each text line
  const fontFamily = "monospace";
  const fontSize = "14px";

  // Calculate dimensions
  const width = options.width || "500";
  const height = options.height || `${lines.length * lineHeight + 20}`;

  // Create SVG
  const svg = svgBuilder.newInstance().width(width).height(height);

  // Add background if not transparent
  if (options.backgroundColor !== "transparent") {
    svg.rect({
      x: 0,
      y: 0,
      width: "100%",
      height: "100%",
      fill: options.backgroundColor,
    });
  }

  // Add each line of ASCII art as text
  lines.forEach((line, index) => {
    // Replace spaces with non-breaking spaces to preserve formatting
    const preservedLine = line.replace(/ /g, "\u00A0");

    svg.text(
      {
        x: 10,
        y: (index + 1) * lineHeight,
        "font-family": fontFamily,
        "font-size": fontSize,
        fill: options.color,
      },
      preservedLine
    );
  });

  return svg.render();
}
