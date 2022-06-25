function GetIntersectionPoints(firstEllipse, secondEllipse)
{
    let a = firstEllipse.sizeA;
    let b = firstEllipse.sizeB;
    let c = secondEllipse.sizeA;
    let d = secondEllipse.sizeB;
    let p0 = secondEllipse.position.Sub(firstEllipse.position);

    let ic2 = 1/(c*c);
    let id2 = 1/(d*d);

    let A = a*a*ic2 - b*b*id2;
    let B = 2*a*p0.x*ic2;
    let C = 2*b*p0.y*id2;
    let D = p0.x*p0.x*ic2 + p0.y*p0.y*id2 + b*b*id2 - 1;

    let points = [];

    if (A == 0)
    {
        if(C == 0)
        {
            let _c = D/B;
            let a_c = Math.acos(_c);
            let _s = Math.sin(a_c);
            points.push(new Vector2(a * _c, b * _s));
            if(_s != 0)
                points.push(new Vector2(a * _c, -b * _s));
        }
        else
        {
            let roots = Quadric(B*B + C*C, -2*B*D, D*D - C*C);
            for(let i = 0; i < roots.length; i++)
            {
                let s = (D-B*roots[i]) / C;
                points.push(new Vector2(a*roots[i], b*s));
            }
        }
    }

    for(let i = 0; i < points.length; i++)
        points[i] = points[i].Add(firstEllipse.position);
    return points;
}

//ax^2 + bx + c = 0
function Quadric(a, b, c)
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