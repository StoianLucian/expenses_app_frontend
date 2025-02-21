import { Check } from "@mui/icons-material";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { Alert } from "@mui/material";


export enum MessageSeverity {
    ERROR = "error",
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning"
}

export default function Message({
    message,
    dataTestId,
    severityType
}: {
    message: string | undefined;
    dataTestId: string | undefined;
    severityType: MessageSeverity
}) {

    function renderIcon(type: MessageSeverity) {
        switch (type) {
            case MessageSeverity.ERROR:
                return <ErrorOutline />
            case MessageSeverity.SUCCESS:
                return <Check />
            default:
                return null
        }
    }
    return (
        <Alert data-testid={dataTestId} severity={severityType} icon={renderIcon(severityType)}>{message}</Alert>
    );
}
