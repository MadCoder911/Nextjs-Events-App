import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import {
  filterById,
  fetchData,
  filterFeatured,
} from "../../helpers/data-fetching";
import Head from "next/head";
const EventDetailPage = (props) => {
  const event = props.event;

  if (!event) {
    return <p>No event found</p>;
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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
    </>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventid;
  const event = await filterById(eventId);
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await filterFeatured();

  const paths = events.map((e) => ({ params: { eventid: e.id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};
export default EventDetailPage;
