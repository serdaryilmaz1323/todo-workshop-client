import React, { useState, FormEvent, Fragment, useEffect } from 'react';
import { ITodo } from '../../api/models/todo.model';
import Todo from './Todo';
import { HttpService } from '../../api/services/http.service';
import axios from 'axios';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';

type MyState = {
  loading: boolean;
  items: ITodo[];
  currentItem: ITodo;
};

const initialState: MyState = {
  loading: false,
  items: [],
  currentItem: { id: '', title: '' },
};

const TodoContainer = () => {
  const [state, setstate] = useState(initialState);

  useEffect(() => {
    console.log('Component Did Mount');
    axios.get('/todo/list').then(res => {
      const { list, message, token } = res.data;
      console.log('Message : ' + message);
      console.log('Token : ' + token);
      setstate({
        items: list,
        loading: true,
        currentItem: { id: '', title: '' },
      });
    });
    return () => {};
  }, []);

  useEffect(() => {
    console.log('[useEffect] -> itemcount:' + state.items?.length);
    return () => {
      // console.log('useEffect State return');
    };
  }, [state.items]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setstate({
      ...state,
      currentItem: {
        id: state.currentItem?.id ?? '0',
        title: e.currentTarget.value,
      },
    });
  };

  const addItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem = state.currentItem as ITodo;
    // console.log(newItem);

    HttpService.initializeAxios();
    var result = from(
      axios.post<{ token: string; message: string; todo: ITodo }>('/todo', {
        title: newItem.title,
      }),
    ).pipe(
      map(result => {
        const { message } = result.data;
        console.log('WebApi result:' + message);
      }),
      // catchError(err => {
      //   const errorMessage = err.response.data.message || '';
      //   console.log('Error:' + errorMessage);
      // }),
    );

    const items = [...state.items, newItem];
    setstate({ ...state, items: items });

    console.log('result object : ' + result);

    // console.log('itemcount:' + state.items.length);
  };

  const deleteTodo = (id: string) => {
    console.log('Delete todo' + id);
    HttpService.initializeAxios();

    axios
      .get<{ token: string; message: string; id: string }>('/todo/delete/' + id)
      .then(response => {
        const { message } = response.data;
        console.log('WebApi result:' + message);

        const items = [...state.items];
        let newItems = items.filter(item => item.id !== id);

        setstate({
          ...state,
          currentItem: { id: '', title: '' },
          items: newItems,
        });
      });

    // var result = from(
    //   axios.get<{ token: string; message: string; id: string }>(
    //     '/todo/delete/' + id,
    //   ),
    // ).pipe(
    //   map(result => {
    //     const { message } = result.data;
    //     console.log('WebApi result:' + message);

    //     const items = [...state.items];
    //     let newItems = items.filter(item => item.id !== id);

    //     setstate({
    //       ...state,
    //       currentItem: { id: '', title: '' },
    //       items: newItems,
    //     });
    //   }),
    //   // catchError(err => {
    //   //   const errorMessage = err.response.data.message || '';
    //   //   console.log('Error:' + errorMessage);
    //   // }),
    // );

    // console.log('delete result object : ' + result);
  };

  const items = state.items;
  const listitems = items.map(item => {
    return (
      <Todo
        key={item.id}
        todo={item}
        deleteHandler={() => deleteTodo(item.id)}
      />
    );
  });

  return (
    <Fragment>
      {listitems}
      <form id="to-do-form" onSubmit={addItem}>
        <input
          type="text"
          placeholder="Enter todo text"
          value={state.currentItem?.title}
          onChange={handleInput}
        />
        <button type="submit">Add Todo</button>
      </form>
    </Fragment>
  );
};

export default TodoContainer;
