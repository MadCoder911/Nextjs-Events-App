import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";

const EventDetailPage = () => {
  const router = useRouter();
  const event = getEventById(router.query.eventid);

  if (!event) {
    return <p>No event found</p>;
  }
  return (
    <div>
      <h1>Product</h1>
    </div>
  );
};
export default EventDetailPage;
