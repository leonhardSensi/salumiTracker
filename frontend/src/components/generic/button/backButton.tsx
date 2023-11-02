import Link from "next/link";

export default function BackButton() {
  return (
    <Link className="w-12" href="/recipes">
      <svg
        className="h-12"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g>
          <path d="M8 12l6-6v12z" fill="#111827" fillOpacity={0.9} />
        </g>
      </svg>
    </Link>
  );
}
