import { render } from "@testing-library/react";
import Home from "@/pages/index";

test("If home page is rendered unchanged", async () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
