import { useState } from "react";
import Modal from "react-modal";

import { AppProvider } from "./hooks";
import { Dashboard, Header, NewTransactionModal } from "./components";

import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const handleOpenNewTransactionModal = () =>
    setIsNewTransactionModalOpen(true);

  const handleCloseNewTransactionModal = () =>
    setIsNewTransactionModalOpen(false);

  return (
    <AppProvider>
      <div className="App">
        <Header onNewTransactionClick={handleOpenNewTransactionModal} />
        <Dashboard />
        <GlobalStyle />
        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModal}
        />
      </div>
    </AppProvider>
  );
}
