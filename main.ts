/*
 * This is a class that represents a 3d point in space.
 */
export class Point3D {
    w: number;
    constructor(public x: number, public y: number, public z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 1;
    }

    public toString(): string {
        return "(" + this.x + "," + this.y + "," + this.z + ")";
    }

    /* 
     * Static interface
     */

    /* Get the vector distance between two points */
    public static distance(p1: Point3D, p2: Point3D): Vector3D {
        return new Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
    }

    /*
     * Instance interface 
     */

    /* Add a vector to this point */
    public add(v: Vector3D): void {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    /* Subtract a vector from this point */
    public subtract(v: Vector3D): void {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }

    /* Get the vector distance from this point to another point */
    public distance(p: Point3D): Vector3D {
        return new Vector3D(p.x - this.x, p.y - this.y, p.z - this.z);
    }
}

/*
 * This is a class that represents a 3d vector in space.
 */
export class Vector3D {
    w: number;
    constructor(public x: number, public y: number, public z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 0;
    }

    public toString(): string {
        return "(" + this.x + "," + this.y + "," + this.z + ")";
    }

    /* 
     * Static interface
     */

    /* Add two vectors together */
    public static add(v1: Vector3D, v2: Vector3D): Vector3D {
        return new Vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    /* Scale a vector */
    public static scale(v: Vector3D, s: number): Vector3D {
        return new Vector3D(v.x * s, v.y * s, v.z * s);
    }

    /* Get a vector's inverse */
    public static inverse(v: Vector3D): Vector3D {
        return new Vector3D(-v.x, -v.y, -v.z);
    }

    /*
     * Instance interface 
     */

    /* Add a vector to this vector */
    public add(v: Vector3D): void {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    /* Scale this vector */
    public scale(s: number): void {
        this.x *= s;
        this.y *= s;
        this.z *= s;
    }

    /* Get this vector's inverse */
    public inverse(): Vector3D {
        return new Vector3D(-this.x, -this.y, -this.z);
    } 

    /* Invert this vector */
    public invert(): void {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
    }

    /* Get the magnitude of this vector */
    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

}

/*
    * This is a class that represents a 3d matrix.
    */
export class Matrix3D {
    v1: Vector3D;
    v2: Vector3D;
    v3: Vector3D;
    v4: Vector3D;

    /* mXY - X is the row, Y is the column */
    constructor(public m11: number, public m12: number, public m13: number,
                public m21: number, public m22: number, public m23: number,
                public m31: number, public m32: number, public m33: number) {
        this.v1 = new Vector3D(m11, m12, m13);
        this.v2 = new Vector3D(m21, m22, m23);
        this.v3 = new Vector3D(m31, m32, m33);
        this.v4 = new Vector3D(0, 0, 0);
    }

    public toString(): string {
        return this.v1.toString() + "\n" + this.v2.toString() + "\n" + this.v3.toString();
    }

    /* Transform a vector by a matrix */
    public static transform(m: Matrix3D, v: Vector3D): Vector3D {
        let x = v.x * m.m11 + v.y * m.m21 + v.z * m.m31;
        let y = v.x * m.m12 + v.y * m.m22 + v.z * m.m32;
        let z = v.x * m.m13 + v.y * m.m23 + v.z * m.m33;
        return new Vector3D(x, y, z);
    }

    /* Create an identity matrix */
    public static identity(): Matrix3D {
        return new Matrix3D(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }

    /* Calculate the determinant of a matrix */
    public static determinant(m: Matrix3D): number {
        let a = m.m11 * (m.m22 * m.m33 - m.m32 * m.m23);
        let b = m.m12 * (m.m21 * m.m33 - m.m31 * m.m23);
        let c = m.m13 * (m.m21 * m.m32 - m.m31 * m.m22);
        return a - b + c;
    }

    /* Create a rotation matrix about the x axis */
    public static rotationX(angle: number): Matrix3D {
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        return new Matrix3D(1, 0, 0, 0, c, -s, 0, s, c);
    }

    /* Create a rotation matrix about the y axis */
    public static rotationY(angle: number): Matrix3D {
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        return new Matrix3D(c, 0, s, 0, 1, 0, -s, 0, c);
    }

    /* Create a rotation matrix about the z axis */
    public static rotationZ(angle: number): Matrix3D {
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        return new Matrix3D(c, -s, 0, s, c, 0, 0, 0, 1);
    }
}