const CONTROLS = []
var controlSize = 15;
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

    static OnMouseDown(mousePosition)
    {
        for(let i = 0; i < CONTROLS.length; i++)
        {
            let delta = CONTROLS[i].Sub(mousePosition);
            if (delta.sqrLen < controlSize*controlSize)
            {
                selectedControlId = i;
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
    }
}

cnv.addEventListener('mousedown', e => Controls.OnMouseDown(new Vector2(e.offsetX, e.offsetY)));
cnv.addEventListener('mousemove', e => Controls.OnMouseMove(new Vector2(e.offsetX, e.offsetY)));
cnv.addEventListener('mouseup', e => Controls.OnMouseUp(new Vector2(e.offsetX, e.offsetY)));
