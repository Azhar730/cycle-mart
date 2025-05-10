import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What types of bicycles do you offer?",
    answer:
      "We offer a wide range of bicycles including mountain bikes, road bikes, hybrid bikes, electric bikes (e-bikes), and kids’ cycles. Whether you're a beginner or a pro rider, we have the right cycle for you.",
  },
  {
    question: "Do you provide home delivery?",
    answer:
      "Yes! We provide fast and secure home delivery across major cities. You can expect your order to arrive within 2–5 business days depending on your location.",
  },
  {
    question: "Can I return or exchange a bicycle?",
    answer:
      "Absolutely. We offer a 7-day return and exchange policy for unused bicycles in original condition. Please ensure the product is not damaged and keep the invoice for easy processing.",
  },
  {
    question: "Do your bicycles come with a warranty?",
    answer:
      "Yes, all our bicycles come with a standard manufacturer’s warranty (usually 1 year). Some premium models may include extended warranties on frame or components.",
  },
  {
    question: "Can I get my bicycle assembled at home?",
    answer:
      "Yes! If you choose 'Home Assembly' at checkout (available in select cities), one of our experts will come and assemble your bike at your doorstep.",
  },
  {
    question: "Do you offer installment payment or EMI options?",
    answer:
      "Yes, we offer EMI (Easy Monthly Installment) options through selected banks and payment partners. You'll see the option at checkout if you're eligible.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <FaChevronDown
                  className={`transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
