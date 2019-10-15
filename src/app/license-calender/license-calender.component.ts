import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-license-calender',
  templateUrl: './license-calender.component.html',
  styleUrls: ['./license-calender.component.css']
})
export class LicenseCalenderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Meeting with status of Doses', start: new Date() }
  ];

  // toggleVisible() {
  //   this.calendarVisible = !this.calendarVisible;
  // }

  // toggleWeekends() {
  //   this.calendarWeekends = !this.calendarWeekends;
  // }

  // gotoPast() {
  //   let calendarApi = this.calendarComponent.getApi();
  //   calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  // }

  handleDateClick(arg) {
    alert('sdfs');
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    }
  }
}
