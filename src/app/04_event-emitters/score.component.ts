import { EventEmitter } from '@angular/core';

export class ScoreComponent{
    totalRuns= 100;
    scoreChanged = new EventEmitter();
    gainScore(){
        this.totalRuns++;
        this.scoreChanged.emit(this.totalRuns);
    }
}