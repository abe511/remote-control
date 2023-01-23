import { mouse, straightTo, Point } from "@nut-tree/nut-js";

export default async (x: number, y: number) => {
    let a, b, c, d: Point;
    try {
        a = await mouse.getPosition();
        b = new Point(a.x + x, a.y);
        await mouse.drag(straightTo(a));
    } catch(err) {
        console.log(err);
    }
};
