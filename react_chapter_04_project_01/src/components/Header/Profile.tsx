import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showData?: boolean;
}

export function Profile({ showData }: ProfileProps) {
  return (
    <Flex align="center">
      {showData && (
        <Box mr="4" textAlign="right">
          <Text>Paulo Mello</Text>
          <Text color="gray.300" fontSize="sm">
            paulovmello99@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Paulo Mello"
        src="https://github.com/paulomello99.png"
      />
    </Flex>
  );
}
