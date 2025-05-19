import React from "react";
import { useAuth } from "~/utils/AuthProvider";
import { Link } from "@remix-run/react";

export function NavBar() {
  const { user, loading } = useAuth();

  return (
    <nav className="flex items-center w-screen">
      <div className="flex justify-between w-full m-4">
        <Link to="/">
          <h1 className="hover:text-secondary-hover-100">Kon2ro</h1>
        </Link>
        {!loading && user ? (
          <div className="flex items-center gap-4">
            <span className="text-secondary-100 font-rbeanie text-2xl">
              {user.displayName || user.email}
            </span>
            <Link to="/logout">
              <i className="ri-logout-box-line text-secondary-100 text-3xl hover:text-secondary-hover-100"></i>
            </Link>
            <button>
              <i className="ri-user-settings-fill text-secondary-100 text-6xl hover:text-secondary-hover-100"></i>
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
