function IsCloseToZero(num)
{
    return Math.abs(num) < 1e-7;
}

function Re(num)
{
    return new Complex(num, 0);
}

function Im(num)
{
    return new Complex(0, num);
}

function Sqrt(complex)
{
    return complex.sqrt;
}

function Qbrt(complex)
{
    let angle = Math.atan2(complex.y, complex.x) * 0.33333333333;
    let l = Math.pow(complex.x*complex.x + complex.y*complex.y, 0.16666666666);
    return new Complex(l*Math.cos(angle), l*Math.sin(angle));
}

//ax^2 + bx + c = 0
function SolveQuadricEquation(a, b, c)
{
    b = b / a;
    c = c / a;
    let D = b*b-4*c;
    if (IsCloseToZero(D))
        return [-0.5*b];
    if (D < 0)
        return [];
    let sqrtD = Math.sqrt(D);
    return [0.5*(-b-sqrtD), 0.5*(-b+sqrtD)];
}

//x^2 + bx + c = 0
function SolveComplexQuadricEquation(b, c)
{
    let sqrtD = Sqrt(b.MulComplex(b).Sub(c.Mul(4)));
    return [b.Add(sqrtD).Mul(-0.5), b.Sub(sqrtD).Mul(-0.5)];
}

//x^3 + ax^2 + bx + c = 0
function GetOneCubicEquationRoot(a, b, c)
{
    let p = b - a*a*0.33333333333;
    let q = (2/27)*a*a*a - a*b*0.33333333333 + c;
    let sqrtQ = Re(0.03703703703*p*p*p + 0.25*q*q).sqrt;
    let A = Qbrt(Re(-0.5*q).Sub(sqrtQ));
    if (A.x == 0 && A.y == 0)
        A = Qbrt(Re(-0.5*q).Add(sqrtQ));
    let B = A.inverse.Mul(-p*0.33333333333);
    return A.Add(B).Sub(Re(a*0.33333333333));
}

//x^4 + ax^3 + bx^2 + cx + d = 0
function SolveQuarticEquation(a, b, c, d)
{
    let p = b - (3/8)*a*a;
    let q = (1/8)*a*a*a - 0.5*a*b + c;
    let r = d - 0.25*a*c + (1/16)*a*a*b - (3/256)*a*a*a*a;

    result = [];

    if(IsCloseToZero(q))
    {
        let D = p*p - 4*r;
        if (D >= 0)
        {
            let sqrtD = Math.sqrt(D);
            let m1 = (-p - sqrtD)*0.5;
            let m2 = (-p + sqrtD)*0.5;
            if (m1 >= 0)
                result.push(Math.sqrt(m1));
            if (m1 > 0)
                result.push(-Math.sqrt(m1));
            if (m2 != m1 && m2 >= 0)
                result.push(Math.sqrt(m2));
            if (m2 != m1 && m2 > 0)
                result.push(-Math.sqrt(m2));
        }
    }
    else
    {
        let t = GetOneCubicEquationRoot(2*p, p*p-4*r, -q*q);
        let z = t.sqrt;
        let u = Re(p).Add(t).Mul(0.5);
        let v = z.inverse.Mul(q*0.5);
        let x12 = SolveComplexQuadricEquation(z, u.Sub(v));
        let x34 = SolveComplexQuadricEquation(z.Mul(-1), u.Add(v));
        
        if (IsCloseToZero(x12[0].y))
            result.push(x12[0].x);
        if (IsCloseToZero(x12[1].y))
            result.push(x12[1].x);
        if (IsCloseToZero(x34[0].y))
            result.push(x34[0].x);
        if (IsCloseToZero(x34[1].y))
            result.push(x34[1].x);
    }

    for(let i = 0; i < result.length; i++)
        result[i] -= 0.25*a;
    
    return result;
}