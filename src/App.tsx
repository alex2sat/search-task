import { useState } from "react";
import { SearchForm } from "./components/SearchFrom/SearchForm";
import { SearchContext } from "./components/SearchResults/SearchContext";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { mockUsers } from "./mockUsers";

export default function App() {
  const [users] = useState(mockUsers);

  return (
    <SearchContext.Provider value={{ users }}>
      <SearchForm />
      <SearchResults />
    </SearchContext.Provider>
  );
}
