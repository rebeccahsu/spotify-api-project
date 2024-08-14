import Link from "next/link";

export default function LinkButton({ href, children }) {
  return (
    <Link
      href={href}
      className={styles.link}
    >
      {children}
    </Link>
  );
}