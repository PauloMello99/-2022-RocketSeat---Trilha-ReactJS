import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { Item } from "./Item";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

const generatePagesArray = (from: number, to: number) =>
  Array.from(Array(to - from))
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);

export default function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  registersPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  const currentStartCount =
    currentPage * registersPerPage - registersPerPage + 1;

  const currentEndCount =
    currentPage === lastPage
      ? totalCountOfRegisters
      : registersPerPage * currentPage;

  const isCurrentPageFarFromStart = currentPage > siblingsCount + 1;

  const isCurrentPageTwoPagesFarFromStart = currentPage > siblingsCount + 2;

  const isCurrentPageFarFromEnd = currentPage + siblingsCount < lastPage;

  const isCurrentPageTwoPagesFarFromEnd =
    currentPage + 1 + siblingsCount < lastPage;

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>{currentStartCount} </strong>-
        <strong> {currentEndCount}</strong> de
        <strong> {totalCountOfRegisters}</strong>
      </Box>
      <HStack>
        {isCurrentPageFarFromStart && (
          <>
            <Item number={1} onClick={onPageChange} />
            {isCurrentPageTwoPagesFarFromStart && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}
        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <Item key={`page_${page}`} number={page} onClick={onPageChange} />
          ))}
        <Item number={currentPage} isCurrent onClick={onPageChange} />
        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <Item key={`page_${page}`} number={page} onClick={onPageChange} />
          ))}
        {isCurrentPageFarFromEnd && (
          <>
            {isCurrentPageTwoPagesFarFromEnd && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <Item number={lastPage} onClick={onPageChange} />
          </>
        )}
      </HStack>
    </Stack>
  );
}
