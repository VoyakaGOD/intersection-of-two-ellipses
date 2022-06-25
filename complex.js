class Complex
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    Add(other)
    {
        return new Complex(this.x + other.x, this.y + other.y);
    }
    
    Sub(other)
    {
        return new Complex(this.x - other.x, this.y - other.y);
    }
    
    Mul(factor)
    {
        return new Complex(this.x * factor, this.y * factor);
    }

    MulComplex(other)
    {
        return new Complex(this.x*other.x - this.y*other.y, this.x*other.y + this.y*other.x);
    }

    get inverse()
    {
        let l = 1/(this.x*this.x + this.y*this.y);
        return new Complex(this.x*l, -this.y*l);
    }

    get sqrt()
    {
        let l = Math.sqrt(this.x*this.x + this.y*this.y);
        let sgn = Math.sign(this.y);
        if (sgn == 0)
            sgn = 1;
        return new Complex(Math.sqrt(0.5*(l + this.x)), sgn * Math.sqrt(0.5*(l - this.x)));
    }
}