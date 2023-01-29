import Income from "../../assets/income.svg";
import Outcome from "../../assets/outcome.svg";
import Total from "../../assets/total.svg";
import { useTransactions } from "../../hooks/transactions";

import { Container } from "./styles";

export function Summary() {
  const { summary } = useTransactions();

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={Income} alt="Entrada" />
        </header>
        <strong>
          {summary.income.toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={Outcome} alt="Entrada" />
        </header>
        <strong>
          {summary.outcome.toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={Total} alt="Entrada" />
        </header>
        <strong>
          {summary.total.toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </strong>
      </div>
    </Container>
  );
}
