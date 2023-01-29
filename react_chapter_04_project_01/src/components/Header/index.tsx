import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSideBar } from "../../hooks/sideBar";

import { Logo } from "./Logo";
import { NotificationNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { Search } from "./Search";

export default function Header() {
  const isWide = useBreakpointValue({ base: false, lg: true });
  const { onOpen } = useSideBar();

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      px="8"
      mt="4"
      align="center"
    >
      {!isWide && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}
      <Logo />
      {isWide && <Search />}
      <Flex align="center" ml="auto">
        <NotificationNav />
        <Profile showData={isWide} />
      </Flex>
    </Flex>
  );
}
