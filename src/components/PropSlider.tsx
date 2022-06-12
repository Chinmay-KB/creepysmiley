import {
  Text,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React, { FC } from "react";
interface PropSliderProps {
  min: number;
  max: number;
  default: number;
  trackColor: string;
  onChange: (value: number) => void;
  title: string;
}
export const PropSlider: FC<PropSliderProps> = (props) => {
  return (
    <>
      <Text>{props.title}</Text>
      <Slider
        aria-label={props.title}
        defaultValue={props.default}
        min={props.min}
        max={props.max}
        step={0.1}
        onChange={props.onChange}
        colorScheme={props.trackColor}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </>
  );
};
