import PrivateLayout from "@/components/PrivateLayout/privateLayout";

export default function Home() {
  return (
    <PrivateLayout>
      <main className="flex w-full flex-col items-center justify-between p-24">
        <div>
          <h1 className="text-black text-4xl">Some news about salumi</h1>
        </div>
      </main>
    </PrivateLayout>
  );
}
