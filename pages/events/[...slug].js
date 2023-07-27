import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import Button from "../../components/ui/Button";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }
  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];
  if (
    isNaN(numMonth) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <div className="center">
          <Button link={"/events"}>All Events</Button>

          <p>Invalid filters, please stop messing around with my app ! 🤪</p>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
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
export default FilteredEventsPage;
