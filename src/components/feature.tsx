import React, { ReactNode } from "react";

const Feature = () => {
  return (
    <section className="text-gray-600 px-[7%] body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">
          Raw Denim Heirloom Man Braid
          <br className="hidden sm:block" />
          Selfies Wayfarers
        </h1>
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <FeatureItem
            icon={
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            }
            title="Shooting Stars"
            description="Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                banh mi pug VHS try-hard ugh iceland kickstarter tumblr
                live-edge tilde."
          />
          <FeatureItem
            icon={
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            }
            title="The Catalyzer"
            description="Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                banh mi pug VHS try-hard ugh iceland kickstarter tumblr
                live-edge tilde."
          />
          <FeatureItem
            icon={
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            }
            title="Neptune"
            description="Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                banh mi pug VHS try-hard ugh iceland kickstarter tumblr
                live-edge tilde."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => {
  return (
    <div className="p-4 flex">
      <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-grow pl-6">
        <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
          {title}
        </h2>
        <p className="leading-relaxed text-base">{description}</p>
        <a className="mt-3 text-indigo-500 inline-flex items-center">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Feature;
