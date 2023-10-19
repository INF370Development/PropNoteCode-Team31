declare namespace gapi {
    namespace client {
      namespace calendar {
        interface Event {
          // Define the structure of the Calendar Event object here
          // You may need to add properties based on your use case
          id: string;
          summary: string;
          start: {
            dateTime: string;
          };
          end: {
            dateTime: string;
          };
        }
  
        interface Events {
          result: {
            items: Event[];
          };
        }
  
        function calendarId(parameters: any): void;
        function events: {
          list(parameters: any): void;
        };
      }
    }
  }
  