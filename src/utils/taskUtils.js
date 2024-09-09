import { addTodo, getList } from "../db/db";
import { formatDate } from "./format";

// Function to add a new task
export async function inputAddTodo(val, activeList, date) {
  if (val.length !== 0) {
    const primaryKey = await getList(activeList);
    await addTodo({
      title: val,
      listId: primaryKey.id,
      checked: false,
      date: date,
      today: formatDate(new Date()) === date,
    });
  }
}
