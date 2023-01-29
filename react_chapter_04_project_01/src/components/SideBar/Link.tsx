import { ElementType } from "react";
import {
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Text,
} from "@chakra-ui/react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" py="1" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="md">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
