import classes from "./styles/event.module.css";

export default function Event({ event }) {
  return (
    <li className={classes.event} key={event._id}>
      <div className={classes.event__info}>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p>{event.address}</p>
        <p>{event.date}</p>
      </div>
    </li>
  );
}
