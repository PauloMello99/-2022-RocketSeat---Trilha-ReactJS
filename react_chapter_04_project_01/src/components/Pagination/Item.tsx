import { Button } from "@chakra-ui/react";

interface ItemProps {
  isCurrent?: boolean;
  number: number;
  onClick: (page: number) => void;
}

export function Item({ isCurrent = false, number, onClick }: ItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{ bg: "pink.500", cursor: "default" }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      onClick={() => onClick(number)}
      _hover={{ bg: "gray.500" }}
    >
      {number}
    </Button>
  );
}
