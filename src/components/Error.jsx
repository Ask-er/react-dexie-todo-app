import { useRouteError } from "react-router-dom";

export default function Error() {
  let error = useRouteError();
  let title = "An error occured";
  let message = "Something went wrong!";
  if (error.status === 500) {
    message = error.data.message;
  }
  return (
    <div className="flex flex-col items-center justify-center text-text">
      <h1 className="text-4xl text-red-500">{title}</h1>
      <p className="text-xl">{message}</p>
    </div>
  );
}
