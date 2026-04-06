# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: todo.spec.js >> test to-do app @sanity
- Location: tests\todo.spec.js:3:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.todo-list li')
Expected: 4
Received: 3
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('.todo-list li')
    9 × locator resolved to 3 elements
      - unexpected value "3"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - complementary [ref=e2]:
    - generic [ref=e3]:
      - heading "React" [level=3] [ref=e4]
      - generic [ref=e5]:
        - heading "React" [level=5] [ref=e6]
        - link "Source" [ref=e7] [cursor=pointer]:
          - /url: https://github.com/tastejs/todomvc/tree/gh-pages/examples/react
        - heading "TypeScript + React" [level=5] [ref=e8]
        - link "Demo" [ref=e9] [cursor=pointer]:
          - /url: https://todomvc.com/examples/typescript-react
        - text: ","
        - link "Source" [ref=e10] [cursor=pointer]:
          - /url: https://github.com/tastejs/todomvc/tree/gh-pages/examples/typescript-react
    - separator [ref=e11]
    - blockquote [ref=e12]:
      - paragraph [ref=e13]: “ React is a JavaScript library for creating user interfaces. Its core principles are declarative code, efficiency, and flexibility. Simply specify what your component looks like and React will keep it up-to-date when the underlying data changes. ”
      - link "React" [ref=e15] [cursor=pointer]:
        - /url: http://facebook.github.io/react
    - separator [ref=e16]
    - heading "Official Resources" [level=4] [ref=e17]
    - list [ref=e18]:
      - listitem [ref=e19]:
        - link "Quick Start" [ref=e20] [cursor=pointer]:
          - /url: https://react.dev/learn
      - listitem [ref=e21]:
        - link "API Reference" [ref=e22] [cursor=pointer]:
          - /url: https://react.dev/reference/react
      - listitem [ref=e23]:
        - link "Philosophy" [ref=e24] [cursor=pointer]:
          - /url: https://petehuntsposts.quora.com/React-Under-the-Hood
      - listitem [ref=e25]:
        - link "React Community" [ref=e26] [cursor=pointer]:
          - /url: https://react.dev/community
    - heading "Community" [level=4] [ref=e27]
    - list [ref=e28]:
      - listitem [ref=e29]:
        - link "ReactJS on Stack Overflow" [ref=e30] [cursor=pointer]:
          - /url: https://stackoverflow.com/questions/tagged/reactjs
    - generic [ref=e31]:
      - separator [ref=e32]
      - emphasis [ref=e33]:
        - text: If you have other helpful links to share, or find any of the links above no longer work, please
        - link "let us know" [ref=e34] [cursor=pointer]:
          - /url: https://github.com/tastejs/todomvc/issues
        - text: .
  - generic [ref=e35]:
    - generic [ref=e36]:
      - heading "todos" [level=1] [ref=e37]
      - generic [ref=e38]:
        - textbox "New Todo Input" [ref=e39]:
          - /placeholder: What needs to be done?
        - generic [ref=e40]: New Todo Input
    - main [ref=e41]:
      - generic:
        - checkbox "❯ Toggle All Input" [ref=e42]
        - generic: ❯ Toggle All Input
      - list [ref=e43]:
        - listitem [ref=e44]:
          - generic [ref=e45]:
            - checkbox [ref=e46]
            - generic [ref=e47]: Buy Grocery
            - text: ×
        - listitem [ref=e48]:
          - generic [ref=e49]:
            - checkbox [ref=e50]
            - generic [ref=e51]: Rest
            - text: ×
        - listitem [ref=e52]:
          - generic [ref=e53]:
            - checkbox [ref=e54]
            - generic [ref=e55]: Study
            - text: ×
    - generic [ref=e56]:
      - generic [ref=e57]: 3 items left!
      - list [ref=e58]:
        - listitem [ref=e59]:
          - link "All" [ref=e60] [cursor=pointer]:
            - /url: "#/"
        - listitem [ref=e61]:
          - link "Active" [ref=e62] [cursor=pointer]:
            - /url: "#/active"
        - listitem [ref=e63]:
          - link "Completed" [ref=e64] [cursor=pointer]:
            - /url: "#/completed"
      - button "Clear completed" [disabled] [ref=e65] [cursor=pointer]
  - contentinfo [ref=e66]:
    - paragraph [ref=e67]: Double-click to edit a todo
    - paragraph [ref=e68]: Created by the TodoMVC Team
    - paragraph [ref=e69]:
      - text: Part of
      - link "TodoMVC" [ref=e70] [cursor=pointer]:
        - /url: http://todomvc.com
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('test to-do app @sanity', async ({ page }) => {
  4  | 
  5  |     // Go to https://todomvc.com/examples/react/dist/  
  6  |     await page.goto('https://todomvc.com/examples/react/dist/');
  7  | 
  8  |     // Add 5 items to the list: "Buy Grocery", "Go for a Walk", "Rest", "Play", "Study"
  9  |     await page.getByTestId('text-input').click();
  10 |     await page.getByTestId('text-input').fill('Buy Grocery');
  11 |     await page.getByTestId('text-input').press('Enter');
  12 |     await page.getByTestId('text-input').fill('Go for a Walk');
  13 |     await page.getByTestId('text-input').press('Enter');
  14 |     await page.getByTestId('text-input').fill('Rest');
  15 |     await page.getByTestId('text-input').press('Enter');
  16 |     await page.getByTestId('text-input').fill('Play');
  17 |     await page.getByTestId('text-input').press('Enter');
  18 |     await page.getByTestId('text-input').fill('Study');
  19 |     await page.getByTestId('text-input').press('Enter');
  20 | 
  21 |     // Mark "Go for a Walk" and "Play" as completed.
  22 |     await page.getByRole('listitem').filter({ hasText: 'Go for a Walk' }).getByTestId('todo-item-toggle').check();
  23 |     await page.getByRole('listitem').filter({ hasText: 'Play' }).getByTestId('todo-item-toggle').check();
  24 | 
  25 |     // Delete "Go for a Walk" from the list.
  26 |     await page.getByRole('button', { name: '×' }).click();
  27 | 
  28 |     // Click on "Active", "Completed", "All" filters and verify the list items accordingly.
  29 |     await page.getByRole('link', { name: 'Active' }).click();
  30 |     await page.getByRole('link', { name: 'Completed' }).click();
  31 |     await page.getByRole('link', { name: 'All' }).click();
  32 |     await page.getByRole('button', { name: 'Clear completed' }).click();
  33 | 
  34 |     // Verify that only "Go for a Walk" and "Play" are removed from the list and the rest of the items are present.
  35 |     await expect(page.getByText('Buy Grocery')).toBeVisible();
  36 |     await expect(page.getByText('Rest')).toBeVisible();
  37 |     await expect(page.getByTestId('todo-list')).toContainText('Rest');
  38 | 
  39 |     // Verify that the count of items in the list is 4.
  40 |     // This assertion is to have a failed test case to verify the sanity of the test suite.
> 41 |     await expect(page.locator('.todo-list li')).toHaveCount(4);
     |                                                 ^ Error: expect(locator).toHaveCount(expected) failed
  42 | });
```