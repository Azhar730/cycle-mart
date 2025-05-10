import Banner from "@/components/Banner";
import FeaturedBicycle from "@/components/FeaturedBicycles";
import BlogsSection from "@/components/Home/BlogsSection";
import CategoriesSection from "@/components/Home/CategoriesSection";
import FaqSection from "@/components/Home/FaqSection";
import NewsletterSection from "@/components/Home/NewsletterSection";
import ServicesSection from "@/components/Home/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedBicycle/>
            <TestimonialsSection/>
            <CategoriesSection/>
            <BlogsSection/>
            <ServicesSection/>
            <FaqSection/>
            <NewsletterSection/>
        </div>
    );
};

export default Home;