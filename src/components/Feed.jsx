import Stories from './Stories'
import CreatePost from './CreatePost'
import Post from './Post'

export default function Feed({ posts, onPost, onReaction, onComment, onReply, onEditPost, onDeletePost, user }) {
  return (
    <main className="feed">
      <Stories />
      <CreatePost onPost={onPost} user={user} />
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          onReaction={onReaction}
          onComment={onComment}
          onReply={onReply}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
          user={user}
        />
      ))}
    </main>
  )
}
