import styles from "./BlogContent.module.css";

export function BlogContent({ html }: { html: string }) {
  if (!html) return null;

  return (
    <div
      className={styles.article}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
