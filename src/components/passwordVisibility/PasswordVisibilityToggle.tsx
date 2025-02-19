import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { TEST_ID } from "./__test__/testIds";

export default function PasswordVisibilityToggle({
  visibility,
  visibilityHandler,
}: {
  visibility: boolean;
  visibilityHandler: () => void;
}) {
  return (
    <InputAdornment position="end">
      <IconButton
        onClick={visibilityHandler}
        data-testid={TEST_ID.VISIBILITY_BUTTON}
      >
        {visibility ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
}
