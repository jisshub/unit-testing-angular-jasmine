import { getCurrencies } from './getCurrencies'

describe('getCurrencies', () =>{
    it('should return supported currenices', () =>{
        const result = getCurrencies();
        expect(result).toContain('AUD');
        expect(result).toContain('CAD');
        expect(result).toContain('INR');
    })
})