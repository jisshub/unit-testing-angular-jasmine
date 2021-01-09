import { greet } from './greet'

describe('greet', ()=>{
    it('Should return a string', ()=>{
        expect(greet('jissmon')).toContain('jissmon');
    })
});