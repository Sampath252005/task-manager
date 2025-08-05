import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch tasks
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
  console.log("Fetched tasks:", data);
  return data;
});

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

    return taskId; // We return task ID to remove it from Redux store
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
    completedCount: 0, // ✅ extra state to store completed tasks
  },
  reducers: {
    // Optional: You can add non-async reducers here later
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        // ✅ Update completedCount when tasks are fetched
        state.completedCount = action.payload.filter(
          (task) => task.completed
        ).length;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload;
        const wasCompleted = state.items.find(
          (task) => task._id === taskId
        )?.completed;

        // Remove task
        state.items = state.items.filter((task) => task._id !== taskId);

        // Adjust completed count
        if (wasCompleted) {
          state.completedCount -= 1;
        }
      });
  },
});

export default taskSlice.reducer;
