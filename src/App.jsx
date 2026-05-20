import { useState, useEffect } from 'react'
import IconRail from './components/IconRail'
import SideNav from './components/SideNav'
import Feed from './components/Feed'
import RightPanel from './components/RightPanel'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage'
import NotificationPanel from './components/NotificationPanel'

const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Alice John',
    avatar: 'A',
    avatarColor: '#e17055',
    content: 'Just shipped a new feature! Feeling great about this one 🚀 The team worked really hard and it shows.',
    time: '2 hours ago',
    reactions: { like: 15, love: 5, wow: 3, haha: 1 },
    userReaction: null,
    comments: [
      { id: 101, author: 'Bob Smith', avatar: 'B', avatarColor: '#6c5ce7', text: "Congrats! That's awesome 🎉", time: '1 hour ago', replies: [] },
      { id: 102, author: 'Carol White', avatar: 'C', avatarColor: '#00b894', text: "Can't wait to try it out!", time: '45 min ago', replies: [] },
    ],
    visibility: 'public',
    isOwn: false,
  },
  {
    id: 2,
    author: 'kumar',
    avatar: 'B',
    avatarColor: '#6c5ce7',
    content: 'Beautiful day for a walk 🌤️ Sometimes stepping away from the screen is the best debugging tool. Highly recommend.',
    time: '4 hours ago',
    reactions: { like: 30, love: 12 },
    userReaction: null,
    comments: [],
    visibility: 'public',
    isOwn: false,
  },
  {
    id: 3,
    author: 'Carol White',
    avatar: 'C',
    avatarColor: '#00b894',
    content: "Just finished reading \"Clean Code\" for the third time. Every read reveals something new. What's your favorite dev book? 📚",
    time: 'Yesterday at 9:30 AM',
    reactions: { like: 50, love: 25, wow: 14 },
    userReaction: null,
    comments: [
      { id: 103, author: 'Alice Johnson', avatar: 'A', avatarColor: '#e17055', text: 'The Pragmatic Programmer is my go-to!', time: 'Yesterday', replies: [] },
    ],
    visibility: 'public',
    isOwn: false,
  },
]

let nextId = 200

function makeNotif(icon, text) {
  return { id: nextId++, icon, text, time: 'Just now', read: false }
}

export default function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [lightMode, setLightMode] = useState(false)
  const [user, setUser] = useState(null)
  const [activeNav, setActiveNav] = useState('home')
  const [notifications, setNotifications] = useState([
    { id: 1, icon: '👍', text: 'Alice liked your post', time: '5 min ago', read: false },
    { id: 2, icon: '💬', text: 'Bob commented on your post', time: '10 min ago', read: false },
    { id: 3, icon: '❤️', text: 'Carol reacted to your post', time: '1 hour ago', read: true },
  ])
  const [showNotifs, setShowNotifs] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('light-mode', lightMode)
  }, [lightMode])

  if (!user) return <LoginPage onLogin={setUser} />

  const unreadCount = notifications.filter(n => !n.read).length

  function addNotif(icon, text) {
    setNotifications(prev => [makeNotif(icon, text), ...prev])
  }

  function handlePost(content, visibility) {
    setPosts(prev => [{
      id: nextId++,
      author: user.name,
      avatar: user.name[0].toUpperCase(),
      avatarColor: '#3b82f6',
      content,
      time: 'Just now',
      reactions: {},
      userReaction: null,
      comments: [],
      visibility,
      isOwn: true,
    }, ...prev])
  }

  function handleReaction(postId, reaction) {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p
      const newReactions = { ...p.reactions }
      if (p.userReaction) {
        newReactions[p.userReaction] = Math.max(0, (newReactions[p.userReaction] || 0) - 1)
        if (newReactions[p.userReaction] === 0) delete newReactions[p.userReaction]
      }
      const newUserReaction = p.userReaction === reaction ? null : reaction
      if (newUserReaction) {
        newReactions[newUserReaction] = (newReactions[newUserReaction] || 0) + 1
        if (!p.isOwn) addNotif('👍', `You reacted to ${p.author}'s post`)
      }
      return { ...p, reactions: newReactions, userReaction: newUserReaction }
    }))
  }

  function handleComment(postId, text) {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p
      if (!p.isOwn) addNotif('💬', `You commented on ${p.author}'s post`)
      return {
        ...p,
        comments: [...p.comments, {
          id: nextId++,
          author: user.name,
          avatar: user.name[0].toUpperCase(),
          avatarColor: '#3b82f6',
          text,
          time: 'Just now',
          replies: [],
        }],
      }
    }))
  }

  function handleReply(postId, commentId, text) {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p
      return {
        ...p,
        comments: p.comments.map(c => {
          if (c.id !== commentId) return c
          addNotif('↩️', `You replied to ${c.author}'s comment`)
          return {
            ...c,
            replies: [...(c.replies || []), {
              id: nextId++,
              author: user.name,
              avatar: user.name[0].toUpperCase(),
              avatarColor: '#3b82f6',
              text,
              time: 'Just now',
            }],
          }
        }),
      }
    }))
  }

  function handleEditPost(postId, newContent) {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, content: newContent, edited: true } : p))
  }

  function handleDeletePost(postId) {
    setPosts(prev => prev.filter(p => p.id !== postId))
  }

  function handleUpdateUser(updatedUser) {
    setUser(updatedUser)
    addNotif('👤', 'Profile updated successfully')
  }

  return (
    <div className="app-shell">
      <IconRail
        user={user}
        lightMode={lightMode}
        onToggleLight={() => setLightMode(v => !v)}
        onLogout={() => setUser(null)}
        activeNav={activeNav}
        onNav={setActiveNav}
        unreadCount={unreadCount}
        onOpenNotifs={() => setShowNotifs(v => !v)}
        onOpenProfile={() => setShowProfile(true)}
      />
      <SideNav activeNav={activeNav} onNav={setActiveNav} />
      <Feed
        posts={posts}
        onPost={handlePost}
        onReaction={handleReaction}
        onComment={handleComment}
        onReply={handleReply}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
        user={user}
      />
      <RightPanel />

      {/* Notification panel */}
      {showNotifs && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setShowNotifs(false)}
          onClearAll={() => setNotifications([])}
          onMarkRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
        />
      )}

      {/* Profile modal */}
      {showProfile && (
        <ProfilePage
          user={user}
          posts={posts}
          onClose={() => setShowProfile(false)}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  )
}
