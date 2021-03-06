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

const withCondition = (
  condition,
  OtherComponent = () => null
) => WrappedComponent => props =>
  condition(props) ? <OtherComponent /> : <WrappedComponent {...props} />;

const TodoList = ({ todos }) =>
  <div>
    {todos.map(todo =>
      <div key={todo.id}>
        {todo.title}
      </div>
    )}
  </div>;

const withConditionalRendering = compose(
  // first it loads
  withCondition(
    props => {
      console.log(props.isLoading);
      return props.isLoading;
    },
    () => <div> Loading... </div>
  ),
  // it would be null till it loads
  withCondition(props => props.todos === undefined),
  // it could be empty
  withCondition(
    props => props.todos.length === 0,
    () => <div>You have no Todos</div>
  )
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
        />
      </div>
    );
  }
}

export default App;
