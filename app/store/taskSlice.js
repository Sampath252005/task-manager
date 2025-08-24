import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async thunk to fetch ALL tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/tasks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await res.json();
  // console.log("Fetched tasks:", data);
  return data;
});

// ✅ Async thunk to fetch ONLY completed tasks
export const fetchCompletedTasks = createAsyncThunk(
  "tasks/fetchCompletedTasks",
  async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/completed-tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res);

    if (!res.ok) {
      throw new Error("Failed to fetch completed tasks");
    }

    const data = await res.json();
    // console.log("Fetched completed tasks:", data);
    return data.tasks || []; // assuming your API returns { tasks: [...] }
  }
);

// ✅ Async thunk to delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    return taskId; // return task ID to remove from Redux
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [], // all tasks
    completedItems: [], // only completed tasks
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Fetch all tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 📌 Fetch completed tasks
      .addCase(fetchCompletedTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompletedTasks.fulfilled, (state, action) => {
        state.completedItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchCompletedTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 📌 Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload;

        // remove from all items
        state.items = state.items.filter((task) => task._id !== taskId);

        // remove from completed items
        state.completedItems = state.completedItems.filter(
          (task) => task._id !== taskId
        );
      });
  },
});

export default taskSlice.reducer;

// ✅ Selectors
export const selectTasks = (state) => state.tasks.items;
export const selectCompletedTasks = (state) => state.tasks.completedItems;
export const selectCompletedCount = (state) =>
  state.tasks.completedItems.length;
export const selectPendingCount = (state) =>
  state.tasks.items.length - state.tasks.completedItems.length;
