import { Request, Response, NextFunction } from 'express';
import { REQUEST_INPUT_GENERAL_VALIDATION_ERROR_MESSAGE } from '../utils/constants';

export const deleteTodoValidator = (req: Request, res: Response, next: NextFunction) => {
    // Validate input
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: REQUEST_INPUT_GENERAL_VALIDATION_ERROR_MESSAGE });
    }

    const { userId } = req.body;

    // Ensure the userId is passed until we have auth in action,
    // then the user will be normally accessible from req object
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    // Validate data type
    if (typeof userId !== 'string') {
        return res.status(400).json({ error: `userId must be of type string!` });
    }

    // If all checks pass, proceed to the next middleware or route handler
    next();
};
