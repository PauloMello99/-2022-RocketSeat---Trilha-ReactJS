import Logo from "../../assets/logo.svg";

import { Container, Content } from "./styles";

interface HeaderProps {
  onNewTransactionClick(): void;
}

export function Header({ onNewTransactionClick }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="DT Money" />
        <button type="button" onClick={onNewTransactionClick}>
          Nova Transação
        </button>
      </Content>
    </Container>
  );
}
