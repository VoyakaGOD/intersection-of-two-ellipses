const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");

function ResizeCanvas()
{
    cnv.width = window.innerWidth - 16;
    cnv.height = window.innerHeight - 20;
}
ResizeCanvas();

window.addEventListener('resize', e => ResizeCanvas());