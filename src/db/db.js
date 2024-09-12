import Dexie from "dexie";
const db = new Dexie("TodoDB");
db.version(1).stores({
  todos: "++id, listId, title, checked, date, today, notes",
  lists: "++id, title",
  subtodo: "++id, todoId, title, checked",
});
async function initializeLists() {
  const count = await db.lists.count();
  if (count === 0) {
    await db.lists.bulkAdd([{ title: "Personal" }, { title: "Work" }]);
  }
}

// Call the initialize function
initializeLists();

export async function addTodo(task) {
  return db.todos.add({ ...task });
}
export async function addList(title) {
  return db.lists.add({ title });
}

export async function getList(activeList) {
  return db.lists.where("title").equals(activeList).first();
}
export async function getListById(id) {
  return db.lists.get(id);
}
export async function getTodo(id) {
  return db.todos.get(id);
}
export default db;
