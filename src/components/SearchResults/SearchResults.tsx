import { useContext } from "react";
import { SearchContext } from "./SearchContext";
import { UserCard } from "../UserCard/UserCard";

import "./style.css";

export function SearchResults() {
  const { users } = useContext(SearchContext);

  return (
    <div className="usersList">
      {users.map((user) => (
        <UserCard {...user} />
      ))}
    </div>
  );
}
