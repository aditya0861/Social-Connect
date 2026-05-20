import { useState, useRef, useEffect } from 'react'

const REACTIONS = [
  { key: 'like',  emoji: '👍', label: 'Like',  color: '#3b82f6' },
  { key: 'love',  emoji: '❤️', label: 'Love',  color: '#e0245e' },
  { key: 'haha',  emoji: '😂', label: 'Haha',  color: '#f7b125' },
  { key: 'wow',   emoji: '😮', label: 'Wow',   color: '#f7b125' },
  { key: 'sad',   emoji: '😢', label: 'Sad',   color: '#f7b125' },
  { key: 'angry', emoji: '😡', label: 'Angry', color: '#e9710f' },
]

const VISIBILITY_ICONS = { public: '🌐', friends: '👥', private: '🔒' }

function totalReactions(reactions) {
  return Object.values(reactions).reduce((a, b) => a + b, 0)
}

function topReactionEmojis(reactions) {
  return Object.entries(reactions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => REACTIONS.find(r => r.key === key)?.emoji)
    .filter(Boolean)
}

function CommentItem({ comment, user, onReply, depth = 0 }) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState('')

  function submitReply(e) {
    e.preventDefault()
    if (!replyText.trim()) return
    onReply(comment.id, replyText.trim())
    setReplyText('')
    setShowReplyInput(false)
  }

  return (
    <div className={`comment ${depth > 0 ? 'comment-reply' : ''}`}>
      <div className="avatar xs" style={{ background: comment.avatarColor }}>{comment.avatar}</div>
      <div style={{ flex: 1 }}>
        <div className="comment-bubble">
          <div className="comment-author">{comment.author}</div>
          <div className="comment-text">{comment.text}</div>
        </div>
        <div className="comment-footer">
          <span>{comment.time}</span>
          {depth === 0 && (
            <span onClick={() => setShowReplyInput(v => !v)}>Reply</span>
          )}
        </div>

        {/* Nested replies */}
        {comment.replies?.map(r => (
          <CommentItem key={r.id} comment={r} user={user} onReply={() => {}} depth={1} />
        ))}

        {showReplyInput && (
          <form className="comment-input-row" onSubmit={submitReply} style={{ marginTop: 6 }}>
            <div className="avatar xs">{user?.name?.[0]?.toUpperCase()}</div>
            <div className="comment-input-wrap">
              <input
                type="text"
                placeholder={`Reply to ${comment.author}...`}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                autoFocus
              />
              <button type="submit" className="comment-send" disabled={!replyText.trim()}>➤</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function Post({ post, onReaction, onComment, onReply, onEditPost, onDeletePost, user }) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showReactions, setShowReactions] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(post.content)
  const typingTimer = useRef(null)
  const reactionTimer = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleCommentChange(e) {
    setCommentText(e.target.value)
    setIsTyping(true)
    clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => setIsTyping(false), 1500)
  }

  function submitComment(e) {
    e.preventDefault()
    if (!commentText.trim()) return
    onComment(post.id, commentText.trim())
    setCommentText('')
    setIsTyping(false)
    setShowComments(true)
  }

  function handleReactionHover() {
    clearTimeout(reactionTimer.current)
    setShowReactions(true)
  }

  function handleReactionLeave() {
    reactionTimer.current = setTimeout(() => setShowReactions(false), 300)
  }

  function pickReaction(key) {
    onReaction(post.id, key)
    setShowReactions(false)
  }

  function saveEdit() {
    if (editText.trim()) onEditPost(post.id, editText.trim())
    setEditing(false)
  }

  const userReaction = REACTIONS.find(r => r.key === post.userReaction)
  const total = totalReactions(post.reactions)
  const topEmojis = topReactionEmojis(post.reactions)
  const isLong = post.content.length < 130
  const totalComments = post.comments.reduce((a, c) => a + 1 + (c.replies?.length || 0), 0)

  return (
    <div className="post">
      <div className="post-header">
        <div className="avatar" style={{ background: post.avatarColor }}>{post.avatar}</div>
        <div className="post-meta">
          <span className="post-author">{post.author}</span>
          <span className="post-time">
            {post.time}{post.edited && <span className="edited-tag"> · Edited</span>} · {VISIBILITY_ICONS[post.visibility] || '🌐'}
          </span>
        </div>
        {post.isOwn ? (
          <div style={{ position: 'relative' }} ref={menuRef}>
            <button className="post-more" onClick={() => setShowMenu(v => !v)}>···</button>
            {showMenu && (
              <div className="post-menu">
                <div className="post-menu-item" onClick={() => { setEditing(true); setEditText(post.content); setShowMenu(false) }}>
                  ✏️ Edit post
                </div>
                <div className="post-menu-item danger" onClick={() => onDeletePost(post.id)}>
                  🗑️ Delete post
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="post-more">···</button>
        )}
      </div>

      {editing ? (
        <div className="post-edit-area">
          <textarea className="post-edit-input" value={editText} onChange={e => setEditText(e.target.value)} autoFocus rows={4} />
          <div className="post-edit-actions">
            <button className="edit-cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
            <button className="edit-save-btn" onClick={saveEdit} disabled={!editText.trim()}>Save</button>
          </div>
        </div>
      ) : (
        <div className={`post-content ${isLong ? 'large' : ''}`}>{post.content}</div>
      )}

      {(total > 0 || totalComments > 0) && (
        <div className="post-stats">
          <div className="post-stats-left">
            {total > 0 && (
              <>
                <div className="reaction-icons">{topEmojis.map((e, i) => <span key={i}>{e}</span>)}</div>
                <span>{total}</span>
              </>
            )}
          </div>
          <div className="post-stats-right">
            {totalComments > 0 && (
              <span onClick={() => setShowComments(v => !v)}>
                {totalComments} comment{totalComments !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="post-actions">
        <div className="reaction-wrapper" onMouseEnter={handleReactionHover} onMouseLeave={handleReactionLeave}>
          <button
            className={`action-btn ${post.userReaction ? 'reacted' : ''}`}
            style={userReaction ? { color: userReaction.color } : {}}
            onClick={() => pickReaction('like')}
          >
            <span className="action-icon">{userReaction ? userReaction.emoji : '👍'}</span>
            {userReaction ? userReaction.label : 'Like'}
          </button>
          {showReactions && (
            <div className="reaction-picker" onMouseEnter={handleReactionHover} onMouseLeave={handleReactionLeave}>
              {REACTIONS.map(r => (
                <button
                  key={r.key}
                  className={`reaction-option ${post.userReaction === r.key ? 'selected' : ''}`}
                  title={r.label}
                  onClick={() => pickReaction(r.key)}
                >
                  {r.emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="action-btn" onClick={() => setShowComments(v => !v)}>
          <span className="action-icon">💬</span>
          Comment
        </button>
        <button className="action-btn">
          <span className="action-icon">↗️</span>
          Share
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          {post.comments.map(c => (
            <CommentItem
              key={c.id}
              comment={c}
              user={user}
              onReply={(commentId, text) => onReply(post.id, commentId, text)}
            />
          ))}

          {isTyping && (
            <div className="typing-indicator">
              <div className="avatar xs">{user?.name?.[0]?.toUpperCase()}</div>
              <div className="typing-bubble"><span /><span /><span /></div>
            </div>
          )}

          <form className="comment-input-row" onSubmit={submitComment}>
            <div className="avatar xs">{user?.name?.[0]?.toUpperCase()}</div>
            <div className="comment-input-wrap">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={handleCommentChange}
              />
              <button type="submit" className="comment-send" disabled={!commentText.trim()}>➤</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
