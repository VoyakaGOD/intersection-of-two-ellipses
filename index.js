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

var firstEllipse = new Ellipse(new Vector2(500, 400), new Vector2(1, 0), 200, 100);
var secondEllipse = new Ellipse(new Vector2(600, 600), new Vector2(1, 0), 200, 100);

function Redraw()
{
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    firstEllipse.Draw();
    secondEllipse.Draw();
    Controls.Draw();
}

Redraw();

Controls.controlChangedHandler = (id, oldPosition, newPosition) => 
{
    firstEllipse.HandleChangedControl(id, oldPosition, newPosition);
    secondEllipse.HandleChangedControl(id, oldPosition, newPosition);
    Redraw();
};