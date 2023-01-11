import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../Store/Store";
import { AddTodo, removeTodo, Todos, editTodo } from "../Store/TodoSlice";

const Todo = (data) => {
  const [input, setInput] = useState(data?.data?.first_name);
  const [editIndex, setindex] = useState();
  const [isEditMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const ReduxTodoData = useSelector(Todos);
  const addItem = () => {
    dispatch(
      AddTodo({
        TodoName:
          input === data?.data?.first_name ? data?.data?.first_name : input,
      })
    );
    setInput("");
  };

  const deletItem = (index) => {
    dispatch(removeTodo(index));
  };

  const setEditmodebtn = (index) => {
    setEditMode(true);
    setInput(ReduxTodoData[index]?.TodoName);
    setindex(index);
  };

  const editItem = () => {
    dispatch(
      editTodo({
        editIndex,
        TodoName: input,
      })
    );
    setEditMode(false);
    setInput("");
  };

  return (
    <>
      {" "}
      <br />
      <input
        placeholder="Enter you todo items"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      {isEditMode ? (
        <button onClick={editItem}>Changes Done</button>
      ) : (
        <button onClick={addItem}> Add TODO </button>
      )}
      <div>
        {ReduxTodoData &&
          ReduxTodoData?.map((item, index) => {
            return (
              <div key={index}>
                <li>
                  {" "}
                  {item?.TodoName}
                  <button
                    onClick={() => {
                      deletItem(index);
                    }}
                  >
                    {" "}
                    Delete Todo{" "}
                  </button>
                  <button
                    onClick={() => {
                      setEditmodebtn(index);
                    }}
                  >
                    {" "}
                    Edit Todo{" "}
                  </button>
                </li>
              </div>
            );
          })}
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const response = await fetch(
      `https://reqres.in/api/users/${Math.floor(Math.random() * 10 + 1)}`
    );

    // const ReduxTodoData = useSelector(Todos);
    // console.log('state-->', ReduxTodoData);
    const {data} = await response.json();
    return {
      props: {data},
    };
  }
);

// `${data.first_name} ${data.last_name}`

export default Todo;
