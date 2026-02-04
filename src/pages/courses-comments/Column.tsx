import type { ColumnDef } from '@tanstack/react-table';
import type { CourseCommentsType } from 'modules/course-comments/types';

interface IProps {
  currentPage: number;
  pageSize: number;
  onCommentClick: (comment: CourseCommentsType['data'][0]) => void;
  onStatusChange: (commentId: string, newStatus: 'PENDING' | 'APPROVED' | 'REJECTED') => void;
}

export const createCourseCommentsColumns = ({
  currentPage,
  pageSize,
  onCommentClick,
  onStatusChange,
}: IProps): ColumnDef<CourseCommentsType['data'][0], unknown>[] => [
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
          {user.photoUrl && <img src={user.photoUrl} alt={user.firstname} className="w-6 h-6 rounded-full" />}
          <span>{user.firstname} {user.lastname}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Holat',
    cell: ({ row }) => {
      const status = row.getValue<'PENDING' | 'APPROVED' | 'REJECTED'>('status');
      const commentId = row.original.id;
      
      return (
        <select
          value={status}
          onChange={(e) => onStatusChange(commentId, e.target.value as 'PENDING' | 'APPROVED' | 'REJECTED')}
          className={`px-3 py-1.5 rounded border text-sm font-medium cursor-pointer transition-colors ${
            status === 'APPROVED'
              ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200'
              : status === 'REJECTED'
              ? 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200'
              : 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200'
          }`}
        >
          <option value="PENDING">Kutilmoqda</option>
          <option value="APPROVED">Tasdiqlangan</option>
          <option value="REJECTED">Rad etilgan</option>
        </select>
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
];