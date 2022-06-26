const ellipseContourColor = "#0E1B0B";
const ellipseContourWidth = 3;
const minEllipseSize = 15;

class EllipseHandlingType
{
    static get All() { return 0; }
    static get SizeOnly() { return 1; }
    static get RotationOnly() { return 2; }
}

class Ellipse
{
    constructor(position, direction, sizeA, sizeB)
    {
        direction = direction.normalized;
        let normal = new Vector2(-direction.y, direction.x);
        this.center = Controls.Add(position);
        this.a1 = Controls.Add(position.Add(direction.Mul(sizeA)));
        this.a2 = Controls.Add(position.Add(direction.Mul(-sizeA)));
        this.b1 = Controls.Add(position.Add(normal.Mul(sizeB)));
        this.b2 = Controls.Add(position.Add(normal.Mul(-sizeB)));
        this.sizeA = sizeA;
        this.sizeB = sizeB;
    }

    get position()
    {
        return CONTROLS[this.center];
    }

    get angle()
    {
        return CONTROLS[this.a1].Sub(CONTROLS[this.center]).angle;
    }

    Draw()
    {
        ctx.strokeStyle = ellipseContourColor;
        ctx.lineWidth = ellipseContourWidth;
        ctx.beginPath();
        ctx.ellipse(CONTROLS[this.center].x, CONTROLS[this.center].y, this.sizeA, this.sizeB, this.angle, 0, 2 * Math.PI);
        ctx.stroke();
    }

    HandleChangedControl(id, oldPosition, newPosition, handlingType)
    {
        if(id != this.center && id != this.a1 && id != this.a2 && id != this.b1 && id != this.b2)
            return;
        
        if(id != this.center)
        {
            let dir = CONTROLS[id].Sub(CONTROLS[this.center]);
            if(handlingType == EllipseHandlingType.RotationOnly)
            {
                let ndir = dir.normalized;
                if(id == this.a1 || id == this.a2)
                    CONTROLS[id] = CONTROLS[this.center].Add(ndir.Mul(this.sizeA));
                if(id == this.b1 || id == this.b2)
                    CONTROLS[id] = CONTROLS[this.center].Add(ndir.Mul(this.sizeB));
            }
            else if (handlingType == EllipseHandlingType.SizeOnly)
            {
                let oldDir = oldPosition.Sub(CONTROLS[this.center]).normalized;
                CONTROLS[id] = CONTROLS[this.center].Add(oldDir.Mul(oldDir.Dot(dir)));
            }

            dir = CONTROLS[id].Sub(CONTROLS[this.center]);
            if(dir.sqrLen < minEllipseSize*minEllipseSize)
            {
                if (dir.sqrLen == 0)
                    CONTROLS[id] = oldPosition;
                else
                    CONTROLS[id] = CONTROLS[this.center].Add(dir.normalized.Mul(minEllipseSize));
            }
        }

        switch(id)
        {
            case this.center:
                let delta = newPosition.Sub(oldPosition);
                CONTROLS[this.a1] = CONTROLS[this.a1].Add(delta);
                CONTROLS[this.a2] = CONTROLS[this.a2].Add(delta);
                CONTROLS[this.b1] = CONTROLS[this.b1].Add(delta);
                CONTROLS[this.b2] = CONTROLS[this.b2].Add(delta);
                break;
            case this.a1:
                CONTROLS[this.a2] = CONTROLS[this.center].Mul(2).Sub(CONTROLS[this.a1]);
                break;
            case this.a2:
                CONTROLS[this.a1] = CONTROLS[this.center].Mul(2).Sub(CONTROLS[this.a2]);
                break;
            case this.b1:
                CONTROLS[this.b2] = CONTROLS[this.center].Mul(2).Sub(CONTROLS[this.b1]);
                break;
            case this.b2:
                CONTROLS[this.b1] = CONTROLS[this.center].Mul(2).Sub(CONTROLS[this.b2]);
                break;
        }

        if(id == this.a1 || id == this.a2)
        {
            let dir = CONTROLS[this.a1].Sub(CONTROLS[this.center]);
            this.sizeA = dir.len;
            let normal = (new Vector2(dir.y, -dir.x)).normalized;
            CONTROLS[this.b1] = CONTROLS[this.center].Add(normal.Mul(this.sizeB));
            CONTROLS[this.b2] = CONTROLS[this.center].Add(normal.Mul(-this.sizeB));
        }
        else if(id == this.b1 || id == this.b2)
        {
            let dir = CONTROLS[this.b1].Sub(CONTROLS[this.center]);
            this.sizeB = dir.len;
            let normal = (new Vector2(dir.y, -dir.x)).normalized;
            CONTROLS[this.a1] = CONTROLS[this.center].Add(normal.Mul(this.sizeA));
            CONTROLS[this.a2] = CONTROLS[this.center].Add(normal.Mul(-this.sizeA));
        }
    }
}