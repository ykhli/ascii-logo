declare module "svg-builder" {
  export interface SVGAttributes {
    [key: string]: string | number;
  }

  export interface SVGInstance {
    width(value: string | number): SVGInstance;
    height(value: string | number): SVGInstance;
    rect(attributes: SVGAttributes): SVGInstance;
    text(attributes: SVGAttributes, content: string): SVGInstance;
    render(): string;
  }

  const svgBuilder: {
    newInstance(): SVGInstance;
  };

  export default svgBuilder;
}
