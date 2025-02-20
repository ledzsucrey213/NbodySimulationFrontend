import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CorpsCeleste from "./CorpsCeleste";

function Simulation() {
    const [corpsCelestes, setCorpsCelestes] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/simulate");
                setCorpsCelestes(response.data);
            } catch (error) {
                console.error("Erreur API:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 100); // Rafraîchir toutes les 100ms
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1 style={{ color: "white" }}>Simulation N-Body</h1>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                style={{
                    background: "black",
                    border: "1px solid white",
                    display: "block", 
                    margin: "0 auto",
                }}
            >
                {corpsCelestes.map((corps, index) => {
                    // Diviser les positions par 100
                    const scaledPositionX = corps.positionX / 110;
                    const scaledPositionY = corps.positionY / 100;

                    return (
                        <CorpsCeleste
                            key={index}
                            ctx={canvasRef.current?.getContext("2d")}
                            positionX={scaledPositionX}
                            positionY={scaledPositionY}
                        />
                    );
                })}
            </canvas>
        </div>
    );
}

export default Simulation;
