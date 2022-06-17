import { Button } from "@chakra-ui/button";
import { Box, HStack, VStack, Text, Link } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { GithubIcon } from "../icons/GithubIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { App } from "./DesktopCreepy";
import { MobileCreepy } from "./MobileCreepy";
const shareUrl =
  "https://twitter.com/intent/tweet?text=%23CreepySmiley%20Do%20you%20get%20sick%20in%20your%20stomach%20when%20you%20see%20the%20%F0%9F%99%82%20emoji%3F%20How%20much%20of%20that%20sly%20smile%20is%20creepy%3F%20&url=creepysmiley.art";
const githubUrl = "https://github.com/Chinmay-KB/creepysmiley";
export const SwitchLayout = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const breakpoint = 600;
  return width < breakpoint ? (
    <>
      {" "}
      <MobileCreepy />
      <VStack backgroundColor="pink">
        <Text>
          Made with 🫤 by{" "}
          <Link fontWeight="600" href="https://github.com/Chinmay-KB">
            Chinmay Kabi
          </Link>{" "}
          🙂🙂🙂🙂
        </Text>
        <HStack>
          <Button
            onClick={() => {
              window.open(shareUrl, "_blank");
            }}
            padding={0}
            backgroundColor="transparent"
          >
            <TwitterIcon />
          </Button>
          <Button
            onClick={() => {
              window.open(githubUrl, "_blank");
            }}
            padding={0}
            backgroundColor="transparent"
          >
            <GithubIcon />
          </Button>
        </HStack>
      </VStack>
    </>
  ) : (
    <>
      <HStack
        h="1rem"
        backgroundColor="transparent"
        position="absolute"
        bottom="13vh"
        right={4}
      >
        <Button
          onClick={() => {
            window.open(shareUrl, "_blank");
          }}
          padding={0}
          backgroundColor="transparent"
        >
          <TwitterIcon />
        </Button>
        <Button
          onClick={() => {
            window.open(githubUrl, "_blank");
          }}
          padding={0}
          backgroundColor="transparent"
        >
          <GithubIcon />
        </Button>
        <Text>
          Made with 🫤 by{" "}
          <Link fontWeight="600" href="https://github.com/Chinmay-KB">
            Chinmay Kabi
          </Link>{" "}
          🙂🙂🙂🙂
        </Text>
      </HStack>

      <App />
    </>
  );
};
