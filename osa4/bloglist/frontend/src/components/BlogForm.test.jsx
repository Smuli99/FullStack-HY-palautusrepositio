import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('calls handleNewBlog with correct details when a new blog is created', async () => {
    const mockHandler = vi.fn();
    render(<BlogForm handleNewBlog={mockHandler} />);
    const user = userEvent.setup();

    const titleInput = screen.getByLabelText('title:');
    await user.type(titleInput, 'Testing React forms');

    const authorInput = screen.getByLabelText('author:');
    await user.type(authorInput, 'admin');

    const urlInput = screen.getByLabelText('url:');
    await user.type(urlInput, 'http://example.com');

    const createButton = screen.getByText('create');
    await user.click(createButton);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith({
      title: 'Testing React forms',
      author: 'admin',
      url: 'http://example.com'
    });
  });
});