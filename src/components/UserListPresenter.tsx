import { ReactNode, useState } from "react";

type UserListPresenterProps = {
  render?: (props: {
    users: string[];
    pickRandomUsers: () => void;
  }) => ReactNode;
};

const allUsers = [
  "Ava Carter",
  "Leo Bennett",
  "Mia Thompson",
  "Noah Rivera",
  "Sofia Hughes",
  "Ethan Brooks",
  "Isla Foster",
  "Lucas Reed",
  "Chloe Price",
  "Mason Kelly",
];

function pickThreeRandomUsers(userList: string[]): string[] {
  const shuffled = [...userList].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export default function UserListPresenter({ render }: UserListPresenterProps) {
  const [users, setUsers] = useState<string[]>(() => pickThreeRandomUsers(allUsers));

  const pickRandomUsers = () => {
    setUsers(pickThreeRandomUsers(allUsers));
  };

  if (render) return <>{render({ users, pickRandomUsers })}</>;
  return null;
}