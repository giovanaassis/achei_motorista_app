"use client";

function FeedbackMessage({
  isSuccess,
  message,
}: {
  isSuccess: boolean;
  message: string;
}) {
  return (
    <span
      className={`text-2xl border-2 p-2 ${
        isSuccess ? "text-green" : "text-red"
      }`}
    >
      {message}
    </span>
  );
}

export default FeedbackMessage;
