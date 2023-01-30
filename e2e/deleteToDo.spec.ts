import { test, expect } from "@playwright/test";
import TodoPage from "./pages/todo-page";

test("Given a user, When user delete an item, Then item is removed from the list", async ({
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

  // check the total is 2 in local storage
  await todoPage.checkNumberOfTodos(page, 2);

  // Deleting workflow
  const allItemsInTodo = page.locator(".todo-list li");
  // First item
  const firstItem = allItemsInTodo.nth(0);
  // hover over to make the second item delete X button visible
  firstItem.hover();
  const Xbutton = page.waitForSelector(".destroy");
  (await Xbutton).click();

  await expect(page.locator(".view label")).toHaveCount(1);
  await expect(page.locator(".view label")).toHaveText(todoPage.todoItems[1]);
});
