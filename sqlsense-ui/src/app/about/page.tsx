import Layout from "@/components/Layout";
import { Zap, Users, Lightbulb, Code } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Zap,
      title: "Instant Explanations",
      description:
        "Get clear, human-readable explanations of complex SQL queries in seconds.",
    },
    {
      icon: Lightbulb,
      title: "Learn Optimization",
      description:
        "Discover best practices and optimization tips for every query you analyze.",
    },
    {
      icon: Code,
      title: "Understand Structure",
      description:
        "Break down queries clause by clause to master SQL fundamentals.",
    },
    {
      icon: Users,
      title: "For Everyone",
      description:
        "Whether you're a beginner or advanced developer, SQLSense helps you grow.",
    },
  ];

  const techStack = [
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "Neo-Brutalist Design",
    "Space Grotesk Typography",
    "JetBrains Mono",
  ];

  return (
    <Layout currentPage="/about">
      <div className="bg-gray-50">
        {/* Hero */}
        <section className="py-16 md:py-24 lg:py-32 border-b-4 border-black">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                ABOUT SQLSENSE
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                SQLSense is a premium SQL Query Explainer designed for
                developers who demand clarity, craftsmanship, and confidence in
                their database work.
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                We believe SQL should be understandable. Complex queries
                shouldn't be intimidating. Our mission is to transform how
                developers learn, write, and optimize SQL by providing instant,
                intelligent explanations backed by best practices.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24 lg:py-32 border-b-4 border-black">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              WHY SQLSENSE?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="border-4 border-black bg-white p-8"
                    style={{ boxShadow: "8px 8px 0px #111111" }}
                  >
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-lg font-bold uppercase mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 md:py-24 lg:py-32 border-b-4 border-black">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">BUILT WITH</h2>
            <div
              className="border-4 border-black bg-white p-8"
              style={{ boxShadow: "8px 8px 0px #111111" }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-gray-200 p-4 text-center"
                  >
                    <p className="font-bold text-sm uppercase">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Creator */}
        <section className="py-16 md:py-24 lg:py-32 border-b-4 border-black">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">CREATOR</h2>
              <div
                className="border-4 border-black bg-white p-8"
                style={{ boxShadow: "8px 8px 0px #111111" }}
              >
                <h3 className="text-2xl font-bold mb-2">Prosun Banerjee</h3>
                <p className="text-primary font-semibold mb-4">
                  Software Developer
                </p>
                <p className="text-base text-muted-foreground mb-6">
                  Prosun is a passionate software developer who believes in
                  crafting premium, intentional digital experiences. SQLSense
                  represents his commitment to building tools that empower
                  developers to master their craft.
                </p>
                <div className="border-t-2 border-gray-200 pt-6">
                  <p className="font-semibold mb-3">Get in Touch</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <p className="text-muted-foreground">
                      Email:{" "}
                      <a
                        href="mailto:prosunbanerjee8@gmail.com"
                        className="font-semibold text-primary hover:underline cursor-pointer"
                      >
                        prosunbanerjee8@gmail.com
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      GitHub:{" "}
                      <a
                        href="https://github.com/prosu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:underline cursor-pointer"
                      >
                        github.com/prosu
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      LinkedIn:{" "}
                      <a
                        href="https://linkedin.com/in/prosun-banerjee"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:underline cursor-pointer"
                      >
                        linkedin.com/in/prosun-banerjee
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-primary text-white py-16 md:py-24 lg:py-32 border-b-4 border-black">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                OUR MISSION
              </h2>
              <p className="text-lg md:text-xl opacity-90">
                To empower developers worldwide with instant, intelligent SQL
                explanations that transform confusion into confidence and
                complexity into clarity.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                READY TO MASTER SQL?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start your SQL learning journey with SQLSense today.
              </p>
              <button
                className="border-4 border-primary bg-primary text-white font-bold uppercase text-sm px-8 py-3 transition-transform duration-150 ease-out cursor-pointer"
                style={{ boxShadow: "8px 8px 0px #6D28D9" }}
              >
                START EXPLAINING
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
