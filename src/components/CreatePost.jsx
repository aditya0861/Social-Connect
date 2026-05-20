import { useState } from 'react'

const VISIBILITY_OPTIONS = [
  { value: 'public', icon: '🌐', label: 'Public' },
  { value: 'friends', icon: '👥', label: 'Friends' },
  { value: 'private', icon: '🔒', label: 'Only me' },
]

export default function CreatePost({ onPost, user }) {
  const initial = user?.name?.[0]?.toUpperCase() || 'Y'
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [showVisibilityMenu, setShowVisibilityMenu] = useState(false)

  function handlePost() {
    if (!text.trim()) return
    onPost(text.trim(), visibility)
    setText('')
    setVisibility('public')
    setOpen(false)
  }

  const selectedVisibility = VISIBILITY_OPTIONS.find(v => v.value === visibility)

  return (
    <>
      <div className="create-post">
        <div className="create-post-top">
          <div className="avatar">{initial}</div>
          <div className="cp-input" onClick={() => setOpen(true)}>
            What's on your mind?
          </div>
        </div>
        <div className="create-post-divider" />
        <div className="create-post-actions">
          <button className="cp-action" onClick={() => setOpen(true)}>
            <span className="cp-icon">🎥</span> Live video
          </button>
          <button className="cp-action" onClick={() => setOpen(true)}>
            <span className="cp-icon">🖼️</span> Photo/video
          </button>
          <button className="cp-action" onClick={() => setOpen(true)}>
            <span className="cp-icon">😊</span> Feeling/activity
          </button>
        </div>
      </div>

      {open && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">Create post</span>
              <button className="modal-close" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-user">
                <div className="avatar">{initial}</div>
                <div>
                  <div className="modal-user-name">{user?.name || 'You'}</div>
                  <div style={{ position: 'relative' }}>
                    <button 
                      className="visibility-btn"
                      onClick={() => setShowVisibilityMenu(v => !v)}
                    >
                      <span>{selectedVisibility.icon}</span>
                      <span>{selectedVisibility.label}</span>
                      <span style={{ fontSize: 12 }}>▾</span>
                    </button>
                    {showVisibilityMenu && (
                      <div className="visibility-menu">
                        {VISIBILITY_OPTIONS.map(opt => (
                          <div 
                            key={opt.value}
                            className={`visibility-option ${visibility === opt.value ? 'active' : ''}`}
                            onClick={() => {
                              setVisibility(opt.value)
                              setShowVisibilityMenu(false)
                            }}
                          >
                            <span style={{ fontSize: 18 }}>{opt.icon}</span>
                            <span>{opt.label}</span>
                            {visibility === opt.value && <span style={{ marginLeft: 'auto', color: '#1877f2' }}>✓</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <textarea
                className="modal-textarea"
                placeholder="What's on your mind?"
                value={text}
                onChange={e => setText(e.target.value)}
                autoFocus
                rows={5}
              />
            </div>
            <div className="modal-footer">
              <button className="modal-post-btn" onClick={handlePost} disabled={!text.trim()}>
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
