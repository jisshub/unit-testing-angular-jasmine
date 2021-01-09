import { FormBuilder } from '@angular/forms';
import { TodoFormComponent } from './todo-form.component'

describe('TodoFormComponent', () => {
    // set type
    let todo: TodoFormComponent;

    beforeEach(()=>{
        todo = new TodoFormComponent(new FormBuilder);
    })
    it('Should create a form with 2 controls', ()=>{   
        expect(todo.form.contains('name')).toBeTruthy();
        expect(todo.form.contains('email')).toBeTruthy();
    });
    it('Should make the name control required', ()=>{
        let control = todo.form.get('name');
        control?.setValue('')
        expect(control?.valid).toBeFalsy();
    })
})
