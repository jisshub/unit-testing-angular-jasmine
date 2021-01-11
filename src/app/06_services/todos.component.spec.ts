import { Observable } from 'rxjs/observable';
import { TodoService } from './todo.service';
import { TodosComponent } from './todos.component'
import 'rxjs/add/observable/from';

describe('TodosComponent', () => {
    let todosComp: TodosComponent;
    let todoService: TodoService;

    beforeEach(()=>{
        todoService = new TodoService(null);
        todosComp = new TodosComponent(todoService);

    });
    it('Should set todos property with items returned from service', ()=>{
        let todosArray = [1, 2, 3] 
        spyOn(todoService, 'getTodos').and.callFake(() =>{
            return Observable.from([todosArray]);
        });

        // Act
        todosComp.ngOnInit();

        // Assert
        expect(todosComp.todos).toBe(todosArray);

    })

})
