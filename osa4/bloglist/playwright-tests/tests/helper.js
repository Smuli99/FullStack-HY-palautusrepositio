const loginWith = async (page, username, password) => {
  await page.getByLabel('username').fill(username);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const createBlog = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'create new blog' }).click();

  await page.getByLabel('title:').fill(title);
  await page.getByLabel('author:').fill(author);
  await page.getByLabel('url:').fill(url);
 
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByText(`${title} ${author}`).waitFor();
};

const likeSpecificBlog = async (page, blogName) => {
  const blog = page.getByText(blogName);
  await blog.getByRole('button', { name: 'view' }).click();
  await page.getByRole('button', { name: 'like' }).click();
  
  // parse integer from likes
  const content = await page.getByText('likes').textContent();
  const intLikes = parseIntFromLikes(content);

  // wait for like to be rendered
  await page.getByText(`likes ${intLikes + 1}`).waitFor();

  await blog.getByRole('button', { name: 'hide' }).click();
};

const parseIntFromLikes = (textContent) => {
  const match = textContent.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export { loginWith, createBlog, likeSpecificBlog, parseIntFromLikes };