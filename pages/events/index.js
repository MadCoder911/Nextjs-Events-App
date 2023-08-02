import { getAllEvents } from "../../dummy-data";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/events-search";
import { fetchData } from "../../helpers/data-fetching";
import Head from "next/head";
const AllEventsPage = (props) => {
  const events = props.events;
  const router = useRouter();
  // Page Change
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find great events that allow you to evolve"
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await fetchData();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
