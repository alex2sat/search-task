import { SearchForm } from "./components/SearchForm/SearchForm";
import { UsersProvider } from "./context/UsersContext";
import { SearchResults } from "./components/SearchResults/SearchResults";


export default function App() {
  return (
    <UsersProvider>
      <SearchForm />
      <SearchResults />
    </UsersProvider>
  );
}
