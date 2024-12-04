// import Link from "next/link"
import { AssistantSection, HamburgerMenu, Sidebar } from "@/components";

function Assistant() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <HamburgerMenu />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
          <div className="flex items-center">
            <div>
              <h1 className="text-lg font-semibold md:text-2xl text-teal-600">
                Symptom Checker Assistant
              </h1>
              <p className="leading-7 [&:not(:first-child)]:my-2 max-w-2xl">
                Select at least three and up to six symptoms to get potential
                diagnoses.
              </p>
            </div>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 ">
              <h3 className="text-2xl font-bold tracking-tight px-3">
                <AssistantSection />
              </h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Assistant;
