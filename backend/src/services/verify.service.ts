import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../lib/sendResponse";
import prisma from "../prisma";

class verifyService {
    public static async verify(req: Request, res: Response) {
        try {
            const { uid } = req.body;

            if (!uid) {
                return sendErrorResponse(res, "MISSING_PARAMETERS", {
                    message: "Invalid Request",
                });
            }

            const user = await prisma.user.findUnique({
                where: { id: uid },
            });

            if (user) {
                return sendSuccessResponse(res, "OK", {
                    message: "UID is valid",
                    data: {
                        username: user.userName,
                    },
                });
            }

            return sendErrorResponse(res, "NOT_FOUND", {
                message: "UID is not found",
            });
        } catch (error) {
            console.log(error);

            return sendErrorResponse(res, "INTERNAL_SERVER_ERROR", {
                message: "An error occurred while verifying UID",
            });
        }
    }
}

export default verifyService;
