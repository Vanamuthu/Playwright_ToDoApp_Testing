import { test, expect } from '@playwright/test';

test('test to-do app @sanity', async ({ page }) => {

    // Go to https://todomvc.com/examples/react/dist/  
    await page.goto('https://todomvc.com/examples/react/dist/');

    // Add 5 items to the list: "Buy Grocery", "Go for a Walk", "Rest", "Play", "Study"
    await page.getByTestId('text-input').click();
    await page.getByTestId('text-input').fill('Buy Grocery');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Go for a Walk');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Rest');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Play');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Study');
    await page.getByTestId('text-input').press('Enter');

    // Mark "Go for a Walk" and "Play" as completed.
    await page.getByRole('listitem').filter({ hasText: 'Go for a Walk' }).getByTestId('todo-item-toggle').check();
    await page.getByRole('listitem').filter({ hasText: 'Play' }).getByTestId('todo-item-toggle').check();

    // Delete "Go for a Walk" from the list.
    await page.getByRole('button', { name: '×' }).click();

    // Click on "Active", "Completed", "All" filters and verify the list items accordingly.
    await page.getByRole('link', { name: 'Active' }).click();
    await page.getByRole('link', { name: 'Completed' }).click();
    await page.getByRole('link', { name: 'All' }).click();
    await page.getByRole('button', { name: 'Clear completed' }).click();

    // Verify that only "Go for a Walk" and "Play" are removed from the list and the rest of the items are present.
    await expect(page.getByText('Buy Grocery')).toBeVisible();
    await expect(page.getByText('Rest')).toBeVisible();
    await expect(page.getByTestId('todo-list')).toContainText('Rest');

    // Verify that the count of items in the list is 4.
    // This assertion is to have a failed test case to verify the sanity of the test suite.
    await expect(page.locator('.todo-list li')).toHaveCount(4);
});