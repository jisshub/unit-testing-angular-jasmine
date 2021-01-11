import { ScoreComponent } from './score.component'

describe('ScoreComponent', () => {
    let score: ScoreComponent;

    beforeEach(()=>{
        score = new ScoreComponent();
    });

    it('Should raise scoreChanged event on gainScore', ()=>{
        let totalRuns = null;
        score.scoreChanged.subscribe((ts:any) =>{
            totalRuns = ts;
        });
        score.gainScore();

        expect(totalRuns).not.toBe(null);
    });
});
