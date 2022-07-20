import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const id = action.payload.id
      const blogToLike = state.find(blog => blog.id === id)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : likedBlog
      )
    }
  }
})

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, blog)
    dispatch(updateBlog(likedBlog))
  }
}

export const { appendBlog, removeBlog, setBlogs, updateBlog } = blogSlice.actions

export default blogSlice.reducer
