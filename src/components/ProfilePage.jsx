import { useState } from 'react'

export default function ProfilePage({ user, posts, onClose, onUpdateUser }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio || '')

  const myPosts = posts.filter(p => p.isOwn)

  function saveProfile() {
    if (!name.trim()) return
    onUpdateUser({ ...user, name: name.trim(), bio: bio.trim() })
    setEditing(false)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal profile-modal">
        <div className="modal-header">
          <span className="modal-title">Profile</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="profile-body">
          {/* Avatar + info */}
          <div className="profile-top">
            <div className="profile-avatar">{user.name[0].toUpperCase()}</div>
            {editing ? (
              <div className="profile-edit-fields">
                <input
                  className="login-input"
                  style={{ marginBottom: 8 }}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  autoFocus
                />
                <textarea
                  className="post-edit-input"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Write a short bio..."
                  rows={3}
                />
                <div className="post-edit-actions">
                  <button className="edit-cancel-btn" onClick={() => { setEditing(false); setName(user.name); setBio(user.bio || '') }}>Cancel</button>
                  <button className="edit-save-btn" onClick={saveProfile} disabled={!name.trim()}>Save</button>
                </div>
              </div>
            ) : (
              <div className="profile-info">
                <div className="profile-name">{user.name}</div>
                <div className="profile-email">{user.email}</div>
                {user.bio && <div className="profile-bio">{user.bio}</div>}
                <button className="profile-edit-btn" onClick={() => setEditing(true)}>✏️ Edit profile</button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="profile-stats">
            <div className="profile-stat">
              <div className="profile-stat-num">{myPosts.length}</div>
              <div className="profile-stat-label">Posts</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-num">{myPosts.reduce((a, p) => a + Object.values(p.reactions).reduce((x, y) => x + y, 0), 0)}</div>
              <div className="profile-stat-label">Reactions</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-num">{myPosts.reduce((a, p) => a + p.comments.length, 0)}</div>
              <div className="profile-stat-label">Comments</div>
            </div>
          </div>

          {/* My posts */}
          <div className="profile-posts-title">Your Posts</div>
          {myPosts.length === 0 ? (
            <div className="profile-empty">No posts yet. Share something!</div>
          ) : (
            <div className="profile-posts">
              {myPosts.map(p => (
                <div className="profile-post-item" key={p.id}>
                  <div className="profile-post-content">{p.content}</div>
                  <div className="profile-post-meta">{p.time} · {p.visibility}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
