import Nav from '@/components/Nav';
import Home from '@/components/Home';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Home />
        <Projects />
        <Experience />
        <Skills />
      </main>
      <Contact />
    </>
  );
}
