'use client'
import taskManageApi from "@/network/taskManageApi";
import Tasks from "./components/Tasks/Tasks";
import { useGlobalState } from "./context/globalContextProvider";



export default function Home() {
  const { tasks } = useGlobalState();

  return (
    <main>
      <Tasks title={"Tasks"} tasks={tasks} />
    </main>
  );
}
