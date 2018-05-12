
export class Messages {
  constructor(
    public id?: Number,
    public sender?: Number,
    public receiver?: Number,
    public date?: Date,
    public content?: String,
    public seen?: Boolean,
  ) { }
}

