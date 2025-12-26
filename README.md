# node-red-hue-behavior

## Introduction

This is a collection of behavior node that works together with nodes from the `node-red-hue-services` package,
which is a library of nodes that work with the `Clip` api offered by Signify's hue bridge.

Where `hue-services` is more or less a direct mapping of the existing `Clip` services to a `node-red` node, the
`hue-behavior` nodes are aimed at making these services easier to use by offering advanced and/or complex automation to
couple things together.

## Status

Currently only one node is available, and this is still a work in progress. The `Presence` node aims to combine
contact and motion sensors into a more reliable `presence` signal that can be used to change light states.
Intent is that you can combine multiple contact sensors and multiple motion sensors together, but right now multiple
contact sensors is not yet supported (you can add them, but it will not have the desired result).

## Todo
 - Multiple contact sensors support for `Presence` node
 - Scene cycler & dimmer to combine buttons & rotary inputs
 - Room/zone automation that combines automated and manual behavior
