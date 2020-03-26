import React from 'react';
import { ITodo } from '../../api/models/todo.model';

type Props = {
  todo: ITodo;
  deleteHandler: () => void;
};

const Todo = (props: Props) => {
  // const dispatch = useDispatch();
  const { id, title } = props.todo;

  return (
    <div data-id={id}>
      {title}
      <button onClick={props.deleteHandler}>delete</button>
    </div>
  );
};

export default Todo;
