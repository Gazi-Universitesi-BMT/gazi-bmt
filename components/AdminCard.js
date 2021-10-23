import classes from "./styles/admincard.module.css";
import Image from "next/image";

export default function AdminCard({ admin }) {
  return (
    <li className={classes.admincard}>
      <div className={classes.admincard__img}>
        <Image
          layout="fill"
          objectFit="cover"
          src={`/images/admins/${admin.image}.png`}
        />
      </div>
      <div className={classes.admincard__info}>
        <h2>{admin.name}</h2>
        <a href={admin.linkedin} rel="noreferrer" target="_blank">
          Linkedin
        </a>
        <p>{admin.mail}</p>
      </div>
    </li>
  );
}
