import { Check } from "@mui/icons-material";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { Alert, Icon } from "@mui/material";
import { errorId } from "./utils/utils";

export enum MessageSeverity {
    ERROR = "error",
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning"
}

export default function Message({
    message,
    severityType
}: {
    message: string;
    dataTestId?: string | undefined;
    severityType: MessageSeverity
}) {

    function renderIcon(type: MessageSeverity) {
        switch (type) {
            case MessageSeverity.ERROR:
                return <ErrorOutline />
            case MessageSeverity.SUCCESS:
                return <Check />
            default:
                return <Icon />
        }
    }
    return (
        <Alert data-testid={errorId} severity={severityType} icon={renderIcon(severityType)}>{message}</Alert>
    );
}
