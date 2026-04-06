# 🧪 Playwright ToDo App Testing

## 📌 Overview
This project demonstrates **end-to-end UI testing** using Playwright on the TodoMVC React application.

It covers real-world QA scenarios including:
- Adding items  
- Marking tasks as completed  
- Deleting tasks  
- Filtering (All / Active / Completed)  
- Assertions for UI state validation  

The goal of this project is to showcase **automation skills expected from a Junior QA / QA Engineer**, including locator strategies, test structuring, and handling dynamic UI behavior.

---

## 🛠️ Tech Stack
- Playwright  
- JavaScript (Node.js)  
- VS Code  
- TodoMVC React App  

---

## 📂 Project Structure
```
Playwright_ToDoApp_Testing/
│── tests/
│   └── todo.spec.js
│── playwright.config.js
│── package.json
│── README.md
```

---

## 🚀 How to Run Tests

### Install dependencies
```bash
npm install
```

### Run all tests
```bash
npx playwright test
```

### Run sanity tests
```bash
npx playwright test --grep "@sanity"
```

### Run in headed mode
```bash
npx playwright test --headed
```

---

## ✅ Test Scenario Covered
- Add multiple todo items  
- Mark specific items as completed  
- Delete a specific item  
- Use filters (Active / Completed / All)  
- Clear completed items  
- Validate remaining items  

---

## ⚠️ Real-World Challenge & Learning

### ❌ Problem Faced
While trying to delete a todo item, the test failed with:

```
locator.click: Test timeout of 30000ms exceeded.
waiting for getByRole('button', { name: '×' })
```

### 🔍 Root Cause
- The delete button (`×`) is **not always visible**  
- It appears only on **hover** (UI behavior)  
- Multiple delete buttons exist → **locator ambiguity**  
- Playwright waits for a visible element → **timeout**  

---

## 💡 Solution (Best Practice)

Instead of using a global locator:
```js
page.getByRole('button', { name: '×' })
```

Use a scoped + hover-based approach:
```js
const todoItem = page.getByRole('listitem').filter({ hasText: 'Go for a Walk' });

await todoItem.hover(); // reveal delete button
await todoItem.locator('button.destroy').click();
```

### ✅ Why this works
- Targets the **correct item**
- Handles **hover-dependent UI**
- Uses a **stable selector (`.destroy`)**
- Avoids flaky tests

---

## 📚 Key Learnings
- Avoid global locators when multiple elements exist  
- Always scope locators to a specific container  
- Handle dynamic UI (hover, animations, hidden elements)  
- Prefer stable selectors (`data-testid`, class names)  
- Write maintainable and readable test code  

---

## 🎯 Why This Project Matters
This project demonstrates:
- Real QA thinking (not just scripting)  
- Debugging skills  
- Understanding of DOM behavior  
- Writing reliable automation tests  

---

## 🤝 Contribution / Learning
If you're learning Playwright or QA automation:
- Try breaking the tests and fixing them  
- Add negative test cases  
- Convert this into Page Object Model (POM)  
