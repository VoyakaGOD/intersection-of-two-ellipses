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

const intersectionPointColor = "#DF0113";
const intersectionPointSize = 5;

var firstEllipse = new Ellipse(new Vector2(500, 400), new Vector2(1, 0), 200, 100);
var secondEllipse = new Ellipse(new Vector2(600, 600), new Vector2(1, 0), 200, 100);
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
    firstEllipse.HandleChangedControl(id, oldPosition, newPosition);
    secondEllipse.HandleChangedControl(id, oldPosition, newPosition);
    intersectionPoints = GetIntersectionPoints(firstEllipse, secondEllipse);
    Redraw();
};