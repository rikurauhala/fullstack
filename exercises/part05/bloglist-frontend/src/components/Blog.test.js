import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

describe('Correct elements are rendered after clicking the View button', () => {
  beforeEach(async () => {
    render(<Blog blog={blog}/>)
    const button = screen.getByText('+ View')
    const user = userEvent.setup()
    await user.click(button)
  })

  test('Title is rendered', () => {
    screen.getByText(title)
  })

  test('Author is rendered', () => {
    screen.getByText(author)
  })

  test('Url is rendered', () => {
    screen.getByText(url)
  })

  test('Likes are rendered', () => {
    screen.getByText(`${likes} likes`)
  })
})
