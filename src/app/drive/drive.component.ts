import { Component, OnInit } from '@angular/core';

enum Direction {
  Left = 'left',
  Right = 'right'
}

enum Signal {
  Red = 'red',
  Green = 'green'
}

enum StopSignal {
  Hide = 'hidden',
  Show = 'visible'
}

enum LogMessage {
  StopMessage = 'Car stopped on red signal',
  DrivingMessage = 'Car driving on green signal'
}

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})

export class DriveComponent implements OnInit {
  carPosition = 0;
  driveStepDistance = 50;
  signalSwitchIntervalInSeconds = 1;
  carMoveIntervalInMilliseconds = 100;
  signalPositionInPixel = 500;
  maximumCarDistanceInPixel = 1000;
  direction = Direction.Right;
  signalColor = Signal.Green;
  stopSignalColor = StopSignal.Hide;
  log = '';

  ngOnInit() {
    setInterval(() => {
      this.signalColor = this.signalColor == Signal.Red ? Signal.Green : Signal.Red;
    }, this.signalSwitchIntervalInSeconds * 1000);
    setInterval(() => {
      this.moveCar();
    }, this.carMoveIntervalInMilliseconds);
  }


  moveCar() {
    // Driving to left
    if (this.direction == Direction.Left) {
      if (this.carPosition == 0) {
        this.direction = Direction.Right;
        return;
      } else if (this.carPosition == this.signalPositionInPixel) {
        this.moveLog(); 
      } else {
        this.carPosition -= this.driveStepDistance;
      }
    } else {
    // Driving to right
      if (this.carPosition == this.maximumCarDistanceInPixel) {
        this.direction = Direction.Left;
        // Reached the right end of the road and back to start
        this.carPosition = 0
        return;
      } else if (this.carPosition == this.signalPositionInPixel-100) {
        this.moveLog();
      } else {
        this.carPosition += this.driveStepDistance;
      }
    }
  }

  // change drive direction
  setDirection(direction: any) {
    if(this.direction != direction){
      this.direction = direction;
    }
  }

  // log
  moveLog(){
    if(this.signalColor == Signal.Red){
      this.stopSignalColor = StopSignal.Show;
      this.log = LogMessage.StopMessage;
      return;
    }else{
      this.stopSignalColor = StopSignal.Hide;
      this.log = LogMessage.DrivingMessage;
      this.carPosition += (this.direction == Direction.Right ? this.driveStepDistance : -this.driveStepDistance);
    } 
  }

}