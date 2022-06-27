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

    let roots = [];

    if (A == 0)
    {
        roots = SolveQuadricEquation(B*B + C*C, -2*B*D, D*D - C*C);
    }
    else
    {
        let F = A*A;
        let G = -2*A*B;
        let H = B*B + C*C + 2*A*D;
        let J = -2*B*D;
        let K = D*D - C*C;

        let iF = 1/F;
        roots = SolveQuarticEquation(G*iF, H*iF, J*iF, K*iF);
    }

    let points = [];

    if(C == 0)
    {
        for(let i = 0; i < roots.length; i++)
        {
            if(Math.abs(roots[i]) > 1)
                continue;
            let s = Math.sqrt(1 - roots[i]*roots[i]);
            points.push(new Vector2(a * roots[i], b * s));
            if(s != 0)
                points.push(new Vector2(a * roots[i], -b * s));
        }
    }
    else
    {
        for(let i = 0; i < roots.length; i++)
        {
            if(Math.abs(roots[i]) > 1)
                continue;
            let s = (D - B*roots[i] + A*roots[i]*roots[i]) / C;
            points.push(new Vector2(a*roots[i], b*s));
        }
    }

    for(let i = 0; i < points.length; i++)
        points[i] = points[i].Add(firstEllipse.position);
    
    return points;
}