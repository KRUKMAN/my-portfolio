import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomeClient from "../home-client";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("../components/PageSelector", () => ({
  PageSelector: () => <div data-testid="page-selector" />,
}));

describe("HomeClient", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("toggles between stack and overview when clicking a card", async () => {
    const user = userEvent.setup();
    render(<HomeClient />);

    expect(
      screen.getByText(/Which Jake do you want today\?/i)
    ).toBeInTheDocument();

    await user.click(screen.getByTestId("card-consulting"));
    expect(screen.getByText(/Select a persona/i)).toBeInTheDocument();

    await user.click(screen.getByTestId("card-consulting"));
    expect(
      screen.getByText(/Which Jake do you want today\?/i)
    ).toBeInTheDocument();
  });

  it("navigates via the CTA without toggling stack/grid", async () => {
    const user = userEvent.setup();
    render(<HomeClient />);

    await user.click(screen.getAllByRole("button", { name: /learn more/i })[0]);
    expect(pushMock).toHaveBeenCalledWith("/consulting");
    expect(
      screen.getByText(/Which Jake do you want today\?/i)
    ).toBeInTheDocument();
  });

  it("cycles the stack on wheel and prevents page scroll", async () => {
    render(<HomeClient />);

    const initialTop = document.querySelectorAll(
      '[data-testid^="card-"]:not([data-testid="stack-container"])'
    )[0];
    expect(initialTop).toHaveAttribute("data-testid", "card-consulting");

    const stack = screen.getByTestId("stack-container");
    const wheelEvent = new WheelEvent("wheel", {
      deltaY: 40,
      cancelable: true,
    });
    const preventSpy = vi.spyOn(wheelEvent, "preventDefault");
    await act(async () => {
      stack.dispatchEvent(wheelEvent);
    });

    await waitFor(() => {
      const afterTop = document.querySelectorAll(
        '[data-testid^="card-"]:not([data-testid="stack-container"])'
      )[0];
      expect(afterTop).toHaveAttribute("data-testid", "card-ai");
    });
    expect(preventSpy).toHaveBeenCalled();
  });
});
