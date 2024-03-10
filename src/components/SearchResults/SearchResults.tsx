import { useEffect, useState, useRef } from "react";
import { useUsersContext } from "../../context/useUsersContext";
import { useInView } from "react-intersection-observer";
import { UserCard } from "../UserCard/UserCard";

import type { UserDataI } from "../../types";
import "./style.css";

export function SearchResults() {
  const { users, loading, error, fetchUsers, lastSearchRequest, total } = useUsersContext();
  const [ref] = useInView({
    onChange: (inView) => {
      if (inView && users && users.length < total) {
        const nextPage = page.current + 1;
        fetchUsers({ searchUser: lastSearchRequest, append: true, skip: nextPage * 10 });
        page.current = nextPage;
      }
    }
  });
  const [usersData, setUsersData] = useState<UserDataI[] | null>(null);
  const page = useRef(0);

  useEffect(() => {
    setUsersData(users);
    if (!users || users.length === 0) page.current = 0;
  }, [users]);

  return (
    <div className="usersList">
      {error && <p>{error.message}</p>}
      {usersData && usersData.map((user, index) => (
        <UserCard key={user.id} ref={users && index === users.length - 1 ? ref : null} {...user} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}