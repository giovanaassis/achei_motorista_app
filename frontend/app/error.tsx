"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <div className="flex justify-center items-center flex-col mx-auto mt-30 w-[600px] border-2 border-red bg-[#b6696956] rounded-2xl gap-5 p-5">
      <h1 className="text-8xl">Oops!</h1>
      <h2 className="text-2xl">Algo deu errado.</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Tente novamente
      </button>
    </div>
  );
}
