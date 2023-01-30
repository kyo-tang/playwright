import { test, expect } from "@playwright/test";
import TodoPage from "./pages/todo-page";

test("Given a user with complete item, When user clears complete item, Then item is moved to completed list And removed from todo list", async ({
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
  await expect(page.locator(".view label")).toHaveText([
    todoPage.todoItems[0],
    todoPage.todoItems[1],
  ]);

  // marking the first item as complete, the count goes down from 2 to 1
  const firstItem = page.locator(".todo-list li").nth(0);
  await expect(page.locator(".todo-count")).toHaveText("2 items left");
  await firstItem.locator(".toggle").check();
  await expect(page.locator(".todo-count")).toHaveText("1 item left");

  // navigate to complete list, check the initial count, then clear then check the count equal 0
  await page.locator(".filters").getByText("Completed").click();
  await expect(page.locator(".todo-list li")).toHaveCount(1);
  await expect(page.locator(".todo-list li")).toHaveText(todoPage.todoItems[0]);
  await page.locator(".clear-completed").click();
  await expect(page.locator(".todo-list li")).toHaveCount(0);
});
