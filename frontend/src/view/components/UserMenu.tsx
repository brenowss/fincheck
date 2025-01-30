interface UserMenuProps {
  username: string;
}

export function UserMenu({ username }: UserMenuProps) {
  // two first initials of the username
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div className="grid size-12 place-items-center rounded-full border border-teal-100 bg-teal-50">
      <span className="text-sm font-medium -tracking-[0.5px] text-teal-900">
        {initials}
      </span>
    </div>
  );
}
