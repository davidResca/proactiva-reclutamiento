document.addEventListener("DOMContentLoaded", (event) => {
    // Registramos ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Activamos MatchMedia para resoluciones mayores a 1024px
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {


        ScrollTrigger.create({
            trigger: ".section-impacto",
            start: "top top", // Se clava EXACTAMENTE al llegar arriba
            end: "+=2000",    // La duración del "congelamiento"
            pin: true,        // Aquí ocurre la magia del pin
            anticipatePin: 1,
            // markers: true, // Descomenta para ver dónde se clava (marker: 'start')
        });
        // Creamos la línea de tiempo vinculada al scroll
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-impacto",
                
                // <--- AQUÍ ESTÁ LA CLAVE DE LA ANTICIPACIÓN
                start: "top 75%", // Empieza cuando la sección asoma por el 75% de la pantalla
                
                // Cálculo del fin: Distancia desde el 75% hasta arriba + los 2000 del pin
                end: "+=2500",    
                scrub: 1,
                // NOTA: No ponemos 'pin: true' aquí porque ya lo hace el de arriba
            }
        });

        // 1. El fondo pasa de Blanco a Azul #0166f2
        tl.fromTo(".section-impacto",
            {
                backgroundColor: "#FFFFFF"
            },
            {
                backgroundColor: "#0166f2",
                duration: 2, // Ocupará una buena parte del scroll
                ease: "none" // 'none' se siente mejor con Pin para cambios de color
            }
        );

        // 2. La tarjeta entra desde la derecha
        // Nota: Le puse duration 2 para que acompañe todo el cambio de color del fondo
        tl.from(".card-delegar", {
            xPercent: 100,
            autoAlpha: 0,
            duration: 2,
            ease: "power2.out"
        }, "<"); // Arranca junto con el fondo

        // 3. Textos de la izquierda (Aparecen un poco después para dar ritmo)
        // Usamos "<+=0.5" para que arranquen cuando el fondo/tarjeta ya van por el 25%
        tl.from(".section-impacto-content h2, .section-impacto-content hr, .section-impacto-content p, .section-impacto-content li", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1
        }, "<+=0.5");

        // 4. El texto DENTRO de la tarjeta aparece al final
        tl.from(".card-delegar > div > *", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        }, "-=0.5");
        gsap.from(".section-entendemos", {
            scrollTrigger: {
                trigger: ".section-entendemos", // El gatillo es esta nueva sección
                start: "top 85%", // Arranca cuando el tope de la sección entra al 85% de la pantalla (casi abajo)
                end: "top 50%",   // Termina cuando llega a la mitad
                scrub: 1,         // Vinculado al scroll (borra esta línea si quieres que se reproduzca sola)
                // markers: true  // Úsalo si necesitas ver dónde arranca
            },
            y: 50,          // Se mueve 50px desde abajo hacia su lugar original
            opacity: 0,     // Empieza invisible
            duration: 1,    // Duración relativa al scrub
            ease: "power2.out"
        });

        ScrollTrigger.create({
            trigger: ".especialistas",
            start: "top top", // Se clava justo al tocar el techo
            end: "+=3000",    // Duración del congelamiento
            pin: true,
            anticipatePin: 1,
            // markers: true // Úsalo si necesitas depurar
        });

        // --- 2. LA ANIMACIÓN (ANTICIPADA) ---
        // Controla la apertura y los elementos internos.
        let tlSpecs = gsap.timeline({
            scrollTrigger: {
                trigger: ".especialistas",
                
                // <--- ANTICIPACIÓN: 
                // Arranca cuando el tope de la sección entra al 80% de la pantalla.
                // Es decir, empieza a abrirse ANTES de llegar arriba y clavarse.
                start: "top 80%", 
                
                // El final debe coincidir aprox con el final del pin (+3000) 
                // más la distancia que recorrió antes (ese 20% de pantalla).
                end: "+=3500", 
                scrub: 1,
            }
        });

        // 1. CONTENEDOR SE ABRE (Height 0 -> Auto)
        // Empezará a crecer mientras el usuario scrollea hacia la sección
        tlSpecs.from(".especialistas", {
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: 2, 
            ease: "none"
        });

        // 2. TÍTULO Y DIVIDER
        tlSpecs.from(".especialistas h3, .especialistas hr", {
            y: 30,
            autoAlpha: 0,
            duration: 1
        }, "<+=0.5"); // Arranca cuando el contenedor ya se abrió un poco

        // 3. LISTA DE ITEMS (Stagger controlado por scroll)
        tlSpecs.from(".especialistas li", {
            x: -50,
            autoAlpha: 0,
            duration: 1,   // Cuánto tarda cada uno en entrar visualmente
            stagger: 0.5   // Cuánto espacio de scroll hay entre la aparición de uno y otro
        }, "-=0.5");       // Se solapa un poco con el título
        
        tlSpecs.to({}, { duration: 2 }); 

        // 4. SALIDA (Fade Out + Izquierda)
        // tlSpecs.to(".especialistas", {
        //     opacity: 1,     // Se desvanece
        //     y: 200,        // Se mueve 100px a la izquierda
        //     duration: 1,    // Duración de la salida
        //     ease: "none" // Acelera al salir
        // }, "<");
    
    });
});