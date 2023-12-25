import { Request, Response, NextFunction } from 'express';
import { REQUEST_INPUT_GENERAL_VALIDATION_ERROR_MESSAGE } from '../utils/constants';

export const updateTodoValidator = (req: Request, res: Response, next: NextFunction) => {
    // Validate input
    const { id } = req.params;
    if (!id || !req.body) {
        return res.status(400).json({ error: REQUEST_INPUT_GENERAL_VALIDATION_ERROR_MESSAGE });
    }

    const { title, description, isCompleted, userId } = req.body;

    // Ensure the userId cannot be updated
    if (userId) {
        return res.status(403).json({ error: 'Updating userId is not allowed' });
    }

    const trimmedTitle = title?.trim() ?? ''
    const trimmedDescription = description?.trim() ?? ''

    if (!trimmedTitle && !trimmedDescription && isCompleted === undefined) {
        return res.status(400).json({ error: 'At least one field is required for update' });
    }

    // Validate data types
    const generalMessage = 'Invalid data type for one or more properties, ';

    if (trimmedTitle && typeof title !== 'string') {
        return res.status(400).json({ error: `${generalMessage}title must be of type string!` });
    }

    if (trimmedDescription && typeof description !== 'string') {
        return res.status(400).json({ error: `${generalMessage}description must be of type string!` });
    }

    if (isCompleted !== undefined && typeof isCompleted !== 'boolean') {
        return res.status(400).json({ error: `${generalMessage}isCompleted property must be of type boolean!` });
    }

    // If all checks pass, proceed to the next middleware or route handler
    next();
};
