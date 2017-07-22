import React, { PureComponent } from "react";
// import withForm from "./withForm";

//  https://www.robinwieruch.de/gentle-introduction-higher-order-components/

/// FORM EXAMPLE ///

// const Form = ({ handleChange, handleSubmit }) =>
//   <form onChange={handleChange} onSubmit={handleSubmit}>
//     <label htmlFor="name">Name</label>
//     <input type="text" name="name" />
//     <br />
//     <label htmlFor="email">Email</label>
//     <input type="email" name="email" />
//     <br />
//     <label htmlFor="phone">Phone</label>
//     <input type="number" name="phone" />
//     <br />
//     <label htmlFor="address">Address</label>
//     <input type="text" name="address" />
//     <br />
//     <button type="submit"> Submit</button>
//   </form>;

// const EnhancedForm = withForm({
//   url: "/",
//   headers: { random: "random" },
//   defaultValues: { name: "Hello" }
// })(Form);

/// TODOS Example ///

const TodoList = ({ todos }) => {
  if (!todos) return null;
  return (
    <div>
      {todos.map(todo =>
        <div key={todo.id}>
          {todo.title}
        </div>
      )}
    </div>
  );
};

class App extends PureComponent {
  state = {};

  async componentDidMount() {
    const todos = await fetch(
      `https://jsonplaceholder.typicode.com/todos`
    ).then(r => r.json());

    this.setState({ todos });
  }
  render() {
    return (
      <div>
        {/* <h1> SIMPLE FORM </h1>
        <EnhancedForm /> */}

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
