import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const title = 'Blog title'
const author = 'Blogger'
const url = 'www.example.com'
const likes = 99
const blog = {
  title: title,
  author: author,
  url: url,
  likes: likes
}

describe('Correct elements are rendered by default', () => {
  let container

  beforeEach(() => {
    container = render(<Blog blog={blog}/>).container
  })

  test('Title is rendered', () => {
    expect(container).toHaveTextContent(title)
  })

  test('Author is rendered', () => {
    expect(container).toHaveTextContent(author)
  })

  test('Url is not rendered', () => {
    expect(container).not.toHaveTextContent(url)
  })

  test('Likes are not rendered', () => {
    expect(container).not.toHaveTextContent(likes)
  })
})
