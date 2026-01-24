'use client';

import { useState } from 'react';
import Loader from 'components/Loader';
import { useCourseComments } from 'modules/course-comments/hooks/useCourseCommentsLists';
import { useEditCourseCommentsStatus } from 'modules/course-comments/hooks/editStatus'; 
import { useLocation } from 'react-router-dom';
import { CourseCommentsType } from 'modules/course-comments/types';
import { Pagination } from 'components/Pagination';
import { DataTable } from 'components/DataTable';
import { createCourseCommentsColumns } from './Column';
import CommentModal from './CommentsModal';

const CourseComments = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split('/');
  const courseId = parts[2];

  const [currentPage, setCurrentPage] = useState(1);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CourseCommentsType['data'][0] | null>(null);

  const { data, isLoading } = useCourseComments({ courseId, currentPage });
  const { updateStatus, isPending: isUpdating } = useEditCourseCommentsStatus();

  if (isLoading) return <Loader />;

  const comments = data?.data ?? [];
  const paginationInfo = data?.meta?.pagination;
  const pageSize = paginationInfo?.pageSize ?? 10;

  const handleCommentClick = (comment: CourseCommentsType['data'][0]) => {
    setSelectedComment(comment);
    setCommentModalOpen(true);
  };

  const handleStatusChange = (commentId: string, newStatus: 'PENDING' | 'APPROVED' | 'REJECTED') => {
    updateStatus({ 
      id: commentId, 
      status: { status: newStatus }
    });
  };

  const transformedComment = selectedComment ? {
    ...selectedComment,
    user: {
      ...selectedComment.user,
      photoUrl: selectedComment.user.photoUrl ?? undefined,
    },
  } : null;

  const columns = createCourseCommentsColumns({
    currentPage,
    pageSize,
    onCommentClick: handleCommentClick,
    onStatusChange: handleStatusChange,
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Kurs izohlari</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={comments}
          />

          {paginationInfo && (
            <Pagination
              className="justify-end mt-3"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              paginationInfo={paginationInfo}
            />
          )}
        </>
      )}

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setCommentModalOpen(false)}
        comment={transformedComment}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default CourseComments;