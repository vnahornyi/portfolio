import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Hero from 'components/HomePage/Hero';

const Blog = dynamic(() => import('components/HomePage/Blog'));
const Skills = dynamic(() => import('components/HomePage/Skills'));
const About = dynamic(() => import('components/HomePage/About'));
const Contact = dynamic(() => import('components/HomePage/Contact'));

const Home: React.FC = () => {
    return (
        <motion.section
            key='home'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
        >
            <Hero />
            <Blog />
            <Skills />
            <About />
            <Contact />
        </motion.section>
    );
};

export default Home;
