import { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { useToast } from './ui/use-toast';

interface IProps {
  pgn: string;
}

const ChessboardComponent = ({ pgn }: IProps) => {
  const { toast } = useToast();
  const newGame = new Chess();
  const [fen, setFen] = useState('start');

  useEffect(() => {
    try {
      newGame.loadPgn(pgn);
      setFen(newGame.fen());
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Kiritilayotgan PGNda xatolik bor',
      });
    }
  }, [pgn]);

  return <Chessboard position={fen} />;
};

export default ChessboardComponent;
