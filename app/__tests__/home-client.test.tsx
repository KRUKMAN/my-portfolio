import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomeClient from "../home-client";

const pushMock = vi.fn();
const originalLocation = window.location;
let hrefMock = window.location.href;

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("../components/PageSelector", () => ({
  PageSelector: () => <div data-testid="page-selector" />,
}));

describe("HomeClient", () => {
  beforeAll(() => {
    delete (window as unknown as { location: Location }).location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...originalLocation,
        get href() {
          return hrefMock;
        },
        set href(value: string) {
          hrefMock = value;
        },
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  beforeEach(() => {
    pushMock.mockClear();
    hrefMock = "http://localhost";
  });

  it("toggles between stack and overview when clicking a card", async () => {
    const user = userEvent.setup();
    render(<HomeClient />);

    expect(
      screen.getByText(/Which Jake do you want today\?/i)
    ).toBeInTheDocument();

    await user.click(screen.getByTestId("card-rundown"));
    expect(screen.getByText(/Select a persona/i)).toBeInTheDocument();

    await user.click(screen.getByTestId("card-rundown"));
    expect(
      screen.getByText(/Which Jake do you want today\?/i)
    ).toBeInTheDocument();
  });

  it("handles external and internal CTA navigation without toggling stack/grid", async () => {
    const user = userEvent.setup();
    render(<HomeClient />);

    const buttons = screen.getAllByRole("button", { name: /learn more/i });
    await user.click(buttons[0]);
    expect(window.location.href).toBe("https://rundown.digital");
    expect(pushMock).not.toHaveBeenCalled();
    expect(screen.getByText(/Which Jake do you want today\?/i)).toBeInTheDocument();

    await user.click(buttons[1]);
    expect(pushMock).toHaveBeenCalledWith("/consulting");
  });

  it("cycles the stack on wheel and prevents page scroll", async () => {
    render(<HomeClient />);

    const initialTop = document.querySelectorAll(
      '[data-testid^="card-"]:not([data-testid="stack-container"])'
    )[0];
    expect(initialTop).toHaveAttribute("data-testid", "card-rundown");

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
      expect(afterTop).toHaveAttribute("data-testid", "card-revops");
    });
    expect(preventSpy).toHaveBeenCalled();
  });
});
