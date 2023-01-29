import { useTransactions } from "../../hooks/transactions";

import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(
            ({ id, title, amount, type, createdAt, category }) => {
              const formattedAmount = amount.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              });

              const amountText = `${
                type === "outcome" ? "- " : ""
              }${formattedAmount}`;

              const dateText = new Date(createdAt).toLocaleDateString();

              return (
                <tr key={id}>
                  <td>{title}</td>
                  <td className={type}>{amountText}</td>
                  <td>{category}</td>
                  <td>{dateText}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Container>
  );
}
