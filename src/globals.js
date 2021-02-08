export var url_g = {
    url: "http://192.168.1.113:8080/mevent/"  
  } 
  export var mainUrl = {
    url: "http://127.0.0.1:9999"  
  } 
  /* testing */
  const EventEmitter = require('events');
  
  export const MeventEmitter = new EventEmitter();
  
  export var User_g = {
      id : -1,
      name:'-',
      type: 'none',
      valid: false,
      isAdmin: function() { return ((this.type === "admin") && this.valid);},
  }
  
  export const statusImages = [
   { uri: "images/pending.png" },
   { uri: "images/inprogress.png" },
   { uri: "images/complete.png" },
   { uri: "images/cancel.png" },
   { uri: "images/delayed.jpg" },
   ];
   
  export const statusStrings=["Pending", "InProgress","Done","Cancelled","Delayed"];
  
  
//you can also export functions  
export function ImgDoc(id=-1, name="-", type="photo")
{
    this.id = id;
    this.name = name;
    this.type=type;
    this.kk=0;
}