import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import ModeSelector from "../ModeSelector/ModeSelector";

type Mode = "focus" | "shortBreak" | "longBreak" | "custom";

interface TimerProps {
  initialMode?: Mode;
}

export default function Timer({ initialMode = "focus" }: TimerProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [isActive, setIsActive] = useState(false);

  const modeTimes: Record<Exclude<Mode, "custom">, number> = {
    focus: 25 * 1,
    shortBreak: 5 * 1,
    longBreak: 15 * 1,
  };

  const [customTimes, setCustomTimes] = useState({
    work: 25,
    break: 5,
  });

  const [timeLeft, setTimeLeft] = useState(modeTimes.focus * 60);
  const [isBreak, setIsBreak] = useState(false);
  const [lastWorkMode, setLastWorkMode] = useState<Mode>("focus");

  const getTime = (mode: Mode, isBreak: boolean) => {
    if (mode === "custom") {
      return (isBreak ? customTimes.break : customTimes.work) * 60;
    }
    return (isBreak ? modeTimes[mode].break : modeTimes[mode].work) * 60;
  };

  const handleModeChange = (
    newMode: Mode,
    workTime?: number,
    breakTime?: number
  ) => {
    if (newMode === "custom" && workTime && breakTime) {
      setCustomTimes({ work: workTime, break: breakTime });
      setLastWorkMode("custom");
    } else {
      setLastWorkMode(newMode);
    }
    setMode(newMode);
    setIsBreak(false);
    setTimeLeft(getTime(newMode, false));
    setIsActive(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsActive(false);

      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(getTime(mode, true));
        setIsActive(true);
      } else {
        setIsBreak(false);
        setTimeLeft(getTime(mode, false));
        setIsActive(true);
      }
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft, mode, isBreak]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h4" component="div" gutterBottom>
        {isBreak ? "Break Time" : "Work Time"}
      </Typography>

      <Typography variant="h2" component="div">
        {`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsActive(!isActive)}
        sx={{ mt: 2, mb: 2 }}
      >
        {isActive ? "Pause" : "Start"}
      </Button>

      <ModeSelector currentMode={mode} onModeChange={handleModeChange} />
    </div>
  );
}
