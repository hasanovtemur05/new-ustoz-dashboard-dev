declare module "brainly-style-guide" {
  // Define MathSymbolType if it's a union of specific strings or enums
  export type MathSymbolType = string; // Adjust this type if more specific

  // Define MathSymbol component with its expected props
  export const MathSymbol: React.FC<{ type: MathSymbolType }>;
}
