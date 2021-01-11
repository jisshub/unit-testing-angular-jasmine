## Unit Testing

Unit testing files ends with _.spec.ts_ extension.

V use jasmine as our testing framework.

Use two functions

- _describe()_ to define a group of related test or a suite.

- _it()_ to define a test/spec.

**compute.ts**

```ts
export const compute = (number: number) => {
  if (number < 0) {
    return 0;
  }
  return number + 1;
};
```

**compute.spec.ts**

```ts
import { compute } from "./compute";
describe("compute", () => {
  it("Should return 0 if input is negative", () => {
    const result = compute(-1);
    expect(result).toBe(0);
  });
  it("Should increment the input if it is positive", () => {
    const result = compute(10);
    expect(result).toBe(11);
  });
});
```

---

## Working with arrays and strings.

**greet.ts**

```ts
export function greet(name: string) {
  return `welcome ${name}!`;
}
```

**greet.spec.ts**

```ts
describe("greet", () => {
  it("Should return a string", () => {
    expect(greet("jissmon")).toContain("jissmon");
  });
});
```

- In above test, v just consider about passed value. ie name property. expected value should contain name as 'jissmon'.

### Test on Arrays

**getCurrencies.ts**

```ts
export const getCurrencies = () => {
  return ["INR", "AUD", "CAD"];
};
```

**getCurrencies.spec.ts**

```ts
describe("getCurrencies", () => {
  it("should return supported currenices", () => {
    const result = getCurrencies();
    expect(result).toContain("AUD");
    expect(result).toContain("CAD");
    expect(result).toContain("INR");
  });
});
```

- here expected result should contain the same currencies as it's in array. but result no need to be in correct order.

## Testing components

**vote.component.ts**

```ts
export class VoteComponent {
  totalVotes = 0;
  upVotes() {
    this.totalVotes++;
  }
  downVotes() {
    this.totalVotes--;
  }
}
```

**vote.component.spec.ts**

```ts
describe("VoteComponent", () => {
  // Arrange
  let vote = new VoteComponent();

  it("Vote count should increment on upVote", () => {
    // Act
    vote.upVotes();

    // Assert
    expect(vote.totalVotes).toBe(1);
  });
  it("Vote count should decrement on downVote", () => {
    vote.downVotes();

    expect(vote.totalVotes).toBe(-1);
  });
});
```

### 3A's of Unit test

- Arrange : initializing a component
- Act : calling a method/function in component
- Assert:

when v run an automated test it should in an isolated world.

- so v have to initialize the component before each test,

- **beforeEach()** - exceuted before each test

- **afterEach()** - exceuted after each test

- **beforeAll()** - executed once before all test.

- **afterAll()** - executed once after all test.

**vote.compoenent.spec.ts**

```ts
describe("VoteComponent", () => {
  // Set type
  let vote: VoteComponent;

  beforeEach(() => {
    // initialize the component before each test.
    vote = new VoteComponent();
  });

  it("Vote count should increment on upVote", () => {
    vote.upVotes();

    expect(vote.totalVotes).toBe(1);
  });
  it("Vote count should decrement on downVote", () => {
    vote.downVotes();

    expect(vote.totalVotes).toBe(-1);
  });
});
```

## Working With Forms

**todo-form.component.ts**

```ts
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class TodoFormComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ["", Validators.required],
      email: [""],
    });
  }
}
```

**todo-form.component.spec.ts**

```ts
describe("TodoFormComponent", () => {
  // set type
  let todo: TodoFormComponent;

  beforeEach(() => {
    todo = new TodoFormComponent(new FormBuilder());
  });
  it("Should create a form with 2 controls", () => {
    expect(todo.form.contains("name")).toBeTruthy();
    expect(todo.form.contains("email")).toBeTruthy();
  });
  it("Should make the name control required", () => {
    let control = todo.form.get("name");
    control?.setValue("");
    expect(control?.valid).toBeFalsy();
  });
});
```

## Working with event emitters

**vote.component.ts**

```ts
export class VoteComponent {
  totalVotes = 0;
  voteChanges = new EventEmitter();
  upVotes() {
    this.totalVotes++;
    this.voteChanges.emit(this.totalVotes);
  }
}
```

**vote.component.spec.ts**

```ts
describe("VoteComponent", () => {
  // Set type
  let vote: VoteComponent;

  beforeEach(() => {
    // initialize the component before each test.
    vote = new VoteComponent();
  });

  it("Should raise voteChanged event when up voted", () => {
    let totalVotes = null;
    vote.voteChanges.subscribe((tv: any) => (totalVotes = tv));

    vote.upVotes();

    expect(totalVotes).not.toBe(null);
  });
});
```

## Working with Components that uses Services

calling service on getTodos method which returns an observable, subscribe to the observable and initialize the todos property. so in our unit test, v call ngOnInIt and have to assert the whether todos property is initialized. but v wont use services, since it make calls to the backend and is against the definition of the unit test. because in unit test we wont touch the db, or call backend services.

so in unit test, v give this component a fake services and it won't make backend calls. it just returns a simple observable.

change the implementation of getTodos method. v use a function in jasmine called _spyOn()_. using this, we get control over a method in the class.

getTodos() is a method with no parameters & returns an observable.
so in callFake() v return an observable.

```ts
it("Should set todos property with items returned from service", () => {
  spyOn(todoService, "getTodos").and.callFake(() => {
    return Observable;
  });
});
```

Here, v can create an observable from an array.

```ts
it('Should set todos property with items returned from service', ()=>{
  spyOn(todoService, 'getTodos').and.callFake(() =>{
      return Observable.from([[1,2,3]]);
  })
```

```ts
it("Should set todos property with items returned from service", () => {
  let todosArray = [1, 2, 3];
  spyOn(todoService, "getTodos").and.callFake(() => {
    return Observable.from([todosArray]);
  });

  // Act
  todosComp.ngOnInit();

  // Assert
  expect(todosComp.todos).toBe(todosArray);
});
```

**todos.component.spec.ts**

```ts
import { Observable } from "rxjs/observable";
import { TodoService } from "./todo.service";
import { TodosComponent } from "./todos.component";
import "rxjs/add/observable/from";

describe("TodosComponent", () => {
  let todosComp: TodosComponent;
  let todoService: TodoService;

  beforeEach(() => {
    todoService = new TodoService(null);
    todosComp = new TodosComponent(todoService);
  });
  it("Should set todos property with items returned from service", () => {
    let todosArray = [1, 2, 3];
    spyOn(todoService, "getTodos").and.callFake(() => {
      return Observable.from([todosArray]);
    });

    // Act
    todosComp.ngOnInit();

    // Assert
    expect(todosComp.todos).toBe(todosArray);
  });
});
```

---
