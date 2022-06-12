import { StackProps, VStack } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { getAuth } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { app, Creepy, submitVote } from "../db/db";
import { useCanvas } from "../hooks/useCanvas";
import { PropSlider } from "./PropSlider";

export const SliderPack = (props: StackProps) => {
  const {
    smileAngle,
    smileDistance,
    eyeRadius,
    setSmileAngle,
    setSmileDistance,
    setEyeRadius,
  } = useCanvas();
  const auth = getAuth(app);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [vote, setVote] = useState<Creepy | undefined>();
  const toast = useToast();
  useEffect(() => {
    if (vote != null && user != null) {
      submitVote(vote, user!.user, toast);
    }
  }, [vote]);
  return (
    <VStack {...props}>
      <PropSlider
        min={0.1}
        max={Math.PI}
        default={Math.PI / 4}
        onChange={setSmileAngle}
        title={"Change Smile Length"}
        trackColor="purple"
      />

      <PropSlider
        min={50}
        max={150}
        default={100}
        trackColor="green"
        onChange={setSmileDistance}
        title={"Change Smile Distance"}
      />
      <PropSlider
        min={10}
        trackColor="teal"
        max={60}
        default={30}
        onChange={setEyeRadius}
        title={"Change Eye Radius"}
      />
      {user === undefined ? (
        <Button onClick={() => signInWithGoogle()}>Login with Google</Button>
      ) : (
        <Button
          onClick={() => {
            setVote({
              smileDistance: smileDistance,
              smileAngle: smileAngle,
              eyeRadius: eyeRadius,
              timestamp: Date.now(),
            });
          }}
        >
          Click to Submit
        </Button>
      )}
    </VStack>
  );
};
