const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/users', {
            data: {
                name: 'Paul Blankenship',
                username: 'PaulB',
                password: 'byte'
            }
        })
        await request.post('', {
            data: {
                name: 'Paul Blankenship',
                username: 'PaulC',
                password: 'byte'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        //logout if needed so test starts with needing login
        const logoutButton = page.getByRole('button', { name: 'Logout' });
        if (await logoutButton.count() > 0) {
            console.log('started logged in')
            await logoutButton.click();
        } else {
            console.log('did not need to logout')
        }
    })

    describe('Login', () => {
        test('Login succeeds with correct credentials', async ({ page }) => {
            //login.
            const locator = page.getByText('Login')
            await expect(locator).toBeVisible()

            await page.getByLabel('username').fill('PaulB')
            await page.getByLabel('password').fill('byte')
            await page.getByRole('button', { name: 'Login' }).click()

            await expect(
                page.getByText(
                    'Blogs'
                )
            ).toBeVisible()
        })
        test('Login fails with incorrect credentials', async ({ page }) => {
            //login.
            const locator = page.getByText('Login')
            await expect(locator).toBeVisible()

            await page.getByLabel('username').fill('PaulJ')
            await page.getByLabel('password').fill('byte')
            await page.getByRole('button', { name: 'Login' }).click()

            await expect(
                page.getByText(
                    'Login'
                )
            ).toBeVisible()
        })
    })
    describe('When Logged In', () => {
        test('A new blog can be created', async ({ page }) => {
            //login.
            const locator = page.getByText('Login')
            await expect(locator).toBeVisible()

            await page.getByLabel('username').fill('PaulB')
            await page.getByLabel('password').fill('byte')
            await page.getByRole('button', { name: 'Login' }).click()

            //open new blog form
            await page.getByRole('button', { name: 'Create New Blog' }).click()

            //fill in new blog and create
            await page.getByLabel('Title:').fill('DeleteMe')
            await page.getByLabel('Author:').fill('DeleteAuthor')
            await page.getByLabel('URL:').fill('www.deleteme.com')
            await page.getByRole('button', { name: 'Create' }).click({ timeout: 10000 })
            await expect(
                page.getByText(
                    'A new blog DeleteMe by DeleteAuthor added'
                )
            ).toBeVisible()
        })
    })
    describe('When Logged In', () => {
        test('A blog can be liked', async ({ page }) => {
            //login.
            const locator = page.getByText('Login')
            await expect(locator).toBeVisible()

            await page.getByLabel('username').fill('PaulB')
            await page.getByLabel('password').fill('byte')
            await page.getByRole('button', { name: 'Login' }).click()

            //open blog to view the like button
            await page.getByRole('button', { name: 'show' }).first().click()

            // Locate the likes container (adjust selector if needed)
            const likesLocator = page.locator('text=Likes'); // or use a CSS selector like page.locator('.likes-count')

            // Extract the initial number from the full text
            const rawText = await likesLocator.textContent();
            const initialCount = parseInt(rawText?.match(/\d+/)?.[0] || '0', 10);

            // Click the Like button 
            await page.getByRole('button', { name: /^Like$/ }).click();

            // Click the like button
            await page.getByRole('button', { name: 'Like' }).click();

            // Wait for the count to update
            const expectedCount = initialCount + 1;
            await expect(likesLocator).toHaveText(new RegExp(`Likes\\s+${expectedCount}`));
        });
    })
    describe('When Logged In', () => {
        test('Only owner can see remove button', async ({ page }) => {
            //login.
            const locator = page.getByText('Login')
            await expect(locator).toBeVisible()

            await page.getByLabel('username').fill('PaulC')
            await page.getByLabel('password').fill('byte')
            await page.getByRole('button', { name: 'Login' }).click()

            //open blog to view the remove button
            await page.getByRole('button', { name: 'show' }).last().click()

            // Count all Show and Hide buttons before removal
            const initialButtons = await page.locator('button:has-text("Show"), button:has-text("Hide")').count();

            // wait for the confirm dialog and accept it
            page.once('dialog', async dialog => {
                expect(dialog.type()).toBe('confirm');
                //expect(dialog.message()).toMatch(/Delete undefined?/i);
                await dialog.accept(); // dialog.dismiss() to cancel
            });

            await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(0, { timeout: 1000 });
            //if (removeButton) {
            //    // Button exists, test fails
            //    throw new Error('Remove button should not exist, but it was found.');
            //} else {
            //    // Button does not exist — test passes
            //    expect(removeButton).toBeNull();
            //}            
        });
    })
    describe('When Logged In', () => {
        test('A blog can be removed by owner', async ({ page }) => {
            await page.reload();
            //login.
            const locator = page.getByText('Login')
            await expect(locator).toBeVisible()

            await page.getByLabel('username').fill('PaulB')
            await page.getByLabel('password').fill('byte')
            await page.getByRole('button', { name: 'Login' }).click()

            //open blog to view the remove button
            await page.getByRole('button', { name: 'show' }).last().click()

            // Count all Show and Hide buttons before removal
            const initialButtons = await page.locator('button:has-text("Show"), button:has-text("Hide")').count();

            // wait for the confirm dialog and accept it
            page.once('dialog', async dialog => {
                expect(dialog.type()).toBe('confirm');
                //expect(dialog.message()).toMatch(/Delete undefined?/i);
                await dialog.accept(); // dialog.dismiss() to cancel
            });

            // Click the remove button
            await page.getByRole('button', { name: 'Remove' }).last().click();

            await expect.poll(async () => {
                return await page.locator('button:has-text("Show"), button:has-text("Hide")').count();
            }).toBe(initialButtons - 1);

            // Count Show and Hide buttons after removal
            const updatedButtons = await page.locator('button:has-text("Show"), button:has-text("Hide")').count();

            // Assert that the count decreased by one
            expect(updatedButtons).toBe(initialButtons - 1);
        });
    })
})