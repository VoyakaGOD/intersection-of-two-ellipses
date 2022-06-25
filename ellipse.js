const ellipseContourColor = "#0E1B0B";
const ellipseContourWidth = 3;

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

    HandleChangedControl(id, oldPosition, newPosition)
    {
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