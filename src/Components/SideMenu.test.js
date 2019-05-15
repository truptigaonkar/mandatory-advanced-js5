import React from "react";
import { expect } from "chai";
import Adapter from "enzyme-adapter-react-16";
import { render, configure } from "enzyme";
import SideMenu from "./SideMenu";

configure({ adapter: new Adapter() });

describe("Side menu", () => {
  it("Renders side menu with 2 items", () => {
    const wrapper = render(<SideMenu location={{ pathname: "/home/foo" }} />);
    expect(wrapper.find(".menu")).to.have.lengthOf(2);
  });

  it("Renders the title", () => {
    const wrapper= render(<SideMenu location={{ pathname: "/home/foo" }} />);
    expect(wrapper.text()).to.contain("Upload");
  })
});