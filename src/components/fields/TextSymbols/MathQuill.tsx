
import TexSymbols from "./TextSymbols";
import  { addStyles as addMathquillStyles  ,EditableMathField } from "react-mathquill";
addMathquillStyles();


interface MathQuillProps {
  formula: string;
  setFormula: React.Dispatch<React.SetStateAction<string>>;
}
interface MathField {
  latex: () => string;
}


export default function MathQuill({ formula, setFormula }: MathQuillProps) {
  function handleChange(mathField: MathField) {
    setFormula(mathField.latex());
    console.log(mathField.latex(), "formula");
  }

  function handleInsertSymbol(symbol: string) {
    console.log(symbol);
    console.log(formula, "formula");
    setFormula((oldFormula) => oldFormula + symbol);
  }
  return (
    <>
      <TexSymbols onClick={handleInsertSymbol} />
      <EditableMathField latex={formula} onChange={handleChange} />
      <hr />
    </>
  );
}
