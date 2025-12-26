# Presence node
This node can be used to combine multiple contact sensors and motion sensors to provide a more stable presence sensor.
When contact sensors are closed, and motion is detected, it will trigger a `presence` state, which will remain until a contact sensor indicates a door has been opened again.

## State diagram
State behavior is as follows:
```mermaid
stateDiagram-v2
  [*] --> Open
  Open --> Closed: contact
  Closed --> Open: no contact
  state Open {
    [*] --> motion_o
    motion_o --> no_motion: motion timeout
    no_motion --> motion_o: motion
  }
  state Closed {
    [*] --> motion_c
    motion_c --> absence: motion timeout
    motion_c --> presence: motion
  }
```
## Output
Output payload looks like this:
```
{
    "payload": {
        "type": "state",
        "state_report" {
            "state": "absence"
        }
    }
}
```
The `presence` and `absence` states correspond with their respective states in the diagram above. `motion_c` and `motion_o` states will be presented as `motion` to the outside, but are actually different states.