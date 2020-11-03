
export class EventItem {
  constructor(id:string, title:string, date:Date, venue:string) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.venue = venue;

  }
  id:string; title:string; date:Date; venue:string;

  static toEventItem (doc) {
    const {date} = doc.data();
    return {id: doc.id, ...doc.data(), ...{date:new Date(date)}}
  }
};

