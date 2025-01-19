import { Response } from "express";
import { ErrorCodes, SuccessCodes } from "../constant";

interface SuccessResponseOptions {
    message?: string;
    data?: unknown;
}

interface ErrorResponseOptions {
    message?: string;
}

/**
@param res - ExpressのResponse
@param successCodeKey - HTTP status Code Key (default: "OK")
@param options - `{ message?: string, data?: unknown }`
**/

export const sendSuccessResponse = (
    res: Response,
    successCodeKey: keyof typeof SuccessCodes = "OK",
    options: SuccessResponseOptions = {}
) => {
    const status = SuccessCodes[successCodeKey];
    const { message, data } = options;

    const response = {
        success: true,
        ...(message && { message }),
        ...(data !== undefined && { body: data }),
    };

    res.status(status).json(response);
};

/**
 * @param res - ExpressのResponse
 * @param statusCodeKey - HTTP status Code Key (default: "INTERNAL_SERVER_ERROR")
 * @param options - `{ message?: string }`
 */

export const sendErrorResponse = (
    res: Response,
    statusCodeKey: keyof typeof ErrorCodes = "INTERNAL_SERVER_ERROR",
    options: ErrorResponseOptions = {}
) => {
    const status = ErrorCodes[statusCodeKey];
    const { message } = options;

    const response = {
        success: false,
        ...(message && { message }),
    };

    res.status(status).json(response);
};
