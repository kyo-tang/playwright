import { test, expect } from "@playwright/test";
import TodoPage from "./pages/todo-page";

test("Given a user has marked a todo complte, When user views active list Then only active items are shown", async ({
  page,
}) => {
  const todoList = ["Todo-1", "Todo-2"];
  const todoPage = new TodoPage(page, todoList);
  const webURL = "https://todomvc.com/examples/react/#/";
  // checking that url is correctly loaded
  await page.goto(webURL);
  await expect(page).toHaveURL(webURL);
  expect(page.isVisible(".new-todo"));
  // Expect a title "to contain" a substring.

  // create the first to-do then check if it has the item
  await page.locator(".new-todo").fill(todoPage.todoItems[0]);
  await page.locator(".new-todo").press("Enter");
  // check that the todo list
  await expect(page.locator(".view label")).toHaveCount(1);
  await expect(page.locator(".view label")).toHaveText(todoPage.todoItems[0]);

  // create the second to-do then check if it has the item
  await page.locator(".new-todo").fill(todoPage.todoItems[1]);
  await page.locator(".new-todo").press("Enter");

  // the view label structure has the two items
  await expect(page.locator(".todo-list li")).toHaveCount(2);
  await expect(page.locator(".view label")).toHaveText([
    todoPage.todoItems[0],
    todoPage.todoItems[1],
  ]);

  // marking the first item as complete
  const firstItem = page.locator(".todo-list li").nth(0);
  await firstItem.locator(".toggle").check();

  // navigate to Active list
  await page.locator(".filters").getByText("Active").click();
  await expect(page.locator(".todo-list li")).toHaveCount(1);
  await expect(page.locator(".todo-list li")).toHaveText(todoPage.todoItems[1]);
});
