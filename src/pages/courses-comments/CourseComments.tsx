'use client';

import { useState, useEffect } from 'react';
import Loader from 'components/Loader';
import { DataTable } from 'components/DataTable';
import { Pagination } from 'components/Pagination';
import { AlertDialog } from 'components/AlertDialog';
import { Sheet } from 'components/Sheet';
import { useCourseComments } from 'modules/course-comments/hooks/useCourseCommentsLists';
import { useDeleteReplay } from 'modules/course-comments/hooks/useDelete'; 
import { useLocation } from 'react-router-dom';
import { createCourseCommentsColumns } from './Column';
import CommentModal from './CommentsModal';
import RepliesModal from './ReplyModal';
import ReplayForm from './ReplayForm';
import type { CourseComment } from 'modules/course-comments/types';

const CourseComments = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split('/');
  const courseId = parts[2];

  const [currentPage, setCurrentPage] = useState(1);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [isRepliesModalOpen, setRepliesModalOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isReplayOpen, setReplayOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CourseComment | null>(null);
  const [commentData, setCommentData] = useState<CourseComment | undefined>();
  const [selectedReplyId, setSelectedReplyId] = useState<string | null>(null);

  const { data, isLoading, paginationInfo } = useCourseComments({ 
    courseId, 
    currentPage 
  });

  const { triggerReplayDelete } = useDeleteReplay();

  const pageSize = paginationInfo?.pageSize ?? 10;

  useEffect(() => {
    if (selectedComment && data) {
      const updatedComment = data.find((c: CourseComment) => c.id === selectedComment.id);
      if (updatedComment) {
        setSelectedComment(updatedComment);
      }
    }
  }, [data]);

  const getRowData = (comment: CourseComment) => {
    setCommentData(comment);
  };

  const handleCommentClick = (comment: CourseComment) => {
    setSelectedComment(comment);
    setCommentModalOpen(true);
  };

  const handleRepliesClick = (comment: CourseComment) => {
    setSelectedComment(comment);
    setRepliesModalOpen(true);
  };

  const handleDeleteReplyClick = (replyId: string) => {
    setSelectedReplyId(replyId);
    setDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedReplyId) return;
    
    await triggerReplayDelete(selectedReplyId);
    setDialogOpen(false);
    setSelectedReplyId(null);
  };

  const transformedComment = selectedComment
    ? {
        ...selectedComment,
        user: {
          ...selectedComment.user,
          photoUrl: selectedComment.user.photoUrl ?? undefined,
        },
      }
    : null;

  const columns = createCourseCommentsColumns({
    currentPage,
    pageSize,
    onCommentClick: handleCommentClick,
    onRepliesClick: handleRepliesClick,
    getRowData,
    setDialogOpen,
    setReplayOpen,
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Kurs izohlari</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={data} />

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

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setCommentModalOpen(false)}
        comment={transformedComment}
      />

      {/* Replies Modal */}
      {selectedComment && (
        <RepliesModal
          isOpen={isRepliesModalOpen}
          onClose={() => setRepliesModalOpen(false)}
          onDeleteClick={handleDeleteReplyClick}
          replies={selectedComment.replies || []}
          commentAuthor={{
            firstname: selectedComment.user.firstname,
            lastname: selectedComment.user.lastname,
          }}
        />
      )}

      {/* Add Reply Sheet */}
      <Sheet 
        sheetTitle="Javob qo'shish" 
        isOpen={isReplayOpen} 
        setSheetOpen={setReplayOpen}
      >
        <ReplayForm 
          comment={commentData} 
          setReplayOpen={setReplayOpen} 
        />
      </Sheet>

      {/* Delete Reply Dialog */}
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqili siz javobni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={handleDeleteConfirm}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default CourseComments;