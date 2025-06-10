"use client";
import Link from "next/link";
import Image from "next/image";
import { PublicLayout } from "../components/PublicLayout/publicLayout";

export default function LandingPage() {
  return (
    <PublicLayout>
      <div className="p-4 bg-wetSand">
        {/* Hero Section */}
        <main className="flex flex-col min-h-[80vh] border rounded-3xl bg-eggshell shadow-2xl mb-4">
          <div className="flex h-fit px-48 py-16 justify-between items-center">
            <div className="w-1/2 text-black flex flex-col justify-center space-y-12">
              <h1 className="text-7xl font-serif leading-tight">
                Track Your Salumi Production
              </h1>
              <h3 className="text-2xl text-justify text-black">
                Easily track and manage your salumi batches from start to finish
                with our intuitive tracking application.
              </h3>
              <div className="w-full flex justify-start">
                <Link href="/register">
                  <button className="bg-wetSand py-4 px-8 text-white text-xl rounded-xl shadow-md hover:bg-eggshell hover:text-wetSand hover:border-solid hover:border-wetSand hover:border-2 transition-all">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-1/2 flex justify-end">
              <Image
                src={"/salumeSelection.png"}
                alt="salumi selection"
                width={400}
                height={400}
              />
            </div>
          </div>
          {/* <div className="flex justify-center bg-eggshell">
            <button
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-wetSand text-4xl flex hover:opacity-70"
            >
              Learn How It Works ↓
            </button>
          </div> */}
        </main>

        {/* Features Section */}
        <section id="how-it-works" className="py-24 px-32 space-y-20">
          <h2 className="text-5xl font-serif text-center text-eggshell">
            Why Salumi Tracker?
          </h2>
          <div className="grid grid-cols-3 gap-16 text-center">
            <div>
              <Image
                width={300}
                height={300}
                src="./batch.png"
                alt="Batch icon"
                className="mx-auto mb-6 shadow-xl rounded-xl"
              />
              <h3 className="text-2xl font-semibold">Batch Tracking</h3>
              <p className="mt-4">
                Monitor weight, start/end dates, and curing status with visual
                meters.
              </p>
            </div>
            <div>
              <Image
                width={300}
                height={300}
                src="./timer.png"
                alt="Timer icon"
                className="mx-auto mb-6 shadow-xl rounded-xl"
              />
              <h3 className="text-2xl font-semibold">Curing Timers</h3>
              <p className="mt-4">
                Stay on top of flips, checks, and estimated readiness.
              </p>
            </div>
            <div>
              <Image
                width={300}
                height={300}
                src="./metrics.png"
                alt="Chart icon"
                className="mx-auto mb-6 shadow-xl rounded-xl"
              />
              <h3 className="text-2xl font-semibold">Detailed Metrics</h3>
              <p className="mt-4">
                Visualize aging time, yield, and moisture loss trends over time.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-eggshell py-24 px-32 border rounded-3xl shadow-2xl mb-4">
          <h2 className="text-5xl font-serif text-center text-wetSand mb-20">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center text-stone-800">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-6 text-wetSand">
              <Image
                src={"/createBatch.png"}
                alt="Create Batch"
                width={200}
                height={200}
                className="rounded-md shadow-sm"
              />
              <h3 className="text-2xl font-bold font-serif">
                1. Create a Batch
              </h3>
              <p className="text-lg">
                Choose your salumi type and log initial weight and curing start
                date.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-6 text-wetSand">
              <Image
                src={"/trackProgress.png"}
                alt="Track Progress"
                width={200}
                height={200}
                className="rounded-md shadow-sm"
              />
              <h3 className="text-2xl font-bold font-serif">
                2. Track the Process
              </h3>
              <p className="text-lg">
                Monitor curing, weight loss, and milestones using intuitive
                dashboards.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-6 text-wetSand">
              <Image
                src={"/getNotified.png"}
                alt="Get Notified"
                width={200}
                height={200}
                className="rounded-md shadow-sm"
              />
              <h3 className="text-2xl font-bold font-serif">3. Get Notified</h3>
              <p className="text-lg">
                Receive timely updates on when to flip, check, or harvest your
                batch.
              </p>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="text-white py-24 px-32 text-center">
          <h2 className="text-4xl font-serif mb-8">
            Ready to Craft Perfect Salumi?
          </h2>
          <Link href="/register">
            <button className="bg-eggshell text-wetSand font-bold text-xl px-10 py-4 rounded-xl shadow-md hover:bg-wetSand hover:text-eggshell hover:border-solid hover:border-eggshell hover:border-2 transition-all">
              Join Now
            </button>
          </Link>
        </section>
      </div>
    </PublicLayout>
  );
}
