import { mouse } from "@nut-tree/nut-js";


export const getMousePosition = async () => {
    const position = await mouse.getPosition();
    return position;
};