import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { expect } from 'vitest';

describe('<Blog />', () => {
  beforeEach(() => {
    const blog = {
      title: 'Foo Bar',
      author: 'root',
      url: 'http://testblog.com',
      likes: 5,
      user: {
        username: 'root',
        name: 'Superuser'
      },
      id: '12345'
    };

    render(
      <Blog
        blog={blog}
      />
    );
  });

  test('renders title and author, but not url, likes or user by default', () => {
    expect(screen.getByText('Foo Bar root')).toBeDefined();
    expect(screen.queryByText('http://testblog.com')).toBeNull();
    expect(screen.queryByText('likes 5')).toBeNull();
    expect(screen.queryByText('Superuser')).toBeNull();
  });

  test('renders url, likes and user when view button is clicked', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    expect(screen.getByText('http://testblog.com')).toBeDefined();
    expect(screen.getByText('likes 5')).toBeDefined();
    expect(screen.getByText('Superuser')).toBeDefined();
  });
});