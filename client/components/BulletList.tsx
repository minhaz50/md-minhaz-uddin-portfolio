import { toPoints } from "@/lib/points";

export default function BulletList({ text }: { text: string }) {
  const points = toPoints(text);
  if (points.length === 0) return null;

  // a single short statement reads better as a normal paragraph
  if (points.length === 1) {
    return (
      <p className="text-[15px] leading-[1.8] text-paper-dim">{points[0]}</p>
    );
  }

  return (
    <ul className="space-y-3">
      {points.map((point, i) => (
        <li
          key={i}
          className="flex gap-3 text-[15px] leading-[1.75] text-paper-dim"
        >
          <span
            aria-hidden="true"
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
          />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}
