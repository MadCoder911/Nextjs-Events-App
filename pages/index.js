import EventList from "../components/events/EventList";
import { filterFeatured } from "../helpers/data-fetching";
const Home = (props) => {
  return (
    <div>
      <EventList items={props.featuredEvents} />
    </div>
  );
};
export async function getStaticProps() {
  const featuredEvents = await filterFeatured();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 600,
  };
}
export default Home;
