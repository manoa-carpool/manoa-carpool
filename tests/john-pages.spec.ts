import { test, expect } from './auth-utils';

test.slow();
test('a regular user can sign in', async ({ getUserPage }) => {
  const customUserPage = await getUserPage('john@foo.com', 'changeme');
  await customUserPage.goto('http://localhost:3000/');

  await expect(
    customUserPage.getByRole('button', { name: 'john@foo.com' })
  ).toBeVisible({ timeout: 10000 });
  await expect(
    customUserPage.getByRole('link', { name: 'Manoa Carpool home' })
  ).toBeVisible({ timeout: 5000 });
  // look inside the navbar only: the landing page also has a "Find a Ride" link
  const navigation = customUserPage.getByRole('navigation', { name: 'Main navigation' });
  await expect(navigation.getByRole('link', { name: 'Offer a Ride' })).toBeVisible({ timeout: 5000 });
  await expect(navigation.getByRole('link', { name: 'Find a Ride' })).toBeVisible({ timeout: 5000 });

  await navigation.getByRole('link', { name: 'Offer a Ride' }).click();
  await expect(
    customUserPage.getByRole('heading', { name: 'Drive', exact: true })
  ).toBeVisible({ timeout: 5000 });

  await navigation.getByRole('link', { name: 'Find a Ride' }).click();
  await expect(
    customUserPage.getByRole('heading', { name: 'Available Rides', exact: true })
  ).toBeVisible({ timeout: 5000 });
});

test('the leaderboard page shows a podium, re-sorts, and highlights the signed-in user', async ({ getUserPage }) => {
  const customUserPage = await getUserPage('john@foo.com', 'changeme');
  await customUserPage.goto('http://localhost:3000/leaderboard');

  await expect(
    customUserPage.getByRole('heading', { name: 'Leaderboard', exact: true })
  ).toBeVisible({ timeout: 10000 });
  await customUserPage.getByRole('button', { name: 'Skip animation' }).click();
  await expect(customUserPage.getByRole('button', { name: 'Skip animation' })).toBeHidden();
  // John is third on points, so he is on the podium with the You badge
  await expect(customUserPage.getByTestId('podium')).toContainText('John Doe');
  await expect(customUserPage.getByTestId('podium')).toContainText('You');

  // all time sorted by miles: Devin P. is on the podium and John moves to the list
  await customUserPage.getByLabel('Period').selectOption('all-time');
  await customUserPage.getByRole('button', { name: 'Miles' }).click();
  await expect(customUserPage.getByRole('heading', { name: 'Top by miles' })).toBeVisible();
  await expect(customUserPage.getByTestId('podium')).toContainText('Devin P.');
  await expect(customUserPage.getByRole('button', { name: 'Miles' })).toHaveAttribute('aria-pressed', 'true');
  await expect(customUserPage.getByRole('listitem').filter({ hasText: 'Rank 1' })).toContainText('Robert K.');
  await expect(customUserPage.getByTestId('leaderboard-you')).toContainText('John Doe');
});
