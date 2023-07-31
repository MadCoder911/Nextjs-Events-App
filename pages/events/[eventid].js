import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { filterById, fetchData } from "../../helpers/data-fetching";
const EventDetailPage = (props) => {
  console.log(props);

  const event = props.event;

  if (!event) {
    return <p>No event found</p>;
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventid;
  const event = await filterById(eventId);
  return {
    props: {
      event: event,
    },
  };
};

export const getStaticPaths = async () => {
  const events = await fetchData();
  const paths = events.map((e) => ({ params: { eventid: e.id } }));
  return {
    paths: paths,
    fallback: false,
  };
};
export default EventDetailPage;
