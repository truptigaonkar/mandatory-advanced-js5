import React from "react";
import { expect } from "chai";
import Adapter from "enzyme-adapter-react-16";
import { render, configure } from "enzyme";
import SideMenu from "./SideMenu";

configure({ adapter: new Adapter() });

describe("Side menu", () => {
  it('Menu includes text "Upload File"', () => {
    const wrapper= render(<SideMenu location={{ pathname: "/home/foo" }} />);
    expect(wrapper.text()).to.contain("Upload File");
  })

  it('Menu includes text "New"', () => {
    const wrapper= render(<SideMenu location={{ pathname: "/home/foo" }} />);
    expect(wrapper.text()).to.contain("New Folder");
  })
});