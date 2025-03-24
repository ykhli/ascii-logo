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
  const fontSize = 14; // Numeric value for calculations
  const padding = 20; // Padding around the text

  // Calculate the width needed based on the longest line
  // Each character in monospace font should be given enough space
  const maxLineLength = Math.max(...lines.map((line) => line.length));
  // Add a safety margin to prevent text overflow
  const charWidth = fontSize * 0.7; // Slightly wider character estimation
  const calculatedWidth = maxLineLength * charWidth + padding * 2;

  // Use calculated width if no width provided or if calculated width is larger
  const width =
    options.width && options.width !== "auto"
      ? Math.max(parseInt(options.width), calculatedWidth).toString()
      : calculatedWidth.toString();

  // Calculate height with adequate space
  const calculatedHeight = lines.length * lineHeight + padding * 2;
  const height = options.height
    ? Math.max(parseInt(options.height), calculatedHeight).toString()
    : calculatedHeight.toString();

  // Create SVG
  const svg = svgBuilder.newInstance().width(width).height(height);

  // Unfortunately, svg-builder doesn't have an attr method for adding attributes
  // We'll need to manually add viewBox and preserveAspectRatio to the output later

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
        x: padding,
        y: padding + (index + 1) * lineHeight,
        "font-family": fontFamily,
        "font-size": `${fontSize}px`,
        fill: options.color,
        "text-rendering": "optimizeLegibility",
        "shape-rendering": "crispEdges",
        "white-space": "pre",
      },
      preservedLine
    );
  });

  // Get the rendered SVG
  let svgOutput = svg.render();

  // Manually add viewBox and preserveAspectRatio attributes to the SVG tag
  svgOutput = svgOutput.replace(
    '<svg width="' + width + '" height="' + height + '"',
    '<svg width="' +
      width +
      '" height="' +
      height +
      '" viewBox="0 0 ' +
      width +
      " " +
      height +
      '" preserveAspectRatio="xMinYMin meet"'
  );

  return svgOutput;
}
