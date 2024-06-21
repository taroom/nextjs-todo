import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "@/components/TodoItem";

// await prisma.todo.create({
//   data: {
//     title: "Tugas 3",
//     complete: false
//   }
// });

async function toggleTodo(id: string, complete: boolean)
{
 "use server"

  await prisma.todo.update({
    where: {id}, data: {complete}
  })
}

function getTodos()
{
  return prisma.todo.findMany();
}

export default async function Home() {
  const todos = await getTodos();
  return <>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Todo List</h1>
      <Link href="/new" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 outline-none">Halaman Baru</Link>
    </header>
    <ul className="pl-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}></TodoItem>
      ))}
    </ul>
  </>
}