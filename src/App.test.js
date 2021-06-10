import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "./App";

jest.mock("axios");

describe("App Test 1", () => {
  test("renders App component", () => {
    render(<App />);

    expect(screen.getByText(/Book Catalogue/)).toBeInTheDocument();
    expect(screen.getByText(/Shiba Book Shop POS/)).toBeInTheDocument();
    expect(screen.getByText(/Shopping Cart/)).toBeInTheDocument();

    screen.debug();
  });
});

describe("App Test 2", () => {
  test("user clicks checkout when the cart is empty", async () => {
    render(<App />);

    await userEvent.click(screen.getByText(/Checkout/));
    expect(screen.getByText("Please select items before checkout")).toBeInTheDocument();

    screen.debug();
  });
});

describe("App Test 3", () => {
  test("fetches book data from an API", async () => {
    render(<App />);

    expect(axios.get).toHaveBeenCalled()

    screen.debug();
  });
});
