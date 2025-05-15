export function NavBar() {
  const user = true;
  return (
    <nav className="flex items-center w-screen">
      <div className="flex justify-between w-full m-4">
        <a href="/">
          <h1>Kon2ro</h1>
        </a>
        {user ? (
          <button>
            <i className="ri-user-settings-fill text-secondary-100 text-6xl"></i>
          </button>
        ) : null}
      </div>
    </nav>
  );
}
