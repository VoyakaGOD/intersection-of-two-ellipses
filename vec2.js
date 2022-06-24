class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    Add(other)
    {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    
    Sub(other)
    {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    Mul(factor)
    {
        return new Vector2(this.x * factor, this.y * factor);
    }

    Dot(other)
    {
        return this.x * other.x + this.y * other.y;
    }

    get sqrLen()
    {
        return this.Dot(this);
    }

    get len()
    {
        return Math.sqrt(this.Dot(this));
    }

    get angle()
    {
        return Math.atan2(this.y, this.x);
    }

    static get zero()
    {
        return new Vector2(0, 0);
    }
}