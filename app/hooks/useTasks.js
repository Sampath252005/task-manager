import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/taskSlice";

export const useTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  const refreshTasks = () => dispatch(fetchTasks());

  return { tasks, loading, error, refreshTasks };
};
