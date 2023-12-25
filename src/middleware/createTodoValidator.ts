import { Request, Response, NextFunction } from 'express';
import { REQUEST_INPUT_GENERAL_VALIDATION_ERROR_MESSAGE } from '../utils/constants';

export const createTodoValidator = (req: Request, res: Response, next: NextFunction) => {
    // Validate input
    if (!req.body) {
        return res.status(400).json({ error: REQUEST_INPUT_GENERAL_VALIDATION_ERROR_MESSAGE });
    }

    const { title, description, isCompleted, userId } = req.body;

    // Check if the required fields are present
    if (!title || !description || !userId) {
        return res.status(400).json({ error: 'Title, Description, and userId are required' });
    }

    // Validate data types
    const generalMessage = 'Invalid data type for one or more properties, ';

    if (typeof title !== 'string') {
        return res.status(400).json({ error: `${generalMessage}title must be of type string!` });
    }

    if (typeof description !== 'string') {
        return res.status(400).json({ error: `${generalMessage}description must be of type string!` });
    }

    if (typeof isCompleted !== 'boolean' && isCompleted !== undefined) {
        return res.status(400).json({ error: `${generalMessage}isCompleted property must be of type boolean!` });
    }

    if (typeof userId !== 'string') {
        return res.status(400).json({ error: `${generalMessage}userId must be of type string!` });
    }

    // If all checks pass, proceed to the next middleware or route handler
    next();
};
