// Fetch data from firebase
export const fetchData = async () => {
  const res = await fetch(
    "https://test-project-228e5-default-rtdb.firebaseio.com/events.json"
  );
  const raw = await res.json();
  const events = [];
  for (const key in raw) {
    events.push({
      id: key,
      ...raw[key],
    });
  }

  return events;
};

//Filter Featured Events
export const filterFeatured = async () => {
  const events = await fetchData();

  return events.filter((e) => e.isFeatured);
};

//Filter Events By Id
export const filterById = async (id) => {
  const events = await fetchData();
  return events.find((e) => e.id === id);
};

//Filter by search
export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;
  const events = await fetchData();
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
