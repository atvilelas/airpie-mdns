# A true full implementation of MDNS / DNS-SD / Zero conf

The goal with this is to have a full implementation of MDNS standarts for decoding and encoding in type script.

# Install

`yarn add @airpie/mdns`

# Usage

## start

Start will create a socket using a random port.
This is event driven. Whenever an event is triggered a global event will be fired along side with the specific event.

An event with packet will trigger a new event with the packt decoded.

## send

This sends a query.

# Documentation

Lots of documentation is necessary specifically around

- Store & State Management
- Event management
- Encoding & Decoding
- Better logging

# Tests

The idea is to have a close as possible to 100% coverage (I know overrated), but because there are some many nuances from the protocol definition it's better to have all basis covered

# Goal

This is written from the ground up. Many libraries found were incomplete, lacked documentation and/or reference to resources. This is to start clean and make it as straight forward as possible.

# Contributing

Please PRs are welcome, and emails as well. Feel free to contact me to chat about this.

# References

Coming soon
