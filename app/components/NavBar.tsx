export function NavBar() {
  const user = true;
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center">
        <a href="/">
          <h1>Kon2ro</h1>
        </a>
        {user ? <i className="ri-user-settings-fill"></i> : null}
      </div>
    </nav>
  );
}
