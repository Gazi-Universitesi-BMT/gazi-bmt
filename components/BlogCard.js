import React from "react";
import Link from "next/link";
import classes from "./styles/blogcard.module.css";
import Image from "next/image";

const BlogCard = ({ post }) => {
  return (
    <article className={classes.blogcard}>
      <Link
        as={`/blog/${post.filePath.replace(/\.mdx?$/, "")}`}
        href={`/blog/[slug]`}
      >
        <div className={classes.blogcard__content}>
          <div className={classes.blogcard__content__title}>
            <h2>{post.data.title}</h2>
          </div>
          <div className={classes.blogcard__content__description}>
            <p>{post.data.description}</p>
          </div>
          <div className={classes.blogcard__content__bottom}>
            <p>{post.data.date}</p>
          </div>
        </div>
      </Link>
      <div className={classes.blogcard__content__author}>
        <div className={classes.blogcard__content__author__image}>
          <Image
            src="/images/authors/mert.jpg"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
