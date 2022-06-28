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

function GetRandomNumber(min, max)
{
    return Math.random() * (max - min) + min;
}

function CreateEllipseShape(minSize, maxSize)
{
    let size = new Vector2(GetRandomNumber(minSize, maxSize), GetRandomNumber(minSize, maxSize));
    let angle = Math.PI * Math.random();
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    let direction = new Vector2(cos, sin);
    let halfBoundsSize = new Vector2(Math.sqrt(size.x*size.x*cos*cos + size.y*size.y*sin*sin), Math.sqrt(size.x*size.x*sin*sin + size.y*size.y*cos*cos));
    return {size, direction, halfBoundsSize};
}

function GetPointOnCanvas(padding)
{
    let rectSize = (new Vector2(cnv.width, cnv.height)).Sub(padding).Sub(padding);
    return (new Vector2(rectSize.x * Math.random(), rectSize.y * Math.random())).Add(padding);
}

const intersectionPointColor = "#DF0113";
const intersectionPointSize = 5;

let firstEllipseShape = CreateEllipseShape(2*minEllipseSize, 20*minEllipseSize);
let secondEllipseShape = CreateEllipseShape(2*minEllipseSize, 20*minEllipseSize);

var firstEllipse = new Ellipse(GetPointOnCanvas(firstEllipseShape.halfBoundsSize), firstEllipseShape.direction, firstEllipseShape.size.x, firstEllipseShape.size.y);
var secondEllipse = new Ellipse(GetPointOnCanvas(secondEllipseShape.halfBoundsSize), secondEllipseShape.direction, secondEllipseShape.size.x, secondEllipseShape.size.y);
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