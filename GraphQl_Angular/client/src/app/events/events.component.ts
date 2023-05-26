import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_EVENT, DELETE_EVENT, GET_EVENTS } from '../graphql/graphql.queries';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})

export class EventsComponent implements OnInit {
  events: any[] = [];  // event list
  error: any;          // error description
  eventForm: FormGroup; // formGroup

  constructor(private apollo: Apollo) {

    //  initialize form group
    this.eventForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      eventDate: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

    // The watchQuery method returns a QueryRef object which has the valueChanges property that is an Observable //

    this.apollo.watchQuery({
      query: GET_EVENTS
    }).valueChanges.subscribe((result: any) => {
      console.log(result)
      this.events = [...result.data?.events];   // events property contains result
      this.error = result.error;
    }
    );
  }



  addEvent() {
    // apollo graphql query to add event
    this.apollo.mutate({
      mutation: ADD_EVENT,
      variables: {
        name: this.eventForm.value.name,
        description: this.eventForm.value.description,
        eventDate: formatDate(this.eventForm.value.eventDate, 'mm/dd/yyyy', "en-US")
      },
      refetchQueries: [{
        query: GET_EVENTS
      }]
    }).subscribe(({ data }: any) => {
      console.log(data)
      const { name, description } = data.addEvent;  // make sure keys are same
      this.clearForm();
      alert(`Event '${name}' with description '${description}' added successfully`)
    }
      , (error) => {
        this.error = error;
      }
    );

  }

  deleteEvent(id: string) {

    if (confirm("Are you sure you want to delete?")) {
      // apollo graphql query to delete event
      this.apollo.mutate({
        mutation: DELETE_EVENT,
        variables: {
          id: id,
        },
        refetchQueries: [{
          query: GET_EVENTS
        }]
      }).subscribe(({ data }: any) => {
        console.log(data)
        const eventName = data.deleteEvent.name;
        this.clearForm();  // clear the form state
        alert(`Event '${eventName}' deleted successfully`)
      }
        , (error) => {
          this.error = error;
        }
      );
    }

  }

  clearForm() {
    this.eventForm.reset()
    this.eventForm.markAsPristine();
    this.eventForm.markAsUntouched();
  }

}