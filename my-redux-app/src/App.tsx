import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { toggleTheme } from "./features/themeSlice";
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
} from "./features/itemsSlice";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const items = useSelector((state: RootState) => state.items.items);
  const status = useSelector((state: RootState) => state.items.status);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleFetchItems = () => {
    dispatch(fetchItems());
  };

  return (
    <div className={`App ${theme}`}>
      <button onClick={handleToggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
      <button onClick={handleFetchItems}>Fetch Items</button>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error fetching items</p>}
      {items.length > 0 && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
