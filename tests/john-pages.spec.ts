import { test, expect } from './auth-utils';

test.slow();
test('a regular user can sign in', async ({ getUserPage }) => {
  // Call the getUserPage fixture with users signin info to get authenticated session for user
  const customUserPage = await getUserPage('john@foo.com', 'changeme');

  // Navigate to the home page and wait for post-login indicator
  await customUserPage.goto('http://localhost:3000/');
  await expect(
    customUserPage.getByRole('button', { name: 'john@foo.com' })
  ).toBeVisible({ timeout: 10000 });
  await expect(
    customUserPage.getByRole('link', { name: 'Manoa Carpool' })
  ).toBeVisible({ timeout: 5000 });
});
