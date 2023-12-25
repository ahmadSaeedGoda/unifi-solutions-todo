import { Todo } from '../models/todo';

export const formatTodoResponse = (todo: Todo) => {
    return {
        id: todo._id,
        title: todo.title,
        description: todo.description,
        isCompleted: todo.isCompleted,
    };
};
