import { motion } from "framer-motion";
import { FaBicycle, FaShippingFast, FaTools, FaHeadset } from "react-icons/fa";

const services = [
  {
    title: "Wide Range of Bicycles",
    icon: <FaBicycle className="text-4xl text-primary" />,
    description:
      "Discover a vast selection of bicycles for all ages and purposes — from mountain bikes to city commuters, all in one place.",
  },
  {
    title: "Fast Delivery",
    icon: <FaShippingFast className="text-4xl text-primary" />,
    description:
      "We ensure safe and quick delivery of your cycle right to your doorstep with real-time tracking support.",
  },
  {
    title: "Repair & Maintenance",
    icon: <FaTools className="text-4xl text-primary" />,
    description:
      "Get professional repair, maintenance, and assembly services at your convenience through our expert technicians.",
  },
  {
    title: "24/7 Customer Support",
    icon: <FaHeadset className="text-4xl text-primary" />,
    description:
      "Need help? Our dedicated support team is available round the clock to assist you with any queries or issues.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 mt-20 bg-white" id="services">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cycle Mart provides premium services to ensure your biking
            experience is seamless, exciting, and worry-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
