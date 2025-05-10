import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What types of bicycles does Cycle Mart offer?",
    answer:
      "Cycle Mart offers mountain bikes, road bikes, electric bikes, kids' bikes, and more — for beginners to pros!",
  },
  {
    question: "Do you deliver bicycles outside of Dhaka?",
    answer:
      "Yes! We deliver all over Bangladesh. Delivery charges vary based on your location.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "Returns are accepted within 7 days if the bike is unused and in original condition. Refunds are processed after inspection.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Track your order from your Cycle Mart dashboard or via the tracking link emailed to you after shipping.",
  },
  {
    question: "Do your bikes come with a warranty?",
    answer:
      "Yes. All bikes come with a 1-year frame warranty and a 6-month parts warranty.",
  },
  {
    question: "Can I get my bike assembled on delivery?",
    answer:
      "Absolutely! Free professional bike assembly is available for Dhaka city customers.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="min-h-screen mt-20 py-20 px-4 md:px-16 bg-gray-50 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-primary text-center mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Find answers to common questions about Cycle Mart bikes and services.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white shadow rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center font-medium text-lg hover:bg-gray-100 transition"
              >
                <span>{faq.question}</span>
                <span>{activeIndex === index ? "−" : "+"}</span>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4 text-gray-600 text-sm">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Faq;
