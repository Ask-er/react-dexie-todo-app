import ToDoCardHeader from "./ToDoCardHeader";
import ToDoCardBody from "./ToDoCardBody";
export default function ToDoCard({ date }) {
  return (
    <div className="todo-card mb-4">
      <ToDoCardHeader date={date} />
      <ToDoCardBody date={date} />
    </div>
  );
}
