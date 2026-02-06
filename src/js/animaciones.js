// document.addEventListener("DOMContentLoaded", (event) => {
//     // Registramos ScrollTrigger
//     gsap.registerPlugin(ScrollTrigger);

//     // Activamos MatchMedia para resoluciones mayores a 1024px
//     let mm = gsap.matchMedia();

//     mm.add("(min-width: 1024px)", () => {


//         ScrollTrigger.create({
//             trigger: ".section-impacto",
//             start: "top top", // Se clava EXACTAMENTE al llegar arriba
//             end: "+=2000",    // La duración del "congelamiento"
//             pin: true,        // Aquí ocurre la magia del pin
//             anticipatePin: 1,
//             // markers: true, // Descomenta para ver dónde se clava (marker: 'start')
//         });

//         // Creamos la línea de tiempo vinculada al scroll
//         let tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: ".section-impacto",

//                 // <--- AQUÍ ESTÁ LA CLAVE DE LA ANTICIPACIÓN
//                 start: "top 75%", // Empieza cuando la sección asoma por el 75% de la pantalla

//                 // Cálculo del fin: Distancia desde el 75% hasta arriba + los 2000 del pin
//                 end: "+=2500",
//                 scrub: 1,
//                 // NOTA: No ponemos 'pin: true' aquí porque ya lo hace el de arriba
//             }
//         });
//         // 1. El fondo pasa de Blanco a Azul #0166f2
//         tl.fromTo(".section-impacto",
//             {
//                 backgroundColor: "#FFFFFF"
//             },
//             {
//                 backgroundColor: "#0166f2",
//                 duration: 1, // Ocupará una buena parte del scroll
//                 ease: "none" // 'none' se siente mejor con Pin para cambios de color
//             }
//         );
//         // 2. La tarjeta entra desde la derecha
//         // Nota: Le puse duration 2 para que acompañe todo el cambio de color del fondo
//         tl.from(".card-delegar", {
//             xPercent: 100,
//             autoAlpha: 0,
//             duration: 2,
//             ease: "power2.out"
//         }, "<"); // Arranca junto con el fondo
//         // 3. Textos de la izquierda (Aparecen un poco después para dar ritmo)
//         // Usamos "<+=0.5" para que arranquen cuando el fondo/tarjeta ya van por el 25%
//         tl.from(".section-impacto-content h2, .section-impacto-content hr, .section-impacto-content p, .section-impacto-content li", {
//             y: 30,
//             opacity: 0,
//             duration: 1,
//             stagger: 0.1
//         }, "<");
//         // 4. El texto DENTRO de la tarjeta aparece al final
//         tl.from(".card-delegar > div > *", {
//             y: 30,
//             opacity: 0,
//             duration: 1,
//             stagger: 0.2
//         }, "-=0.5");

//         // 5. SALIDA: Volvemos el fondo a Blanco
//         // Usamos .to porque GSAP ya sabe que actualmente está azul
//         tl.to(".section-impacto", {
//             backgroundColor: "#FFFFFF",
//             duration: 1,
//             ease: "none"
//         });

//         tl.to(".card-delegar > div > *", {
//             y: 30,
//             opacity: 0,
//             duration: 1,
//             stagger: 0.2
//         }, "<");



//         // gsap.from(".section-entendemos", {
//         //     scrollTrigger: {
//         //         trigger: ".section-entendemos", // El gatillo es esta nueva sección
//         //         start: "top 85%", // Arranca cuando el tope de la sección entra al 85% de la pantalla (casi abajo)
//         //         end: "top 35%",   // Termina cuando llega a la mitad
//         //         scrub: 1,         // Vinculado al scroll (borra esta línea si quieres que se reproduzca sola)
//         //         // markers: true  // Úsalo si necesitas ver dónde arranca
//         //     },
//         //     y: 50,          // Se mueve 50px desde abajo hacia su lugar original
//         //     opacity: 0,     // Empieza invisible
//         //     duration: 1.5,    // Duración relativa al scrub
//         //     ease: "power2.out"
//         // });

//         // 1. ANIMACIÓN DE ENTRADA (Fade In + Subida)
//         // IMPORTANTE: En vez de animar ".section-entendemos" completo, animamos sus hijos internos ( > * ).
//         // Esto evita conflictos con el Pin que aplicaremos al contenedor padre.
//         gsap.from(".section-entendemos > *", {
//             scrollTrigger: {
//                 trigger: ".section-entendemos",
//                 start: "top 85%", // Empieza a entrar cuando asoma abajo
//                 end: "top 40%",   // Termina la animación ANTES de que llegue arriba del todo
//                 scrub: 1
//             },
//             y: 50,          // Los elementos suben
//             opacity: 0,     // Aparecen
//             duration: 1.5,
//             stagger: 0.1,   // (Opcional) Un pequeño retraso entre cada elemento interno queda elegante
//             ease: "power2.out"
//         });

//         // 2. EL PIN (La sección se queda fija)
//         ScrollTrigger.create({
//             trigger: ".section-entendemos",
//             start: "top 90px",     // Se activa EXACTAMENTE cuando llega al tope de la pantalla

//             // Aquí defines la duración. 
//             // Si querías 200 pixeles, pon: "+=200"
//             // Si querías el 200% de la altura de la pantalla, pon: "+=200%"
//             end: "+=200%",

//             pin: true,            // ¡Aquí ocurre la magia!
//             pinSpacing: true,     // Empuja la siguiente sección hacia abajo para que no se monte
//             anticipatePin: 1      // Evita parpadeos
//         });

//         ScrollTrigger.create({
//             trigger: ".especialistas",
//             start: "top top", // Se clava justo al tocar el techo
//             end: "+=3000",    // Duración del congelamiento
//             pin: true,
//             anticipatePin: 1,
//             // markers: true // Úsalo si necesitas depurar
//         });

//         // --- 2. LA ANIMACIÓN (ANTICIPADA) ---
//         // Controla la apertura y los elementos internos.
//         let tlSpecs = gsap.timeline({
//             scrollTrigger: {
//                 trigger: ".especialistas",

//                 // <--- ANTICIPACIÓN: 
//                 // Arranca cuando el tope de la sección entra al 80% de la pantalla.
//                 // Es decir, empieza a abrirse ANTES de llegar arriba y clavarse.
//                 start: "top 100%",

//                 // El final debe coincidir aprox con el final del pin (+3000) 
//                 // más la distancia que recorrió antes (ese 20% de pantalla).
//                 end: "+=3500",
//                 scrub: 1,
//             }
//         });

//         // 1. CONTENEDOR SE ABRE (Height 0 -> Auto)
//         // Empezará a crecer mientras el usuario scrollea hacia la sección
//         tlSpecs.from(".especialistas", {
//             height: 0,
//             paddingTop: 0,
//             paddingBottom: 0,
//             duration: 2,
//             ease: "none"
//         });

//         // 2. TÍTULO Y DIVIDER
//         tlSpecs.from(".especialistas h3, .especialistas hr", {
//             y: 30,
//             autoAlpha: 0,
//             duration: 1
//         }, "<+=0.5"); // Arranca cuando el contenedor ya se abrió un poco

//         // 3. LISTA DE ITEMS (Stagger controlado por scroll)
//         tlSpecs.from(".especialistas li", {
//             x: -50,
//             autoAlpha: 0,
//             duration: 1,   // Cuánto tarda cada uno en entrar visualmente
//             stagger: 0.5   // Cuánto espacio de scroll hay entre la aparición de uno y otro
//         }, "-=0.5");       // Se solapa un poco con el título

//         tlSpecs.to({}, { duration: 2 });

//         tlSpecs.to(".especialistas, .especialistas h3, .especialistas hr", {
//             y: 50,          // Se mueven 50px hacia abajo (dirección del scroll)
//             autoAlpha: 0,   // Se desvanecen
//             duration: 1,    // Duración de la fase de salida
//             stagger: 0.1,   // 0.1s de diferencia entre cada elemento
//             ease: "power1.in" // 'in' hace que arranque lento y acelere al final (sensación de caída)
//         });

//     });
// });


document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {

        // =====================================================
        // 1. SECCIÓN IMPACTO
        // =====================================================
        
        const impactoContent = ".section-impacto-content h2, .section-impacto-content hr, .section-impacto-content p, .section-impacto-content li";
        const cardInnerContent = ".card-delegar > div > *";

        ScrollTrigger.create({
            trigger: ".section-impacto",
            start: "top top",
            end: "+=2000",
            pin: true,
            anticipatePin: 1,
        });

        let tlImpacto = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-impacto",
                start: "top 75%",
                end: "+=2500",
                // scrub: 0, 
            }
        });

        tlImpacto
            // Entrada
            .fromTo(".section-impacto", 
                { backgroundColor: "#FFFFFF" }, 
                { backgroundColor: "#0166f2", duration: 1, ease: "none" }
            )
            .from(".card-delegar", {
                xPercent: 100,
                autoAlpha: 0,
                duration: 2,
                ease: "power2.out"
            }, "<")
            .from(impactoContent, {
                y: 30,
                autoAlpha: 0,
                duration: 1,
                stagger: 0.1
            }, "<")
            .from(cardInnerContent, {
                y: 30,
                autoAlpha: 0,
                duration: 1,
                stagger: 0.2
            }, "-=0.5")
            
            // .to(".section-impacto", {
            //     backgroundColor: "#FFFFFF",
            //     duration: 1,
            //     ease: "none"
            // })
            // .to(cardInnerContent, {
            //     y: 30,
            //     autoAlpha: 0,
            //     duration: 1,
            //     stagger: 0.1
            // }, "<");


        // =====================================================
        // 2. SECCIÓN QUE HACEMOS
        // =====================================================

        gsap.from(".section-que-hacemos > *", {
            scrollTrigger: {
                trigger: ".section-que-hacemos",
                start: "top 90%", 
                end: "top 40%",   
                scrub: 1
            },
            y: 150,
            autoAlpha: 0,
            duration: 2,
            stagger: 0.1,
            ease: "power2.out"
        });

        ScrollTrigger.create({
            trigger: ".section-que-hacemos",
            start: "top top",
            end: "+=200%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1
        });


        // =====================================================
        // 3. SECCIÓN ESPECIALISTAS
        // =====================================================

        ScrollTrigger.create({
            trigger: ".especialistas",
            start: "top top",
            end: "+=3000",
            pin: true,
            anticipatePin: 1,
        });

        let tlSpecs = gsap.timeline({
            scrollTrigger: {
                trigger: ".especialistas",
                start: "top 100%",
                end: "+=3500",
                scrub: 1,
            }
        });

        gsap.set(".especialistas", { willChange: "height, padding" });

        tlSpecs.from(".especialistas", {
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: 2,
            ease: "none"
        })
        .from(".especialistas h3, .especialistas hr", {
            y: 30,
            autoAlpha: 0,
            duration: 1
        }, "<+=0.5")
        .from(".especialistas li", {
            x: -50,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.5
        }, "-=0.5")
        

        .to({}, { duration: 2 }) 


        .to(".especialistas h3, .especialistas hr, .especialistas li", {
            y: 50,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power1.in",
            onComplete: () => {
                gsap.set(".especialistas", { willChange: "auto" });
            }
        });

        // =====================================================
        // 3. SECCIÓN ESPECIALISTAS
        // =====================================================

        ScrollTrigger.create({
            trigger: ".section-seleccionar-bien",
            start: "top top",
            end: "+=3000",
            pin: true,
            anticipatePin: 1,
        });

        tlSpecs = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-seleccionar-bien",
                start: "top 100%",
                end: "+=3500",
                scrub: 1,
            }
        });

        gsap.set(".section-seleccionar-bien", { willChange: "height, padding" });

        tlSpecs.from(".section-seleccionar-bien", {
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: 2,
            ease: "none"
        })
        .from(".section-seleccionar-bien h2, .section-seleccionar-bien p, .section-seleccionar-bien hr", {
            y: 30,
            autoAlpha: 0,
            duration: 1
        }, "<+=0.5")
        .from(".section-seleccionar-bien li", {
            x: -50,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.5
        }, "-=0.5")
        

        .to({}, { duration: 2 }) 


        .to(".section-seleccionar-bien h2, .section-seleccionar-bien p, .section-seleccionar-bien hr, .section-seleccionar-bien li", {
            y: 50,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power1.in",
            onComplete: () => {
                gsap.set(".section-seleccionar-bien", { willChange: "auto" });
            }
        });

    }); // Fin MatchMedia
});