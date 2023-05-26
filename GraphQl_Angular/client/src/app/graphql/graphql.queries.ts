import { gql } from 'apollo-angular'

const GET_EVENTS = gql`
  query {
    events {
      id
      name
      description
      eventDate
    }
  }
`;

const ADD_EVENT = gql`
mutation addEvent($name: String!, $description: String!, $eventDate: String!) {
  addEvent(name: $name, description: $description, eventDate: $eventDate) {
    id
    name
    description
    eventDate
  }
}
`;

const DELETE_EVENT = gql`
  mutation deleteEvent($id: Int!) {
    deleteEvent(id: $id) {
      id
      name
    }
  }
  `;

export { GET_EVENTS, ADD_EVENT, DELETE_EVENT }