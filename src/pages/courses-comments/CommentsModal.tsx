



import React, { useEffect, useState } from 'react'
import { X, Star, Calendar, User } from 'lucide-react'
import { baseMediaUrl } from 'services/api'

type StatusType = 'PENDING' | 'APPROVED' | 'REJECTED'

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  comment: {
    id: string
    content: string
    value: number
    status: StatusType
    user: {
      firstname: string
      lastname: string
      photoUrl?: string
    }
    createdAt?: string
  } | null
  onStatusChange: (id: string, status: StatusType) => void
}

const statusLabel: Record<StatusType, string> = {
  PENDING: 'Kutilmoqda',
  APPROVED: 'Tasdiqlangan',
  REJECTED: 'Rad etilgan',
}

const statusStyle: Record<StatusType, string> = {
  PENDING: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  APPROVED: 'text-green-700 bg-green-50 border-green-200',
  REJECTED: 'text-red-700 bg-red-50 border-red-200',
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  comment,
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] =
    useState<StatusType>('PENDING')

  useEffect(() => {
    if (comment) {
      setSelectedStatus(comment.status)
    }
  }, [comment?.status]) 

  if (!isOpen || !comment) return null

  const avatarUrl = comment.user.photoUrl
    ? `${baseMediaUrl}/${comment.user.photoUrl}`
    : null

  const changeStatus = (status: StatusType) => {
    setSelectedStatus(status)        // UI darhol o‘zgaradi
    onStatusChange(comment.id, status) // parent update
  }

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

            {/* STATUS BADGE */}
            <span
              className={`ml-auto px-2 py-0.5 rounded border text-xs font-medium ${statusStyle[selectedStatus]}`}
            >
              {statusLabel[selectedStatus]}
            </span>
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

          {/* COMMENT */}
          <div className="bg-gray-50 border rounded p-3">
            {comment.content}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2">
            {(Object.keys(statusLabel) as StatusType[]).map((s) => (
              <button
                key={s}
                onClick={() => changeStatus(s)}
                className={`px-3 py-1.5 border rounded text-xs ${
                  selectedStatus === s
                    ? 'bg-black text-white'
                    : 'bg-white'
                }`}
              >
                {statusLabel[s]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentModal


