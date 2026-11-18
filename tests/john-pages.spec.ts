
import { test, expect } from './auth-utils';

test.slow();

test('a regular user can sign in', async ({ getUserPage }) => {
  const customUserPage = await getUserPage('john@foo.com', 'changeme');
  await customUserPage.goto('http://localhost:3000/');

  const navigation = customUserPage.getByRole('navigation', {
    name: 'Main navigation',
  });

  await expect(
    customUserPage.getByRole('button', { name: 'john@foo.com' })
  ).toBeVisible({ timeout: 10000 });

  await expect(
    customUserPage.getByRole('link', { name: 'Manoa Carpool home' })
  ).toBeVisible({ timeout: 5000 });

  await expect(
    navigation.getByRole('link', { name: 'Offer a Ride' })
  ).toBeVisible({ timeout: 5000 });

  await expect(
    navigation.getByRole('link', { name: 'Find a Ride' })
  ).toBeVisible({ timeout: 5000 });

  await navigation.getByRole('link', { name: 'Offer a Ride' }).click();

  await expect(
    customUserPage.getByRole('heading', {
      name: 'Drive',
      exact: true,
    })
  ).toBeVisible({ timeout: 5000 });

  await navigation.getByRole('link', { name: 'Find a Ride' }).click();

  await expect(
    customUserPage.getByRole('heading', {
      name: 'Available Rides',
      exact: true,
    })
  ).toBeVisible({ timeout: 5000 });
});
