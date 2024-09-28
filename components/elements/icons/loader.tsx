export default function LoaderIcon({
  className = "loading-xs",
}: {
  className?: string;
}) {
  return <span className={`loading loading-spinner ${className}`}></span>;
}
