
import { texSymbols } from "./texSymbols";

interface SymbolData {
  icon: string;
  data: string;
}

interface SymbolsProps {
  onClick: (data: string) => void;
}

export default function TexSymbols({ onClick }: SymbolsProps) {
  console.log(texSymbols, "texSymbols");

  const buttonNodes = texSymbols.map((symbol: SymbolData) => (
    <button
      type="button"
      key={symbol.icon}
      className="tex-button"
      onClick={() => onClick(symbol.data)}
      style={{
        width: "30px",
      }}
    >
      <img
        src={`/assets/icons/${symbol.icon}.png`}
        alt="img"
        width={30}
        height={30}
      />
    </button>
  ));

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        {buttonNodes}


      </div>
    </>
  );
}
