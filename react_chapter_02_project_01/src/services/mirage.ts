import { createServer, Model } from "miragejs";
import { Transaction } from "../interfaces";

const transactions: Transaction[] = [
  {
    id: 1,
    title: "Freelancer de website",
    type: "income",
    category: "DEV",
    amount: 1000,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Freelancer de website",
    type: "income",
    category: "DEV",
    amount: 1000,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Aluguel",
    type: "outcome",
    category: "Casa",
    amount: 450,
    createdAt: new Date().toISOString(),
  },
];

createServer({
  models: { transaction: Model },
  seeds(server) {
    server.db.loadData({ transactions });
  },
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => this.schema.all("transaction"));

    this.post("/transactions", (schema, request) => {
      const input = JSON.parse(request.requestBody);
      const transaction = { ...input, createdAt: new Date().toISOString() };
      return schema.create("transaction", transaction);
    });
  },
});
