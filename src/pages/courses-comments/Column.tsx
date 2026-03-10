import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { useState } from 'react';

interface IProps {
  currentPage: number;
  pageSize: number;
  onCommentClick: (comment: any) => void;
  onRepliesClick: (comment: any) => void;
  getRowData: (comment: any) => void;
  setDialogOpen: (state: boolean) => void;
  setReplayOpen: (state: boolean) => void;
}

export const createCourseCommentsColumns = ({
  currentPage,
  pageSize,
  onCommentClick,
  onRepliesClick,
  getRowData,
  setDialogOpen,
  setReplayOpen,
}: IProps): ColumnDef<any>[] => [
  {
    accessorKey: 'id',
    header: 'T/R',
    cell: ({ row }) => row.index + 1 + (currentPage - 1) * pageSize,
  },
  {
    accessorKey: 'user.firstname',
    header: 'Foydalanuvchi',
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-2">
          {user.photoUrl && (
            <img
              src={user.photoUrl}
              alt={user.firstname}
              className="w-6 h-6 rounded-full"
            />
          )}
          <span>
            {user.firstname} {user.lastname}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'value',
    header: 'Ball',
    cell: ({ row }) => {
      const value = row.getValue<number>('value');
      return (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
                star <= value ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span className="ml-1 text-sm text-gray-600">{value}/5</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Yaratilgan sana',
    cell: ({ row }) => {
      const dateStr = row.getValue<string>('createdAt');
      const date = new Date(dateStr);
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: 'isLiked',
    header: 'Like',
    cell: ({ row }) => {
      const liked = row.getValue<boolean>('isLiked');
      return (
        <span className={`font-semibold ${liked ? 'text-green-600' : 'text-gray-400'}`}>
          {liked ? 'Ha' : "Yo'q"}
        </span>
      );
    },
  },
  {
    accessorKey: 'content',
    header: 'Izoh',
    cell: ({ row }) => {
      const content = row.getValue<string>('content');
      const truncated = content.length > 80 ? content.substring(0, 80) + '...' : content;
      return (
        <button
          onClick={() => onCommentClick(row.original)}
          className="text-left hover:text-blue-600 transition-colors cursor-pointer max-w-md"
        >
          <p className="line-clamp-2">{truncated}</p>
          {content.length > 80 && (
            <span className="text-blue-600 text-sm font-medium">Ko'proq o'qish</span>
          )}
        </button>
      );
    },
  },
  {
    accessorKey: 'replies',
    header: 'Javoblar',
    cell: ({ row }) => {
      const repliesArray = row.original.replies || [];
      const repliesCount = repliesArray.length;
      
      if (repliesCount === 0) {
        return <span className="text-gray-400">Javob yo'q</span>;
      }

      return (
        <button
          onClick={() => onRepliesClick(row.original)}
          className="text-left hover:text-blue-600 transition-colors cursor-pointer"
        >
          <span className="text-blue-600 font-medium">{repliesCount} ta javob</span>
          <span className="text-blue-600 text-sm ml-1">Ko'rish</span>
        </button>
      );
    },
  },
  {
    accessorKey: 'id',
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <DataTableRowActions
            row={row}
            getRowData={getRowData}
            setDialogOpen={setDialogOpen}
            setReplayOpen={setReplayOpen}
          />
        </div>
      );
    },
  },
];