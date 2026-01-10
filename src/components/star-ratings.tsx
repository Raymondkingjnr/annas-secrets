type StarRatingProps = {
  rating: number; // current rating (0–5)
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: number;
};

export default function StarRating({
  rating,
  onChange,
  readOnly = false,
  size = 12,
}: StarRatingProps) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => !readOnly && onChange?.(star)}
          style={{
            cursor: readOnly ? "default" : "pointer",
            fontSize: size,
            color: star <= rating ? "#8f540b" : "#D1D5DB",
            userSelect: "none",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
