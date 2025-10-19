import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
import CreateBlog from './CreateBlog'
import blogService from '../services/blogs'

// Mock the blogService.create method
vi.mock('../services/blogs', () => ({
  default: {
    create: vi.fn()
  }
}))

describe('CreateBlog component', () => {
  it('calls blogService.create with correct parameters when Create is clicked', async () => {
    const mockSetBlogs = vi.fn()
    const mockShowAlert = vi.fn()
    const mockCreate = blogService.create

    // Mock the resolved value of create
    mockCreate.mockResolvedValue({
      title: 'Snoopy Come Home',
      author: 'Charles Schulz',
      url: 'www.yahoo.com',
      id: '123'
    })

    render(<CreateBlog blogs={[]} setBlogs={mockSetBlogs} showAlert={mockShowAlert} />)

    const user = userEvent.setup()

    // Show the form
    const showButton = screen.getByRole('button', { name: /create new blog/i })
    await user.click(showButton)

    // Fill out the form
    await user.type(screen.getByLabelText(/title/i), 'Snoopy Come Home')
    await user.type(screen.getByLabelText(/author/i), 'Charles Schulz')
    await user.type(screen.getByLabelText(/url/i), 'www.yahoo.com')

    // Submit the form
    const createButton = screen.getByRole('button', { name: /create/i })
    await user.click(createButton)

    // Assert blogService.create was called with correct data
    expect(mockCreate).toHaveBeenCalledTimes(1)
    expect(mockCreate).toHaveBeenCalledWith({
      title: 'Snoopy Come Home',
      author: 'Charles Schulz',
      url: 'www.yahoo.com'
    })
  })
})