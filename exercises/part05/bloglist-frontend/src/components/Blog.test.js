import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('Correct elements are rendered by default', () => {
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

  const { container } = render(<Blog blog={blog}/>)

  expect(container).toHaveTextContent(title)
  expect(container).toHaveTextContent(author)
  expect(container).not.toHaveTextContent(url)
  expect(container).not.toHaveTextContent(likes)
})
