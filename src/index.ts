#!/usr/bin/env node

import { program } from "commander";
import figlet from "figlet";
import fs from "fs";
import path from "path";
import { createSVG } from "./svg-converter";

// Get version from package.json
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf8")
);

// Setup CLI
program
  .name("ascii-logo")
  .description("Generate ASCII fonts and convert them to SVG logos")
  .version(packageJson.version);

// List available fonts command
program
  .command("list-fonts")
  .description("List all available figlet fonts")
  .action(() => {
    console.log("Available Fonts:");
    const fonts = figlet.fontsSync();
    fonts.forEach((font) => console.log(`- ${font}`));
  });

// Generate ASCII art command
program
  .command("generate")
  .description("Generate ASCII font text")
  .argument("<text>", "Text to convert")
  .option("-f, --font <font>", "Font to use", "Standard")
  .option("-o, --output <outputFile>", "Output file (optional)")
  .option("-s, --svg", "Convert to SVG")
  .option(
    "-c, --color <color>",
    "Text color for SVG (hex code or name)",
    "#000000"
  )
  .option(
    "-b, --background <color>",
    "Background color for SVG (hex code or name)",
    "transparent"
  )
  .option("-w, --width <width>", "SVG width", "500")
  .option("-h, --height <height>", "SVG height", "auto")
  .action((text, options) => {
    try {
      // Generate ASCII art
      const asciiArt = figlet.textSync(text, {
        font: options.font,
        horizontalLayout: "default",
        verticalLayout: "default",
      });

      // Display ASCII art in console
      console.log(asciiArt);

      // Save ASCII art to file if output is specified
      if (options.output && !options.svg) {
        fs.writeFileSync(options.output, asciiArt);
        console.log(`ASCII art saved to ${options.output}`);
      }

      // Convert to SVG if requested
      if (options.svg) {
        const svgContent = createSVG(asciiArt, {
          color: options.color,
          backgroundColor: options.background,
          width: options.width,
          height: options.height === "auto" ? null : options.height,
        });

        // Determine output filename for SVG
        const svgFilename = options.output || `ascii-logo-${Date.now()}.svg`;
        const svgOutputPath = svgFilename.endsWith(".svg")
          ? svgFilename
          : `${svgFilename}.svg`;

        // Save SVG to file
        fs.writeFileSync(svgOutputPath, svgContent);
        console.log(`SVG logo saved to ${svgOutputPath}`);
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      process.exit(1);
    }
  });

// Interactive mode (when no commands provided)
if (process.argv.length === 2) {
  console.log(figlet.textSync("ASCII Logo Generator", { font: "Standard" }));
  console.log("\nWelcome to ASCII Logo Generator!");
  console.log("Run with --help to see available commands");
}

program.parse(process.argv);
