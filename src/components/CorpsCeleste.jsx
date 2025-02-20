import { useEffect } from "react";

function CorpsCeleste({ ctx, positionX, positionY }) {
    useEffect(() => {
        if (!ctx) return;

        // Définir un rayon plus grand pour les boules
        const radius = 50;

        // Dessiner le corps céleste avec un rayon plus grand
        ctx.beginPath();
        ctx.arc(positionX, positionY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
    }, [ctx, positionX, positionY]);

    return null; // Pas de rendu direct, on dessine sur le canvas
}

export default CorpsCeleste;
