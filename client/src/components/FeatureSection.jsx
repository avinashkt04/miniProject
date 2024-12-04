import { HoverEffect } from "./index";

function FeaturesSection() {
  const featuredWebinars = [
    {
      title: "Accurate Diagnosis",
      description:
        "MediBot uses advanced AI algorithms to analyze your symptoms and provide accurate preliminary diagnoses. The system is trained on extensive medical data to ensure reliable and relevant health suggestions.",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Designed with simplicity and ease of use in mind, MediBot's interface allows users to quickly enter their symptoms and receive results. The intuitive design ensures a smooth and hassle-free experience for everyone.",
    },
    {
      title: "Personalized Health Insights",
      description:
        "MediBot offers personalized health insights based on your symptoms and medical history. By understanding your unique health profile, MediBot can provide tailored advice and recommendations.",
    },
    {
      title: "Data Privacy and Security",
      description:
        "Your data privacy is our top priority. MediBot employs robust security measures to ensure that all user data is encrypted and securely stored. We are committed to protecting your personal information.",
    },
    {
      title: "Continuous Learning and Improvement",
      description:
        "Our AI model continuously learns and improves from new data, ensuring that the diagnoses and recommendations provided are up-to-date with the latest medical knowledge and practices.",
    },
    {
      title: "Accessible Anytime, Anywhere",
      description:
        "MediBot is a web-based application, making it accessible from any device with an internet connection. Whether you're at home or on the go, MediBot is always available to assist with your health concerns.",
    },
  ];

  return (
    <div className="p-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className=" pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0 text-teal-600">
            Key Features
          </h2>
          <p className="leading-7 [&:not(:first-child)]:my-2 text-2xl">
            Transform Your Health Experience
          </p>
        </div>

        <div className="">
          <HoverEffect
            items={featuredWebinars.map((webinar) => ({
              title: webinar.title,
              description: webinar.description,
            }))}
          />
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
