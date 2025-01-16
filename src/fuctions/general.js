import { Point} from '@flatten-js/core';

/**
 * Checks if three given side lengths can form a valid triangle.
 * 
 * @param {number} a - The length of the first side.
 * @param {number} b - The length of the second side.
 * @param {number} c - The length of the third side.
 * @returns {boolean} True if the sides form a valid triangle, false otherwise.
 */
export function isValidTriangle(a, b, c) {
    return a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
}

/**
 * Calculates the third side of a triangle using the cosine law.
 * 
 * @param {number} a - The length of the first side.
 * @param {number} b - The length of the second side.
 * @param {number} angle - The angle between the two sides in radians.
 * @returns {number} The length of the third side.
 */
export function calculateThirdSideUsingCosineLaw(a, b, angle) {
    return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle));
}

/**
 * Shifts a 2D coordinate by subtracting the coordinates of another point.
 * 
 * @param {Point} A - The point to be shifted.
 * @param {Point} B - The point to subtract from A.
 * @returns {Point} A new point representing the shifted coordinates.
 * @throws {TypeError} If either A or B is not an instance of Point.
 */
export function shiftCoordinate2D(A, B) {
    if (!(A instanceof Point) || !(B instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }
    return new Point(A.x - B.x, A.y - B.y);
}

/**
 * Finds the circumcenter of a triangle formed by three 2D points.
 * 
 * @param {Point} A - The first point of the triangle.
 * @param {Point} B - The second point of the triangle.
 * @param {Point} C - The third point of the triangle.
 * @returns {Point} The circumcenter of the triangle.
 * @throws {TypeError} If any of A, B, or C is not an instance of Point.
 * @throws {Error} If the points are collinear and the circumcenter cannot be determined.
 */
export function findCircumcenter2D(A, B, C) {
    if (!(A instanceof Point) || !(B instanceof Point) || !(C instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }

    // Calculate the circumcenter in 2D
    const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    if (D === 0) {
        throw new Error("The points are collinear, circumcenter cannot be determined.");
    }

    const Ux = (1 / D) * ((A.x * A.x + A.y * A.y) * (B.y - C.y) + (B.x * B.x + B.y * B.y) * (C.y - A.y) + (C.x * C.x + C.y * C.y) * (A.y - B.y));
    const Uy = (1 / D) * ((A.x * A.x + A.y * A.y) * (C.x - B.x) + (B.x * B.x + B.y * B.y) * (A.x - C.x) + (C.x * C.x + C.y * C.y) * (B.x - A.x));

    return new Point(Ux, Uy);
}