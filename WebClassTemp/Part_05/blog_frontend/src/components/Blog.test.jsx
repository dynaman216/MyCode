import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Snoopy Come Home',
    author: 'Charles Schulz',
    url: 'www.yahoo.com',
    likes: 5,
    userId: '68b352d8d48a9dd478ba053c'
  }

  render(<Blog blog={blog} />)

  screen.debug()

  const element = screen.getByText('Snoopy Come HomeCharles Schulz')
  expect(element).toBeDefined()
})

test('does not render url', () => {
  const blog = {
    title: 'Snoopy Come Home',
    author: 'Charles Schulz',
    url: 'www.yahoo.com',
    likes: 5,
    userId: '68b352d8d48a9dd478ba053c'
  }

  render(<Blog blog={blog} />)

  screen.debug()

  const element = screen.queryByText('www.yahoo.com')
  expect(element).toBeNull()
})

test('does not render likes', () => {
  const blog = {
    title: 'Snoopy Come Home',
    author: 'Charles Schulz',
    url: 'www.yahoo.com',
    likes: 5,
    userId: '68b352d8d48a9dd478ba053c'
  }

  render(<Blog blog={blog} />)

  screen.debug()

  const element = screen.queryByText('5')
  expect(element).toBeNull()
})

test('shows URL and likes after clicking the details button', async () => {

  const user = {
    username: 'PaulB',
    name: 'Paul Blankenship',
    id: '68b352d8d48a9dd478ba053c'
  }

  const blog = {
    title: 'Snoopy Come Home',
    author: 'Charles Schulz',
    url: 'www.yahoo.com',
    likes: 5,
    userId: '68b352d8d48a9dd478ba053c',
    user: {
      username: 'PaulB',
      name: 'Paul Blankenship',
      id: '68b352d8d48a9dd478ba053c'
    },
  }

  render(<Blog blog={blog} user={user} />)

  screen.debug

  const user2 = userEvent.setup()
  const button = screen.getByRole('button', { name: /show/i }) // assumes the button has text like "view"
  await user2.click(button)

  expect(screen.getByText('www.yahoo.com')).toBeDefined()

  const likesElement = screen.getByText((content, element) => {
    return element.tagName.toLowerCase() === 'p' && content.includes('Likes')
  })
  expect(likesElement).toBeDefined()

})
