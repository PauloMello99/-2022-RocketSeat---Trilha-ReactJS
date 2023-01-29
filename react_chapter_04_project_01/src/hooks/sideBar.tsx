import { createContext, ReactNode, useContext, useEffect } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useRouter } from "next/router";

interface SideBarProviderProps {
  children: ReactNode;
}

type SideBarData = UseDisclosureReturn;

const SideBarContext = createContext<SideBarData>({} as SideBarData);

export function SideBarProvider({ children }: SideBarProviderProps) {
  const { onClose, ...disclosure } = useDisclosure();
  const { asPath } = useRouter();

  useEffect(() => {
    onClose();
  }, [asPath, onClose]);

  return (
    <SideBarContext.Provider value={{ onClose, ...disclosure }}>
      {children}
    </SideBarContext.Provider>
  );
}

export const useSideBar = () => useContext(SideBarContext);
