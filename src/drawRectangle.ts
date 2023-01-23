import { mouse, straightTo, Point } from "@nut-tree/nut-js";

export default async (x: number, y: number) => {
    let a, b, c, d: Point;
    try {
        a = await mouse.getPosition();
        b = new Point(a.x + x, a.y);
        c = new Point(a.x + x, a.y - y);
        d = new Point(a.x, a.y - y);
        await mouse.drag(straightTo(b));
        await mouse.drag(straightTo(c));
        await mouse.drag(straightTo(d));
        await mouse.drag(straightTo(a));
    } catch(err) {
        console.log(err);
    }
};
