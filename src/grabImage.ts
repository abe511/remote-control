import { mouse, Region, screen, Point, Image, FileType } from "@nut-tree/nut-js";



export default async (width: number, height: number) => {
    let pos: Point;
    let image: Image;
    let region: Region;
    let img: string;
    try {
        pos = await mouse.getPosition();
        region = new Region(
            pos.x - parseInt((width * 0.5).toFixed()),
            pos.y - parseInt((height * 0.5).toFixed()),
            parseInt((width * 0.5).toFixed()),
            parseInt((height * 0.5).toFixed()));
        // image = await screen.grabRegion((region));
        img = await screen.captureRegion("temp.png", region, FileType.PNG);
    
        // return image;
        return img;
    } catch(err) {
        console.log(err);
    }
    // console.log(image.data.toString("base64"));
};