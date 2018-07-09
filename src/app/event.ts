import { User } from './user/user';
import { Destination } from './destination' ;
import { MeetingPoint } from './meeting-point';

export class Event {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public meetingPoint?: MeetingPoint,
    public owner?: User,
    public destination?: Destination,
    public category?: any,
    public eventDate?: Date,
  ) { }
}

