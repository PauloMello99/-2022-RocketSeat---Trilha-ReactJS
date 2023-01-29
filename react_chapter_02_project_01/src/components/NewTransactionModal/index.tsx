import { FormEvent, useState } from "react";
import Modal from "react-modal";

import IncomeImage from "../../assets/income.svg";
import OutcomeImage from "../../assets/outcome.svg";
import CloseImage from "../../assets/close.svg";

import { useTransactions } from "../../hooks/transactions";
import { TransactionType } from "../../interfaces";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose(): void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState<TransactionType>("income");

  const resetFields = () => {
    setTitle("");
    setAmount(0);
    setCategory("");
    setType("income");
  };

  const handleCreateNewTransaction = async (e: FormEvent) => {
    e.preventDefault();
    await createTransaction({ title, amount, category, type });
    onRequestClose();
    resetFields();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleCreateNewTransaction}>
        <button
          type="button"
          className="react-modal-close"
          onClick={onRequestClose}
        >
          <img src={CloseImage} alt="Fechar modal" />
        </button>
        <h2>Nova transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            active={type === "income"}
            activeColor="green"
            onClick={() => setType("income")}
          >
            <img src={IncomeImage} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            active={type === "outcome"}
            activeColor="red"
            onClick={() => setType("outcome")}
          >
            <img src={OutcomeImage} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
