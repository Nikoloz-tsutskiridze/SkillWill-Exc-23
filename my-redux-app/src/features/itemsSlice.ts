import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Item {
  id: number;
  name: string;
}

interface ItemsState {
  items: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk<Item[]>(
  "items/fetchItems",
  async () => {
    const response = await fetch("/api/items");
    return response.json();
  }
);

export const addItem = createAsyncThunk<Item, Item>(
  "items/addItem",
  async (newItem) => {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    return response.json();
  }
);

export const updateItem = createAsyncThunk<Item, Item>(
  "items/updateItem",
  async (updatedItem) => {
    const response = await fetch(`/api/items/${updatedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    return response.json();
  }
);

export const deleteItem = createAsyncThunk<number, number>(
  "items/deleteItem",
  async (id) => {
    await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action: PayloadAction<Item>) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default itemsSlice.reducer;
