import '@testing-library/jest-dom';

import { Marker } from '@/utils/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MarkersSelectProps } from '../../Markers/MarkersSelect/MarkersSelect';
import PanelForm from './PanelForm';

const MOCK_MARKERS: Marker[] = [
  {
    id: 1,
    name: "test 1",
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
    name: "test 2",
    description: "",
    lab_id: 2,
    price: "n/a",
    provider_id: "xyz",
    slug: "test-2",
    type: null,
    unit: null,
  },
];

jest.mock("../../Markers", () => ({
  MarkersSelect: ({ id, onChange }: MarkersSelectProps) => {
    return <input onClick={() => onChange(MOCK_MARKERS)} id={id} />;
  },
}));

describe("PanelForm", () => {
  it("displays the modal contents when open and calls onClose() on cancel", async () => {
    const handleClose = jest.fn();
    render(<PanelForm isOpen onClose={handleClose} onSubmit={() => {}} />);

    expect(screen.getByText("Create your panel")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(handleClose).toHaveBeenCalled();
  });

  it("submits the input values", async () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    render(<PanelForm isOpen onClose={handleClose} onSubmit={handleSubmit} />);

    await userEvent.type(
      screen.getByRole("textbox", { name: "Name" }),
      "test name"
    );
    await userEvent.click(screen.getByRole("textbox", { name: "Biomarkers" }));
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Collection method" }),
      ["Test kit"]
    );
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(handleSubmit).toHaveBeenCalledWith({
      collectionMethod: "test_kit",
      markers: MOCK_MARKERS,
      name: "test name",
    });

    expect(handleClose).toHaveBeenCalled();
  });

  it("validates the values", async () => {
    const handleClose = jest.fn();
    const handleSubmit = jest.fn();
    render(<PanelForm isOpen onClose={handleClose} onSubmit={handleSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByRole("textbox", { name: "Name" })).toBeInvalid();
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    // MarkerSelect is mocked so won't get invalid state
    expect(
      screen.getByText("At least one marker is required")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Collection method" })
    ).toBeInvalid();
    expect(
      screen.getByText("Collection method is required")
    ).toBeInTheDocument();

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleClose).not.toHaveBeenCalled();
  });
});
