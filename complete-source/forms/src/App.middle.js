import React, { PureComponent } from "react";
import { compose } from "recompose";
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

const withTodosNull = WrappedComponent => props =>
  props.todos ? <WrappedComponent {...props} /> : null;

const withTodosLoading = WrappedComponent => ({ isLoading, ...props }) =>
  isLoading ? <div>Loading...</div> : <WrappedComponent {...props} />;

const withTodosEmpty = WrappedComponent => ({ isEmpty, ...props }) =>
  isEmpty
    ? <div> You do not have any todos</div>
    : <WrappedComponent {...props} />;

const TodoList = ({ todos }) =>
  <div>
    {todos.map(todo =>
      <div key={todo.id}>
        {todo.title}
      </div>
    )}
  </div>;

const withConditionalRendering = compose(
  withTodosEmpty,
  withTodosLoading,
  withTodosNull
);

const EnhancedTodoList = withConditionalRendering(TodoList);

class App extends PureComponent {
  state = {};

  async componentDidMount() {
    this.setState({ isLoading: true });
    const todos = await fetch(
      `https://jsonplaceholder.typicode.com/todos`
    ).then(r => r.json());

    this.setState({ todos, isLoading: false });
  }
  render() {
    return (
      <div>
        {/* <h1> SIMPLE FORM </h1>
        <EnhancedForm /> */}

        <EnhancedTodoList
          isLoading={this.state.isLoading}
          todos={this.state.todos}
          isEmpty={this.state.todos && this.state.todos.length === 0}
        />
      </div>
    );
  }
}

export default App;
