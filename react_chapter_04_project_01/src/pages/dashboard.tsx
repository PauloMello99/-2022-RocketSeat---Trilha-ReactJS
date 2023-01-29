import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    foreColor: theme.colors.gray[600],
  },
  grid: { show: false },
  dataLabels: { enabled: false },
  tooltip: { enabled: false },
  xaxis: {
    type: "datetime",
    axisBorder: { color: theme.colors.gray[600] },
    categories: [
      "2022-03-02",
      "2022-03-03",
      "2022-03-04",
      "2022-03-05",
      "2022-03-06",
      "2022-03-07",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: "series1", data: [32, 75, 43, 11, 63, 82] }];

export default function Dashboard() {
  return (
    <Flex flexDirection="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth={320}
          alignItems="flex-start"
        >
          <Box p={["4", "8"]} pb="4" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box p={["4", "8"]} pb="4" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
