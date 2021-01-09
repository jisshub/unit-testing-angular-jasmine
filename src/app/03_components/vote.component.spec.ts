import { VoteComponent } from './vote.component'

describe('VoteComponent' , () =>{
    // Set type
    let vote: VoteComponent;

    beforeEach(()=>{
        // initialize the component before each test.
        vote = new VoteComponent();
    });

    it('Vote count should increment on upVote', ()=>{
        vote.upVotes();
  
        expect(vote.totalVotes).toBe(1);
    });
    it('Should raise voteChanged event when up voted', ()=>{
        let totalVotes = null;
        vote.voteChanges.subscribe((tv: any) => totalVotes=tv);
        
        vote.upVotes();

        expect(totalVotes).not.toBe(null);
    })
});