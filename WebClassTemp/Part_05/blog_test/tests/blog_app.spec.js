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
            await page.getByRole('button', {name: 'Create New Blog'}).click()
            
            //fill in new blog and create
            await page.getByLabel('Title:').fill('Snoopy Come Home')
            await page.getByLabel('Author:').fill('Charles Schultz')
            await page.getByLabel('URL:').fill('www.myblog20.com')
            await page.getByRole('button', {name: 'Create'}).click({ timeout: 10000 })
            await expect(
                page.getByText(
                    'A new blog Snoopy Come Home by Charles Schultz added'
                )
            ).toBeVisible()
        })
    })
})