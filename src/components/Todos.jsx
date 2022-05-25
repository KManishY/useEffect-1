import React, { useState } from "react";
import { useEffect } from "react";

const Todos = () => {
      const [newTodo, setNewTodo] = useState("");
      const [todos, setTodos] = useState([]);
      const saveInfo = () => {
            //call api to save this info at backend
            fetch("http://localhost:8080/todos/", {
                  method: "POST",
                  body: JSON.stringify({
                        headers: {
                              "content-type": "application/json",
                        },
                        text: newTodo,
                        isComplete: false,
                  }),
            })
                  .then((r) => r.json())
                  .then((d) => {
                        // console.log(d);
                        setTodos([...todos, d]);
                        setNewTodo("");
                  });
      };

      useEffect(() => {
            fetch("http://localhost:8080/todos/")
                  .then((r) => r.json())
                  .then((d) => {
                        setTodos(d);
                        // console.log(d);
                  });
      }, []);

      return (
            <div>
                  Todos
                  <div>
                        <div>
                              <input
                                    value={newTodo}
                                    onChange={({ target }) =>
                                          setNewTodo(target.value)
                                    }
                              ></input>
                              <button onClick={saveInfo}>+</button>
                        </div>
                        {todos.map((todo) => (
                              <div key={todo.id}>{todo.value}</div>
                        ))}
                  </div>
            </div>
      );
};

export default Todos;
