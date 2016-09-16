/**
 * @memberof ROIManager
 * @instance
 */

import ROIMap from './../ROIMap';
import Shape from './../../../util/shape';

export default function fromPoints(pointsToPaint, options = {}) {
    let shape = new Shape(options);

    // based on a binary image we will create plenty of small images
    let mapPixels = new Int16Array(this.size); // maxValue: 32767, minValue: -32768
    let positiveID = 0;
    let shapePixels = shape.getPoints();
    for (let i = 0; i < pointsToPaint.length; i++) {
        positiveID++;
        let xP = pointsToPaint[i][0];
        let yP = pointsToPaint[i][1];
        for (let j = 0; j < shapePixels.length; j++) {
            let xS = shapePixels[j][0];
            let yS = shapePixels[j][1];
            if (
                ((xP + xS) >= 0) &&
                ((yP + yS) >= 0) &&
                ((xP + xS) < this.width) &&
                ((yP + yS) < this.height)
            ) {
                mapPixels[xP + xS + (yP + yS) * this.width] = positiveID;
            }
        }
    }

    return new ROIMap(this, mapPixels);
}
