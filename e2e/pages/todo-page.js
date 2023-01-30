import { expect, Page, evaluate } from "@playwright/test";

export default class TodoPage {
    todoItems;

    constructor(page, todoItems) {
        this.todoItems = todoItems;
    }

    async checkNumberOfTodos(page, expected) {
    const localStorage = await page.evaluate(() =>
        JSON.parse(window.localStorage["react-todos"])
      );
      expect(localStorage.length).toEqual(expected);

    }

    async checkTodosAtIndex(page, title, index) {
    const localStorage = await page.evaluate(() =>
        JSON.parse(window.localStorage["react-todos"])
      );
    expect(localStorage[index]["title"]).toBe(title);
}


}