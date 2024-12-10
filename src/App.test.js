import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"; 

describe("App Component", () => {
  test("redirects to /login when not logged in and tries to access /channels", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("navigates to /channels when logged in", () => {
    localStorage.setItem("authHeaders", JSON.stringify({ token: "fakeToken" }));

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(/Channels Page/i)).toBeInTheDocument(); // Replace with actual Channel page content
  });
});
