import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'components/ui/pagination';
import { cn } from 'utils/styleUtils';

interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  count: number;
  pageCount: number;
}

interface IProps {
  className: string;
  currentPage: number;
  setCurrentPage: (state: number) => void;
  paginationInfo: PaginationInfo;
}

export const Pagination = ({ className, currentPage, setCurrentPage, paginationInfo }: IProps) => {
  // const { pageNumber, pageCount } = paginationInfo;
  console.log(paginationInfo, 'pagination info');

  const handleNextPage = () => {
    if (currentPage < paginationInfo?.pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <PaginationRoot className={cn(className, 'dark:text-slate-400')}>
      <PaginationContent>
        {/* Oldingi sahifa tugmasi */}
        <PaginationItem className="cursor-pointer select-none">
          <PaginationPrevious onClick={handlePrevPage} />
        </PaginationItem>

        {/* Agar kerak bo‘lsa, Ellipsis chiqaramiz */}
        {paginationInfo?.pageNumber > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Oldingi sahifa raqami */}
        {paginationInfo?.pageNumber > 1 && (
          <PaginationItem className="cursor-pointer select-none">
            <PaginationLink onClick={handlePrevPage}>{currentPage - 1}</PaginationLink>
          </PaginationItem>
        )}

        {/* Hozirgi sahifa */}
        <PaginationItem className="cursor-pointer select-none">
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>

        {/* Keyingi sahifa raqami */}
        {paginationInfo?.pageNumber < paginationInfo?.pageCount && (
          <PaginationItem className="cursor-pointer select-none">
            <PaginationLink onClick={handleNextPage}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        )}

        {/* Agar kerak bo‘lsa, Ellipsis chiqaramiz */}
        {paginationInfo?.pageNumber < paginationInfo?.pageCount - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Keyingi sahifa tugmasi */}
        <PaginationItem className="cursor-pointer select-none">
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};
