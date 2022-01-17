import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";
import CustomLink from "../../components/CustomLink";
import Container from "../../components/Container";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";
import classes from "./blog.module.css";
import Image from "next/image";
import Link from "next/link";

const MyH1 = (props) => (
  <h1
    className={classes.colorfulheader}
    style={{ color: "#0096ff" }}
    {...props}
  />
);
const MyH2 = (props) => (
  <h2
    className={classes.colorfulheader}
    style={{ color: "#0096ff" }}
    {...props}
  />
);

const components = {
  h1: MyH1,
  h2: MyH2,
  a: CustomLink,
  Head,
};

export default function PostPage({ source, frontMatter }) {
  return (
    <Container>
      <div className={classes.bloglayout__wrapper}>
        <div className={classes.bloglayout}>
          <div className={classes.bloglayout__header}>
            <h1 style={{ color: "#0096ff" }}>{frontMatter.title}</h1>
            {frontMatter.description && (
              <p className={classes.blogpostdesc}>{frontMatter.description}</p>
            )}
            {frontMatter.date && (
              <p className={classes.blogdate}>{frontMatter.date}</p>
            )}
          </div>
          <div className={classes.bloglayout__content}>
            <MDXRemote {...source} components={components} />
          </div>

          <div className={classes.bloglayout__author}>
            <div className={classes.bloglayout__author__socials}>
              <Link href="https://www.linkedin.com/in/mert-u-8248ab135/">
                <a target="_blank" rel="noreferrer">
                  Linkedin
                </a>
              </Link>
              <Link href="https://github.com/Mert18">
                <a target="_blank" rel="noreferrer">
                  Github
                </a>
              </Link>
            </div>
            <div className={classes.bloglayout__author__image}>
              <Image
                src="/images/authors/mert.jpg"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
