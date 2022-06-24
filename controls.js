const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");
const CONTROLS = []
const controlSize = 10;
const selectedControlSize = 7;
const controlColor = "#638700";
const selectedControlColor = "#9BAA00";
var selectedControlId = -1;
var onControlChanged = (id, oldPosition, newPosition) => {};

class Controls
{
    static set controlChangedHandler(value)
    {
        onControlChanged = value;
    }

    static Add(position)
    {
        CONTROLS.push(position);
        return CONTROLS.length - 1;
    }

    static Remove(controlId)
    {
        CONTROLS.splice(controlId, 1);
    }

    static Draw()
    {
        for(let i = 0; i < CONTROLS.length; i++)
        {
            ctx.beginPath();
            if (i == selectedControlId)
            {
                ctx.fillStyle = selectedControlColor;
                ctx.arc(CONTROLS[i].x, CONTROLS[i].y, selectedControlSize, 0, 2 * Math.PI);
            }
            else
            {
                ctx.fillStyle = controlColor;
                ctx.arc(CONTROLS[i].x, CONTROLS[i].y, controlSize, 0, 2 * Math.PI);
            }
            ctx.fill();
        }
    }

    static OnMouseDown(mousePosition)
    {
        for(let i = 0; i < CONTROLS.length; i++)
        {
            let delta = CONTROLS[i].Sub(mousePosition);
            if (delta.sqrLen < controlSize*controlSize)
            {
                selectedControlId = i;
                onControlChanged(-1, Vector2.zero, Vector2.zero);
                break;
            }
        }
    }

    static OnMouseMove(mousePosition)
    {
        if(selectedControlId == -1)
            return;
        
        let oldPosition = CONTROLS[selectedControlId];
        CONTROLS[selectedControlId] = mousePosition;
        onControlChanged(selectedControlId, oldPosition, mousePosition);
    }

    static OnMouseUp(mousePosition)
    {
        selectedControlId = -1;
        onControlChanged(-1, Vector2.zero, Vector2.zero);
    }
}

cnv.addEventListener('mousedown', e => Controls.OnMouseDown(new Vector2(e.offsetX, e.offsetY)));
cnv.addEventListener('mousemove', e => Controls.OnMouseMove(new Vector2(e.offsetX, e.offsetY)));
cnv.addEventListener('mouseup', e => Controls.OnMouseUp(new Vector2(e.offsetX, e.offsetY)));
