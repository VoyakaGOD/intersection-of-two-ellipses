const ellipseContourColor = "#0E1B0B";
const ellipseContourWidth = 3;

function ResizeCanvas()
{
    cnv.width = window.innerWidth - 16;
    cnv.height = window.innerHeight - 20;
}

ResizeCanvas();

window.addEventListener('resize', e => 
{
    ResizeCanvas();
    Redraw();
});

var first_center = Controls.Add(new Vector2(500, 400));
var first_a1 = Controls.Add(new Vector2(700, 400));
var first_a2 = Controls.Add(new Vector2(300, 400));
var first_b1 = Controls.Add(new Vector2(500, 300));
var first_b2 = Controls.Add(new Vector2(500, 500));
var size_a = CONTROLS[first_center].Sub(CONTROLS[first_a1]).len;
var size_b = CONTROLS[first_center].Sub(CONTROLS[first_b1]).len;

function Redraw()
{
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    ctx.strokeStyle = ellipseContourColor;
    ctx.lineWidth = ellipseContourWidth;
    ctx.beginPath();
    ctx.ellipse(CONTROLS[first_center].x, CONTROLS[first_center].y, size_a, size_b, CONTROLS[first_a1].Sub(CONTROLS[first_center]).angle, 0, 2 * Math.PI);
    ctx.stroke();

    Controls.Draw();
}

Redraw();

function HandleEllipse(id, oldPosition, newPosition, center, a1, a2, b1, b2)
{
    let delta = newPosition.Sub(oldPosition);

    switch(id)
    {
        case center:
            CONTROLS[a1] = CONTROLS[a1].Add(delta);
            CONTROLS[a2] = CONTROLS[a2].Add(delta);
            CONTROLS[b1] = CONTROLS[b1].Add(delta);
            CONTROLS[b2] = CONTROLS[b2].Add(delta);
            break;
        case a1:
            CONTROLS[a2] = CONTROLS[center].Mul(2).Sub(CONTROLS[a1]);
            break;
        case a2:
            CONTROLS[a1] = CONTROLS[center].Mul(2).Sub(CONTROLS[a2]);
            break;
        case b1:
            CONTROLS[b2] = CONTROLS[center].Mul(2).Sub(CONTROLS[b1]);
            break;
        case b2:
            CONTROLS[b1] = CONTROLS[center].Mul(2).Sub(CONTROLS[b2]);
            break;
    }

    if(id == a1 || id == a2)
    {
        let dir = CONTROLS[a1].Sub(CONTROLS[center]);
        size_a = dir.len;
        CONTROLS[b1] = CONTROLS[center].Add((new Vector2(dir.y, -dir.x)).normalized.Mul(size_b));
        CONTROLS[b2] = CONTROLS[center].Add((new Vector2(-dir.y, dir.x)).normalized.Mul(size_b));
    }
    else if(id == b1 || id == b2)
    {
        let dir = CONTROLS[b1].Sub(CONTROLS[center]);
        size_b = dir.len;
        CONTROLS[a1] = CONTROLS[center].Add((new Vector2(dir.y, -dir.x)).normalized.Mul(size_a));
        CONTROLS[a2] = CONTROLS[center].Add((new Vector2(-dir.y, dir.x)).normalized.Mul(size_a));
    }
}

Controls.controlChangedHandler = (id, oldPosition, newPosition) => 
{
    HandleEllipse(id, oldPosition, newPosition, first_center, first_a1, first_a2, first_b1, first_b2);

    Redraw();
};