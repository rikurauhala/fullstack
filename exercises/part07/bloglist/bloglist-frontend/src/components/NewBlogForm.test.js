import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('New blog form calls the event handler with correct details', () => {
  let mockHandler

  const title = 'Blog title'
  const author = 'Blogger'
  const url = 'www.example.com'

  beforeEach(async () => {
    mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<NewBlogForm createBlog={mockHandler} />)

    const titleInput = screen.getByPlaceholderText('Title')
    await user.type(titleInput, title)

    const authorInput = screen.getByPlaceholderText('Author')
    await user.type(authorInput, author)

    const urlInput = screen.getByPlaceholderText('URL')
    await user.type(urlInput, url)

    const createButton = screen.getByText('Create')
    await user.click(createButton)
  })

  test('Only one call is made to the handler', () => {
    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('Title is correct', () => {
    expect(mockHandler.mock.calls[0][0].title).toBe(title)
  })

  test('Author is correct', () => {
    expect(mockHandler.mock.calls[0][0].author).toBe(author)
  })

  test('Url is correct', () => {
    expect(mockHandler.mock.calls[0][0].url).toBe(url)
  })
})
