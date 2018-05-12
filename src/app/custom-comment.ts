import { User } from './user/user';
import { Destination } from './destination';
import { Event } from './event';

export class CustomComment {
  constructor(
    public id?: Number,
    public date?: Date,
    public text?: String,
    public user_id?: User,
    public destination_id?: Destination,
    public event_id?: Event
  ) { }
}
