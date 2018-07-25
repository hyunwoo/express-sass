/**
 * Created by hyunwoo on 2018. 7. 16..
 */
class Point {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}

class A {
    constructor(){
        _.apply(this, new Point());

        // this.apply(this, new Point());
    }
}