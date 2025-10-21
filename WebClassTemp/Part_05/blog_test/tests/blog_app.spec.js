const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
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
})