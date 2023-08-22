import '@testing-library/jest-dom';

import { Marker } from '@/utils/types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MarkersSelectProps } from '../Markers/MarkersSelect/MarkersSelect';
import Panels from './Panels';

const MOCK_MARKERS: Marker[] = [
  {
    id: 1,
    name: "test marker 1",
    description: "",
    lab_id: 1,
    price: "n/a",
    provider_id: "abc",
    slug: "test-1",
    type: null,
    unit: null,
  },
  {
    id: 2,
    name: "test marker 2",
    description: "",
    lab_id: 2,
    price: "n/a",
    provider_id: "xyz",
    slug: "test-2",
    type: null,
    unit: null,
  },
];

jest.mock("../Markers", () => ({
  MarkersSelect: ({ id, onChange }: MarkersSelectProps) => {
    return <input onClick={() => onChange(MOCK_MARKERS)} id={id} />;
  },
}));

describe("PanelForm", () => {
  it("shows the initial state", async () => {
    render(<Panels />);

    expect(screen.getByText("Your Panels")).toBeInTheDocument();

    expect(
      screen.getByText("You have not created any panels yet.")
    ).toBeInTheDocument();
  });

  it("shows the new panel on submission", async () => {
    render(<Panels />);

    await userEvent.click(
      screen.getByRole("button", { name: "Create new panel" })
    );

    await userEvent.type(
      await screen.findByRole("textbox", { name: "Name" }),
      "test name"
    );
    await userEvent.click(screen.getByRole("textbox", { name: "Markers" }));
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Collection method" }),
      ["Test kit"]
    );
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    // The modal is closed
    await waitFor(() => {
      return expect(
        screen.queryByText("Create your panel")
      ).not.toBeInTheDocument();
    });

    // The name is displayed in the panel card
    expect(screen.getByText("test name")).toBeInTheDocument();
    // The collection method
    expect(screen.getByText("Test kit")).toBeInTheDocument();
    // The markers
    expect(screen.getByText("test marker 1")).toBeInTheDocument();
    expect(screen.getByText("test marker 2")).toBeInTheDocument();
  });
});
