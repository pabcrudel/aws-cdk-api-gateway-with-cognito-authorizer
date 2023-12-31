import { ResendConfirmationCodeCommandInput, ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider";
import { RequestFunction } from "../types";
import { ApiSuccessResponse, ApiErrorResponse } from "../utils/api";
import { bodyParser, clientId, cognitoClient, SuccessfulCodeSubmission } from "../utils/auth";

export const handler: RequestFunction = async (event) => {
    try {
        const { username } = bodyParser(event.body);

        const input: ResendConfirmationCodeCommandInput = {
            ClientId: clientId,
            Username: username,
        };

        const response = await cognitoClient.send(new ResendConfirmationCodeCommand(input));

        return new ApiSuccessResponse(new SuccessfulCodeSubmission(response.CodeDeliveryDetails));
    }
    catch (error) {
        return new ApiErrorResponse(error);
    };
};