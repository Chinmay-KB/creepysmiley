import { Box } from "@chakra-ui/react";

import { CreepyCanvas } from "../components/CreepyCanvas";
import { SliderPack } from "../components/SliderPack";
import { CreepyDesc } from "../components/CreepyDesc";

export const App = () => {
  return (
    <Box display={{ md: "flex" }} sx={{ backgroundColor: "#FFD9C0" }}>
      <Box width={"50vw"} sx={{ height: "100vh", display: "flex" }}>
        <CreepyCanvas size={500} />
      </Box>
      <Box
        width={"50vw"}
        height={"100vh"}
        sx={{
          backgroundColor: "#F4BFBF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "1rem 4rem",
        }}
      >
        <CreepyDesc />
        <SliderPack alignItems="start" spacing="5" />
      </Box>
    </Box>
  );
};
