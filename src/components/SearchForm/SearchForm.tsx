import { useState } from "react";
import { useUsersContext } from "../../context/useUsersContext";
import { useDebounce } from "../../hooks/useDebouncedFunction";
import "./styles.css";

export function SearchForm() {
  const { fetchUsers } = useUsersContext();
  const [value, setValue] = useState('');
  const debouncedRequest = useDebounce(fetchUsers, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    debouncedRequest({ searchUser: newValue, append: false })
  };

  return (
    <div className="searchForm">
      <form>
        <input type="text" placeholder="Search User" value={value} onChange={handleChange} />
      </form>
    </div>
  );
}
