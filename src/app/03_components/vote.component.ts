import { EventEmitter } from '@angular/core';

export class VoteComponent{
    totalVotes = 0;
    voteChanges = new EventEmitter();
    upVotes(){
        this.totalVotes++;
        this.voteChanges.emit(this.totalVotes)
    }
}
