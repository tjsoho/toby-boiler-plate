import { createMocks } from "node-mocks-http";
import { POST as handler } from "../../app/api/payment/create-checkout/route";
import { User } from "../../libs/database/types";

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(() =>
    Promise.resolve<{ user: User }>({
      user: {
        id: "user_123",
        products: [],
        createdAt: new Date(),
        customerId: "cus_123",
        email: "test@example.com",
        image: "user.jpg",
        name: "Username",
      },
    })
  ),
}));

describe("Create checkout session", () => {
  it("should return 200", async () => {
    const { req } = createMocks({
      method: "POST",
    });

    // Mock the json method to simulate Next.js behavior
    req.json = async () => ({
      priceId: "price_456",
      successUrl: "https://example.com/success",
      cancelUrl: "https://example.com/cancel",
      mode: "payment",
    });

    const res = await handler(req as any);
    const resJson = await res.json();

    expect(resJson).toBe(200);
  });
});
