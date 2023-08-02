import Head from "next/head";
import Link from "next/link";
import EventList from "../components/events/EventList";
import { filterFeatured } from "../helpers/data-fetching";
const Home = (props) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find great events that allow you to evolve"
        />
      </Head>
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
