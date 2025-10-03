import { useState } from "react";
import {
  Button,
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

interface ModeSelectorProps {
  currentMode: "focus" | "shortBreak" | "longBreak" | "custom";
  onModeChange: (
    mode: "focus" | "shortBreak" | "longBreak" | "custom",
    customWork?: number,
    customBreak?: number
  ) => void;
}

export default function ModeSelector({
  currentMode,
  onModeChange,
}: ModeSelectorProps) {
  const [customWork, setCustomWork] = useState(25);
  const [customBreak, setCustomBreak] = useState(5);
  const [showCustom, setShowCustom] = useState(false);

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      marginBottom={2}
    >
      <Button
        variant={currentMode === "focus" ? "contained" : "outlined"}
        onClick={() => {
          onModeChange("focus");
          setShowCustom(false);
        }}
      >
        Normal
      </Button>

      <Button
        variant={currentMode === "shortBreak" ? "contained" : "outlined"}
        onClick={() => {
          onModeChange("focus");
          setShowCustom(false);
        }}
      >
        Focus
      </Button>

      <Button
        variant={currentMode === "longBreak" ? "contained" : "outlined"}
        onClick={() => {
          onModeChange("longBreak");
          setShowCustom(false);
        }}
      >
        Quick
      </Button>

      <Button
        variant={currentMode === "custom" ? "contained" : "outlined"}
        onClick={() => setShowCustom(true)}
      >
        Custom
      </Button>

      <Dialog open={showCustom} onClose={() => setShowCustom(false)}>
        <DialogTitle>Custom Mode</DialogTitle>
        <DialogContent>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            marginBottom={2}
            mt={1}
          >
            <TextField
              type="number"
              label="Work (min)"
              value={customWork}
              onChange={(e) => setCustomWork(Number(e.target.value))}
              style={{ width: "100px" }}
            />
            <TextField
              type="number"
              label="Break (min)"
              value={customBreak}
              onChange={(e) => setCustomBreak(Number(e.target.value))}
              style={{ width: "100px" }}
            />
            <Button
              variant="contained"
              onClick={() => {
                onModeChange("custom", customWork, customBreak);
                setShowCustom(false);
              }}
              style={{ height: "40px" }}
            >
              Set
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
