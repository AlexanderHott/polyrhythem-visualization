import { Circle, Gradient, Line, makeScene2D, Rect } from "@motion-canvas/2d";
import {
  all,
  createRef,
  loop,
  Matrix2D,
  range,
  Vector2,
} from "@motion-canvas/core";
import { linear } from "@motion-canvas/core/lib/tweening";

const TIMES = 501 + 30;

const circColors = [
  "#ef4444",
  "#f43f5e",
  "#ec4899",
  "#d946ef",
  "#a855f7",
  "#8b5cf6",
  "#6366f1",
  "#3b82f6",
  "#0ea5e9",
  "#06b6d4",
  "#14b8a6",
  "#10b981",
  "#22c55e",
  "#84cc16",
  "#eab308",
  "#f59e0b",
  "#f97316",
];

const lineColors = [
  "#fca5a5",
  "#fda4af",
  "#f9a8d4",
  "#f0abfc",
  "#d8b4fe",
  "#c4b5fd",
  "#a5b4fc",
  "#93c5fd",
  "#7dd3fc",
  "#67e8f9",
  "#5eead4",
  "#6ee7b7",
  "#86efac",
  "#bef264",
  "#fde047",
  "#fcd34d",
  "#fdba74",
];

export default makeScene2D(function* (view) {
  // Create your animations here

  const rects = range(circColors.length).map(() => createRef<Rect>());
  const circs = range(circColors.length).map(() => createRef<Circle>());
  const pings = range(circColors.length).map(() => createRef<Circle>());

  view.fill("#3b0764");
  view.add(
    <>
      <Line
        stroke="#d8b4fe"
        points={[
          [0, -25],
          [0, -425],
        ]}
        lineWidth={4}
      />
      {circColors.map((_, i) => (
        <Circle stroke={lineColors[i]} lineWidth={2} size={850 - 50 * i} />
      ))}
      {rects.map((rect, i) => (
        <Rect ref={rect} size={100} position={[0, 0]}>
          <Circle
            ref={circs[i]}
            size={20}
            fill={circColors[i]}
            position={[0, -425 + i * 25]}
          />
        </Rect>
      ))}

      {pings.map((ping, i) => (
        <Circle
          ref={ping}
          fill={lineColors[i]}
          size={30}
          position={[0, -425 + i * 25]}
        />
      ))}
    </>,
  );

  yield* all(
    ...[
      ...rects.map((rect, i) =>
        rect().rotation(TIMES * 360, TIMES * (1.0 + 0.002 * i), linear),
      ),
      ...pings.map((ping, i) => {
        let animation = ping()
          .fill("#00000000", 1 + 0.002 * i, linear)
          .to(lineColors[i], 0, linear);
        for (let j = 0; j < TIMES; j++) {
          animation = animation
            .to("#00000000", 1 + 0.002 * i, linear)
            .to(lineColors[i], 0, linear);
        }
        return animation;
      }),
    ],
    // rect().rotation(TIMES * 360, TIMES * 1.0, linear),
    // rect2().rotation(TIMES * 360, TIMES * 1.002, linear),
  );
});
