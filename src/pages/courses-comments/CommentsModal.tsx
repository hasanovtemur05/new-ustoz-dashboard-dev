
import { X, Star, Calendar, User } from 'lucide-react'
import { baseMediaUrl } from 'services/api'


interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  comment: {
    id: string
    content: string
    value: number
    user: {
      firstname: string
      lastname: string
      photoUrl?: string
    }
    createdAt?: string
  } | null
}


const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  comment,
}) => {

  if (!isOpen || !comment) return null

  const avatarUrl = comment.user.photoUrl
    ? `${baseMediaUrl}/${comment.user.photoUrl}`
    : null


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h2 className="font-semibold">Izoh tafsilotlari</h2>
          <button onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 py-4 space-y-4 text-sm">

          {/* USER */}
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${comment.user.firstname} ${comment.user.lastname}`}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/avatar-placeholder.png'
                }}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
            )}

            <div>
              <p className="font-medium">
                {comment.user.firstname} {comment.user.lastname}
              </p>
              {comment.createdAt && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {new Date(comment.createdAt).toLocaleDateString('uz-UZ')}
                </div>
              )}
            </div>
          </div>

           <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= comment.value
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">
              {comment.value}/5
            </span>
          </div>

          <div className="bg-gray-50 border rounded p-3">
            {comment.content}
          </div>

         
        </div>
      </div>
    </div>
  )
}

export default CommentModal


