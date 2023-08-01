import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/data-fetching";
import EventList from "../../components/events/EventList";
import Button from "../../components/ui/Button";

const FilteredEventsPage = (props) => {
  const filteredEvents = props.events;
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <div className="center">
          <Button link={"/events"}>All Events</Button>
          <p>No events found ....😞</p>
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="center">
        <Button link={"/events"}>All Events</Button>
      </div>
      <EventList items={filteredEvents} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const numYear = +params.slug[0];
  const numMonth = +params.slug[1];
  if (
    isNaN(numMonth) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      notFound: true,
      // redirect: {
      //   destination: "/error",
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      events: filteredEvents,
    },
  };
};

export default FilteredEventsPage;
