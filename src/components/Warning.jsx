import { PiWarningOctagonBold } from "react-icons/pi";
export default function Warning() {
  return (
    <div className="flex flex-col h-screen md:hidden justify-center items-center">
      <PiWarningOctagonBold className="text-9xl text-red-500 self-center" />
      <h1 className="text-center text-3xl w-1/2">
        QuickToDo is a Desktop app. And for now it is not ready to be diplayed
        in this resolution. :/
      </h1>
    </div>
  );
}
