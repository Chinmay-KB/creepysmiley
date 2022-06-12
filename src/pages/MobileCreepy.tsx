import { Box, VStack } from "@chakra-ui/layout";
import { CreepyCanvas } from "../components/CreepyCanvas";
import { SliderPack } from "../components/SliderPack";
import { CreepyDesc } from "../components/CreepyDesc";

export const MobileCreepy = () => {
  return (
    <VStack
      spacing={0}
      align={"center"}
      sx={{ background: "pink", paddingLeft: "1rem", paddingRight: "1rem" }}
    >
      <CreepyDesc />
      <Box sx={{ transform: "scale(0.8)" }}>
        <CreepyCanvas size={500} />
      </Box>
      <SliderPack
        w="100vw"
        p="0 1rem"
        spacing={4}
        backgroundColor={"#F4BFBF"}
        py={"1rem"}
      />
    </VStack>
  );
};
