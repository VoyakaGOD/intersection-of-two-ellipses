const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");

function ResizeCanvas()
{
    cnv.width = window.innerWidth - 16;
    cnv.height = window.innerHeight - 20;
}

ResizeCanvas();

window.addEventListener('resize', e => ResizeCanvas());

Controls.Add(new Vector2(100, 50));
Controls.Add(new Vector2(200, 150));

function Redraw()
{
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = "green"
    for(let i = 0; i < CONTROLS.length; i++)
    {
        ctx.beginPath();
        ctx.arc(CONTROLS[i].x, CONTROLS[i].y, controlSize, 0, 2 * Math.PI);
        ctx.fill();
    }
}

Redraw();

Controls.controlChangedHandler = (id, oldPosition, newPosition) => 
{
    console.log(id);
    Redraw();
};