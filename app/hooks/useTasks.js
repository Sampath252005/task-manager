import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, fetchCompletedTasks } from "../store/taskSlice";

export const useTasks = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.items);
  const completedTasks = useSelector((state) => state.tasks.completedItems);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  const refreshTasks = () => dispatch(fetchTasks());
  const refreshCompletedTasks = () => dispatch(fetchCompletedTasks());

  return {
    tasks,
    completedTasks,
    loading,
    error,
    refreshTasks,
    refreshCompletedTasks,
  };
};
