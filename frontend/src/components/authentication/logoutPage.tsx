import LinkButton from "../generic/button/linkButton";

export default function LogoutPage() {
  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center h-screen w-screen">
      <div className="bg-white bg-opacity-90 rounded-lg text-center">
        <div className="p-8 space-y-4">
          <h1 className="text-black text-2xl pb-12 font-bold">
            You have been logged out!
          </h1>
          <LinkButton
            text="Log back in"
            href="/login"
            width="fit"
            height="h-12"
          />
        </div>
      </div>
    </div>
  );
}
