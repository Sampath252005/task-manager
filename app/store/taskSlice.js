import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/tasks", {
    method: "GET", // ✅ explicitly specify method
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    if (!res.ok) {
        throw new Error("Failed to fetch tasks");
    }
  const data = await res.json();
  console.log("Fetched tasks:", data); // Log the fetched tasks
  return data;
});


const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default taskSlice.reducer;
