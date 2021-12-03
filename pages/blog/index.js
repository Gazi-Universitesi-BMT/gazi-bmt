import Container from "../../components/Container";
import classes from "./blog.module.css";
import BlogCard from "../../components/BlogCard";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export default function Blog({ posts }) {
  return (
    <Container>
      <div className={classes.blog}>
        <h1 className={classes.blog__head}>Blog</h1>
        <ul className={classes.blog__list}>
          {posts.map((post) => (
            <li key={post.filePath}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export const getStaticProps = () => {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
};
