import React from "react";
import { NavBar } from "~/components/NavBar";
import { AuthProvider } from "~/utils/AuthProvider";
import { mount } from "cypress/react";

describe("NavBar Component", () => {
  it("renders the NavBar for an authenticated user", () => {
    const mockUser = {
      displayName: "John Doe",
      email: "johndoe@example.com",
    };

    mount(
      <AuthProvider>
        <NavBar />
      </AuthProvider>
    );

    cy.contains("Kon2ro").should("be.visible");
    cy.contains(mockUser.displayName).should("be.visible");
    cy.get("i.ri-logout-box-line").should("be.visible");
    cy.get("i.ri-user-settings-fill").should("be.visible");
  });

  it("renders the NavBar for a guest user", () => {
    mount(
      <AuthProvider>
        <NavBar />
      </AuthProvider>
    );

    cy.contains("Kon2ro").should("be.visible");
    cy.get("i.ri-logout-box-line").should("not.exist");
    cy.get("i.ri-user-settings-fill").should("not.exist");
  });
});
