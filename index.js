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

var sizeMode = false;
var rotationMode = false;

document.addEventListener('keydown', e => 
{
    if (e.code == 'KeyQ')
        sizeMode = true;
    else if (e.code == 'KeyW')
        rotationMode = true;
});

document.addEventListener('keyup', e => 
{
    if (e.code == 'KeyQ')
        sizeMode = false;
    else if (e.code == 'KeyW')
        rotationMode = false;
});

const intersectionPointColor = "#DF0113";
const intersectionPointSize = 5;

var firstEllipse = new Ellipse(new Vector2(500, 600), new Vector2(1, 0), 200, 100);
var secondEllipse = new Ellipse(new Vector2(800, 600), new Vector2(1, 0), 200, 100);
var intersectionPoints = GetIntersectionPoints(firstEllipse, secondEllipse);

function Redraw()
{
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    firstEllipse.Draw();
    secondEllipse.Draw();
    Controls.Draw();

    for(let i = 0; i < intersectionPoints.length; i++)
    {
        ctx.beginPath();
        ctx.fillStyle = intersectionPointColor;
        ctx.arc(intersectionPoints[i].x, intersectionPoints[i].y, intersectionPointSize, 0, 2 * Math.PI);
        ctx.fill();
    }
}

Redraw();

Controls.controlChangedHandler = (id, oldPosition, newPosition) => 
{
    let handlingType = sizeMode? (rotationMode? EllipseHandlingType.All : EllipseHandlingType.SizeOnly) : (rotationMode? EllipseHandlingType.RotationOnly : EllipseHandlingType.All);
    firstEllipse.HandleChangedControl(id, oldPosition, newPosition, handlingType);
    secondEllipse.HandleChangedControl(id, oldPosition, newPosition, handlingType);
    intersectionPoints = GetIntersectionPoints(firstEllipse, secondEllipse);
    Redraw();
};