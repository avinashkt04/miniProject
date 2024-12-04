import { MovingBorderContainer } from "./index";

function AboutSection() {
  return (
    <div className="max-w-2xl mx-auto ">
      <div className="text-center my-8">
        <h2 className=" pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0 text-teal-600">
          About MediBot
        </h2>
      </div>
      <MovingBorderContainer
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 text-sm sm:text-lg"
      >
        <p className="leading-7 ">
          Medibot is designed to streamline the process of diagnosing common
          medical conditions based on user-reported symptoms. The user starts by
          selecting their symptoms from a comprehensive list using a
          user-friendly multi-select interface. The system allows the selection
          of up to five symptoms at a time to ensure accurate and manageable
          input. Once the symptoms are selected, the user submits their choices
          through a simple form. Medibot then processes this input using
          advanced machine learning models trained on extensive medical data.
          The bot analyzes the combination of symptoms and provides a list of
          potential medical conditions that match the reported symptoms. It also
          offers recommendations for further actions, such as seeing a
          healthcare provider or seeking immediate medical attention if
          necessary. By leveraging the power of AI and a vast database of
          medical knowledge, Medibot aims to provide users with quick and
          reliable preliminary health assessments, enhancing their ability to
          make informed decisions about their health.
        </p>
      </MovingBorderContainer>
    </div>
  );
}

export default AboutSection;
