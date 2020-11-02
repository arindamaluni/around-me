export class EventItem {
  
  id:string; title:string; date:Date; venue:string;

  static toEventItem (doc) {
    return {id: doc.id, ...doc.data()}
  }
};

