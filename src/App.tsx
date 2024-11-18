import { useState, useRef, useEffect } from "react";

function getRotation(ctx: CanvasRenderingContext2D) {
    const mat = ctx.getTransform();
    const rad = Math.atan2(mat.b, mat.a);
    if (rad < 0) {
        // angle is > Math.PI
        return rad + Math.PI * 2;
    }
    return rad;
}

function Rotate(props: { degree: number; options: string[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const foreCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.canvas.width = 505;
            ctx.canvas.height = 505;
            const circleRadius = 250;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.arc(
                ctx.canvas.width / 2,
                ctx.canvas.width / 2,
                circleRadius,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "blue";
            ctx.stroke();
            for (let i = 0; i < props.options.length; i++) {
                ctx.strokeStyle = "black";
                const option = props.options[i];
                ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.width / 2);
                ctx.beginPath();
                ctx.moveTo(
                    ctx.canvas.width / 2 +
                        Math.cos((i / props.options.length) * 2 * Math.PI) *
                            circleRadius,
                    ctx.canvas.height / 2 +
                        Math.sin((i / props.options.length) * 2 * Math.PI) *
                            circleRadius
                );
                ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.width / 2);
                ctx.arc(
                    ctx.canvas.width / 2,
                    ctx.canvas.width / 2,
                    circleRadius,
                    (i / props.options.length) * 2 * Math.PI,
                    ((i + 1) / props.options.length) * 2 * Math.PI
                );
                // ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.width / 2);
                ctx.lineWidth = 4;
                ctx.stroke();
                ctx.font = "30px Arial black";
                ctx.fillStyle = "black";
                //ctx.rotate(i + 0.5 / props.options.length * 2 * Math.PI + 0.5 * Math.PI)
                ctx.fillText(
                    option,
                    ctx.canvas.width / 2 +
                        Math.cos(
                            ((i + 0.5) / props.options.length) * 2 * Math.PI
                        ) *
                            circleRadius *
                            0.8,
                    ctx.canvas.height / 2 +
                        Math.sin(
                            ((i + 0.5) / props.options.length) * 2 * Math.PI
                        ) *
                            circleRadius *
                            0.8
                );
            }
        }
        if (foreCanvasRef.current) {
            const forecanvas = foreCanvasRef.current;
            const forectx = forecanvas.getContext("2d");
            if (!forectx) return;
            forectx.canvas.width = 50;
            forectx.canvas.height = 550;
            const circleRadius = 200;
            forectx.moveTo(0, forectx.canvas.height / 2);
            forectx.beginPath();
            forectx.lineTo(0, forectx.canvas.height / 2);
            forectx.arc(
                -(circleRadius * 0.85),
                forectx.canvas.height / 2,
                circleRadius,
                (-5 / 360) * 2 * Math.PI,
                (5 / 360) * 2 * Math.PI
            );
            forectx.lineTo(0, forectx.canvas.height / 2);
            forectx.stroke();
        }
        return () => {};
    });
    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{
                    transform: `rotate(${props.degree}deg)`,
                    transition: "transform 10s cubic-bezier(0.6, 0, 0, 1)",
                }}
            />
            <canvas ref={foreCanvasRef} />
        </div>
    );
}

const ColoredRect = () => {
    const [degree, setDegree] = useState<number>(0);

    const handleClick = () => {
        console.log("Clicked");
        let deltaD = Math.random() * 10 * 360;
        if (deltaD % 15 === 0) deltaD += 2;
        setDegree((de) => de + 3000 + Math.random() * 10 * 360); // Increment the degree to see the rotation
        console.log(degree);
    };

    return (
        <div>
            {
                ["A", "B", "C", "D"][
                    (3 + -Math.floor(((360 + degree) % 360) / (360 / 4))) % 4
                ]
            }
            <button onClick={handleClick}>Click me</button>
            <Rotate degree={degree} options={["A", "B", "C", "D"]} />
        </div>
    );
};

const App = () => {
    return <ColoredRect />;
};

export default App;
