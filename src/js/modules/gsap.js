// Un seul endroit où GSAP est configuré
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true }); // la barre d'adresse mobile ne doit pas relancer tous les calculs
gsap.defaults({ ease: 'expo.out', duration: 1.4 });
gsap.config({ nullTargetWarn: false }); // les modules visent des éléments absents de certaines pages

export { gsap, ScrollTrigger };
