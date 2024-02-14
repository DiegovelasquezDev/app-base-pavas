import { validateEmail } from "../../../src/utils/functions/ValidateRegex";

describe("Functions with regex", () => {
  test("Validate Email", () => {
    const validEmail = "prueba@example.com";
    const isValidEmail = validateEmail(validEmail);
    expect(isValidEmail).toBe(true);
  });
});
