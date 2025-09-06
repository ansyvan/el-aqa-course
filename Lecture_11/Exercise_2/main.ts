import { Post } from "./types.js"
import { fetchPosts } from "./api.js"
import { Loggable } from "./decorators.js"

class PostService {
    @Loggable()
    logAllPosts(posts: Post[]) {
      return `Logged ${posts.length} posts.`
    }
  }

  fetchPosts().then(allPosts => {
    const postLogger = new PostService();
    postLogger.logAllPosts(allPosts);
  })