import Eventitem from "./Eventitem";
import styles from "./event-list.module.css";
const EventList = (props) => {
  const { items } = props;

  return (
    <ul className={styles.list}>
      {items.map((item) => {
        return (
          <Eventitem
            key={item.id}
            id={item.id}
            title={item.title}
            location={item.location}
            date={item.date}
            image={item.image}
          />
        );
      })}
    </ul>
  );
};
export default EventList;
