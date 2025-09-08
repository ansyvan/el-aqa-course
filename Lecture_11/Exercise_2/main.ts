import { Post } from './types.js'
import { fetchPosts, fetchSeveralPosts } from './api.js'
import { Loggable } from './decorators.js'
import { updateObjectInArray } from './updateObjectInArray.js'

class PostService {
  @Loggable()
  logAllPosts (posts: Post[]) {
    return `Logged ${posts.length} posts.`
  }
}

async function runPart1Demo () {
  const postLogger = new PostService()
  const allPosts = await fetchPosts()
  postLogger.logAllPosts(allPosts)
}

async function runPart2Demo () {
  const firstThreePosts = await fetchSeveralPosts(0, 3)
  const updatedPosts = updateObjectInArray(
    firstThreePosts,
    2,
    { title: 'Updated title', body: 'Updated body' }
  )
  console.log('\n--- Original Array (Unchanged) ---')
  console.log(firstThreePosts)
  console.log('\n--- Updated Array ---')
  console.log(updatedPosts)
}

runPart1Demo()
runPart2Demo()
