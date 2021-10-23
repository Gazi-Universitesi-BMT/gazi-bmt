import classes from "./styles/footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <ul className={classes.social}>
        <li>
          <a>
            <Image
              src="/icons/insta.svg"
              alt="Instagram logo"
              width="35px"
              height="35px"
            />
          </a>
        </li>
        <li>
          <a>
            <Image
              src="/icons/twitter.svg"
              alt="Twitter logo"
              width="35px"
              height="35px"
            />
          </a>
        </li>

        <li>
          <a>
            <Image
              src="/icons/discord.svg"
              alt="Discord logo"
              width="35px"
              height="35px"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}
