import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blogger',
    url: 'www.example.com'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Blog title')
  expect(element).toBeDefined()
})
