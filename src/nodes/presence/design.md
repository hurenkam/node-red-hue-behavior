# Presence node
This node can be used to combine multiple contact sensors and motion sensors to provide a more stable presence sensor.
When contact sensors are closed, and motion is detected, it will trigger a `presence` state, which will remain until a contact sensor indicates a door has been opened again.

## State diagram
State behavior is as follows:
```mermaid
stateDiagram-v2
  [*] --> Presence
  state Presence {
    [*] --> absence
    absence --> presence: motion
    absence --> unknown_open: no contact
    presence --> unknown_open: no contact
    unknown_open --> unknown_closed: contact
    unknown_closed --> absence: absence timeout
    unknown_closed --> presence: motion
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
The `presence` and `absence` states correspond with their respective states in the diagram above. In `unknown_open` and `unknown_closed` states it will output either `motion` or `no motion` state depending on the motion sensors input and contact sensor state changes.