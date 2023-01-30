import { test, expect } from "@playwright/test";
import TodoPage from "./pages/todo-page";

test("homepage has title and links to intro page", async ({ page }) => {
  const todoList = ["Todo-1", "modified"];
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
  // edit an existing todo item
  const toEditElement = await page.locator(".todo-list li").nth(0);
  await toEditElement.dblclick();
  await toEditElement.locator(".edit").fill(todoPage.todoItems[1]);
  await toEditElement.locator(".edit").press("Enter");

  // check if the item contains the value that's been modified

  await expect(page.locator(".view label")).toHaveCount(1);
  await expect(page.locator(".view label")).toHaveText(todoPage.todoItems[1]);
});
