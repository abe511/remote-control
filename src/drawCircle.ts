import { mouse, straightTo, Point } from "@nut-tree/nut-js";

export default async (radius: number) => {
    let b: Point;
    const center = await mouse.getPosition();
    const steps = 60;

    try {
        b = new Point(center.x + radius, center.y);

        for (let i = 0; i < steps; i++) {
            b.x = (center.x + radius * Math.cos(2 * Math.PI * i / steps));
            b.y = (center.y + radius * Math.sin(2 * Math.PI * i / steps));
            await mouse.drag(straightTo(b));
        }

    } catch(err) {
        console.log(err);
    }



};
