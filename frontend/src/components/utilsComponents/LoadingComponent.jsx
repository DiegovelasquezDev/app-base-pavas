import { useEffect, useState } from "react";

export default function LoadingComponent({ loading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 1;
        });
      }, 50);
    }
  }, [loading]);

  return (
    <div className="w-full h-2 mt-3 relative">
      {loading && (
        <div
          className="h-full bg-blue-500"
          style={{
            width: `${progress}%`,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></div>
      )}
    </div>
  );
}
