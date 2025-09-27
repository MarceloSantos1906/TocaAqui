import { useEffect, useRef } from "react";

interface MercadoPagoBrickProps {
    publicKey: string;
    preferenceId: string;
}

function MercadoPagoBrick({ publicKey, preferenceId }: MercadoPagoBrickProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const userLocale = navigator.language || "pt-BR";

        function initializeBrick() {
            // @ts-ignore
            const mp = new window.MercadoPago(publicKey, { locale: userLocale });
            // @ts-ignore
            mp.bricks().create("payment", containerRef.current, {
                initialization: {
                    amount: 100,
                    preferenceId,
                },
                customization: {
                    visual: { style: { theme: "default" } },
                },
                callbacks: {
                    onReady: () => {},
                    onSubmit: ({ formData }: any) => {
                        return Promise.resolve();
                    },
                    onError: (error: any) => {
                        console.error(error);
                    },
                },
            });
        }

        // Load MercadoPago SDK if not already loaded
        if (!window.MercadoPago) {
            const script = document.createElement("script");
            script.src = "https://sdk.mercadopago.com/js/v2";
            script.onload = initializeBrick;
            document.body.appendChild(script);
        } else {
            initializeBrick();
        }
    }, [publicKey, preferenceId]);

    return <div ref={containerRef} id="paymentBrick_container" />;
}

export default MercadoPagoBrick;