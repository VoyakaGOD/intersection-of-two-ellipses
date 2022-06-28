function GetIntersectionPoints(firstEllipse, secondEllipse)
{
    let a = firstEllipse.sizeA;
    let b = firstEllipse.sizeB;
    let c = secondEllipse.sizeA;
    let d = secondEllipse.sizeB;
    let phi = firstEllipse.angle;
    let phi0 = secondEllipse.angle - phi;
    let p0 = secondEllipse.position.Sub(firstEllipse.position).Rotate(-phi);

    //cos(t1) = A + Bcos(t2) + Csin(t2)
    //sin(t1) = D + Ecos(t2) + Fsin(t2)
    let A = p0.x / a;
    let B = c * Math.cos(phi0) / a;
    let C = -d * Math.sin(phi0) / a;
    let D = p0.y / b;
    let E = c * Math.sin(phi0) / b;
    let F = d * Math.cos(phi0) / b;

    //Gx^2 + Hx + Ixy + Jy + K = 0, x = cos(t2), y = sin(t2)
    let G = B*B + E*E - C*C - F*F;
    let H = 2*(A*B + D*E);
    let I = 2*(B*C + E*F);
    let J = 2*(A*C + D*F);
    let K = A*A + D*D + C*C + F*F - 1;

    let roots = [];
    let L = G*G + I*I;
    if(IsCloseToZero(L))
    {
        //Hx + Jy + K = 0
        roots = SolveQuadraticEquation(H*H + J*J, 2*K*H, K*K - J*J);
    }
    else
    {
        //Lx^4 + Mx^3 + Nx^2 + Ox + P = 0
        let M = 2*(G*H + I*J);
        let N = H*H + 2*G*K + J*J - I*I;
        let O = 2*(K*H - I*J);
        let P = K*K - J*J;

        let iL = 1/L;
        roots = SolveQuarticEquation(M*iL, N*iL, O*iL, P*iL);
    }

    let points = [];
    for(let i = 0; i < roots.length; i++)
    {
        let x = roots[i];
        if(IsCloseToZero(I*x + J))
        {
            let y = Math.sqrt(1 - x*x);
            points.push(new Vector2(x, y));
            if(!IsCloseToZero(y))
                points.push(new Vector2(x, -y));
        }
        else
        {
            let y = -(G*x*x + H*x + K) / (I*x + J);
            if (Math.abs(y) < 1e-2)
            {
                y = Math.sqrt(1 - x*x);
                points.push(new Vector2(x, y));
                points.push(new Vector2(x, -y));
            }
            else
            {
                points.push(new Vector2(x, y));
            }
        }
    }

    for(let i = 0; i < points.length; i++)
        points[i] = new Vector2((A + B*points[i].x + C*points[i].y)*a, (D + E*points[i].x + F*points[i].y)*b);
    
    for(let i = 0; i < points.length; i++)
        points[i] = points[i].Rotate(phi).Add(firstEllipse.position);
    
    return points;
}