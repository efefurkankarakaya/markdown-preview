import { render, waitFor } from "@testing-library/react";
import Home from "@/pages/index";

/* NOTE: When it fails or requires update, don't forget to remove __snapshots__ folder.  */
test("If home page is rendered unchanged", async () => {
  const { container } = render(<Home />);

  await waitFor(
    () => {
      const outputField = container.querySelector("#outputField");
      const isWelcomeTextSet = outputField?.hasChildNodes();
      expect(isWelcomeTextSet).toBe(true);
    },
    { container }
  );

  expect(container).toMatchSnapshot();
});
