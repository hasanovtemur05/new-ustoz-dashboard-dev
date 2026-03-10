import { X, Calendar, User } from 'lucide-react';
import { baseMediaUrl } from 'services/api';

interface Reply {
  id: string;
  content: string;
  createdAt: string;
  user: {
    firstname: string;
    lastname: string;
    photoUrl?: string;
  };
  likesCount?: number;
}

interface RepliesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteClick: (replyId: string) => void;
  replies: Reply[];
  commentAuthor: {
    firstname: string;
    lastname: string;
  };
}

const RepliesModal: React.FC<RepliesModalProps> = ({
  isOpen,
  onClose,
  onDeleteClick,
  replies,
  commentAuthor,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h2 className="font-semibold">
            {commentAuthor.firstname} {commentAuthor.lastname} izohiga javoblar
          </h2>
          <button onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 py-4 space-y-4 text-sm max-h-[70vh] overflow-y-auto">
          {replies && replies.length > 0 ? (
            replies.map((reply) => {
              const avatarUrl = reply.user.photoUrl
                ? `${baseMediaUrl}/${reply.user.photoUrl}`
                : null;

              return (
                <div key={reply.id} className="border rounded p-3 space-y-3">
                  {/* USER */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={`${reply.user.firstname} ${reply.user.lastname}`}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/avatar-placeholder.png';
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                      )}

                      <div>
                        <p className="font-medium">
                          {reply.user.firstname} {reply.user.lastname}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(reply.createdAt).toLocaleDateString('uz-UZ')}
                        </div>
                      </div>
                    </div>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => onDeleteClick(reply.id)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      O'chirish
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="bg-gray-50 border rounded p-3">
                    {reply.content}
                  </div>

                  {/* LIKES */}
                  {reply.likesCount !== undefined && reply.likesCount > 0 && (
                    <div className="text-xs text-gray-500">
                      ❤️ {reply.likesCount} ta like
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Hali javoblar yo'q</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepliesModal;