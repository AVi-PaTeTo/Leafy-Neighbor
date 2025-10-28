export default function StarRating({ rating, maxStars = 5, size = 16 }) {
  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, i) => {
        const starNumber = i + 1;
        // You can use your SVG here
        if (rating >= starNumber) {
          return (
            <FullStarIcon key={i} width={size} height={size} />
          );
        } else if (rating >= starNumber - 0.5) {
          return (
            <HalfStarIcon key={i} width={size} height={size} />
          );
        } else {
          return (
            <EmptyStarIcon key={i} width={size} height={size} />
          );
        }
      })}
    </div>
  );
}

// Example SVG icons—replace with your custom SVG if needed
function FullStarIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="#fbbf24" width={props.width} height={props.height}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21z"/>
    </svg>
  );
}
function EmptyStarIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="#d1d5dc" width={props.width} height={props.height}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21z"/>
      className="bg-gray-300"
    </svg>
  );
}
function HalfStarIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="#fbbf24" width={props.width} height={props.height}>
      <defs>
        <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
          <stop offset="50%" stopColor="#fbbf24"/>
          <stop offset="50%" stopColor="#d1d5dc"/>
        </linearGradient>
      </defs>
      <path fill="url(#half)" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21z"/>
    </svg>
  );
}