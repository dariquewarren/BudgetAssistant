import React from "react";
import { shallow } from "enzyme";
import FormProper from "../../components/expenseForm";
import expensesData from "../fixtures/expensesData";
import moment from 'moment'
test("should render expense form correctly", () => {
  const wrapper = shallow(<FormProper />);
  expect(wrapper).toMatchSnapshot();
});

// should render expense form with expense data from fixture


