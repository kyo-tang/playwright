import { test, expect } from "@playwright/test";
import TodoPage from "./pages/todo-page";

test("homepage has title and links to intro page", async ({ page }) => {
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

  // deleting workflow
  const allItemsInTodo = page.locator(".todo-list li");
  //second item
  const secondItem = allItemsInTodo.nth(1);
  // hover over to make the second item delete X button visible
  secondItem.hover();
  const Xbutton = page.waitForSelector(".destory");
  (await Xbutton).click;
  await todoPage.checkNumberOfTodos(page, 1);
});
