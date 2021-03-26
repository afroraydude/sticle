# Sticle Specification

## Basic Description

Sticle is a messaging protocol built with privacy and simplicity in mind. It
combines multiple already existing protocols to facilitate its goals.

## Technologies used

1. TCP sockets for communication
2. PGP for message encryption
3. Protobuf for encoding on the socket level

## Example of a serialized message

```hex
0802
```

See full spec of the above message [here](./types/message.proto)
This message is a general "Join acccepted" message sent by a server to the
client.

## How the encryption will work

Only the data payload protobuf message will be encrypted and it will depend on the [message type](#message-types).

Some message types will be plaintext, some encrypted. See below.

## Message types

- 0 - PING/Keep Alive (plaintext)
- 1 - Join Request (encrypted)
- 2 - Join Approve (plaintext)
- 3 - Join Reject (plaintext)
- 4 - Join Channel (encrypted for private channels, plaintext for
public channels, signed with user pgp key)
- 5 - Join Channel Accept (plaintext)
- 6 - Join Channel Reject (plaintext)
- 7 - Leave Channel (plaintext, signed with user pgp key)
- 8 - User Information Request (encrypted)
- 9 - User Information Approve/Send (encrypted)
- 10 - User Information Reject (plaintext)
- 11 - Direct Message Send (encrypted)
- 12 - Channel Message Send (plaintext)
- 13 - Message Send Approve (plaintext)
- 14 - Message Send Deny (plaintext)
- 31 - Unknown Message/Cannot Parse (plaintext)

## Example Message Process

Client sends 12 to server, server sends 13 back, server broadcasts 12 to
clients, clients send 13 back.
### Initial client-server handshake

The initial client-server handshake goes as follows:

1. Client sends a join request containing a protobuf payload of the key and
user ID which is described below

    JSON Equivalent:

    ```json
    { 
        "type":13, 
        "data": {
            "id":"insert id here",
            "key":"insert pgp public key here"
        }
    }
    ```

    This is sent encrypted using the server's public key.

2. The server sends a join approve if the client is allowed or join deny if not.
Join approvals have no data payload in them, but join denies MUST contain a reason.

## User ID

User IDs are 64 bit unsigned integers that are meant to be completely random
and are define each user sepeartly and are generated as follows:

- The first 32 bits of the User ID is the UNIX epoch
- The next 32 bits are a truncated MD5 hash of a randomly generated string by
the client software

## Server Connection String

The connection string for a sticle server has been standardized and uses
protobuf serialization, then encodes into base64 for ease of use in different
application types.

See [types/server_connection.proto](./types/server_connection.proto) for the
specification.

## Hubs

Hubs are central authorities that handle a network of servers. They are
very useful in communities that may want to network many servers
together with the goal of having a central server for authentication.

Hub-to-server communication should not require more than the already
existing [message types](#message-types) to function properl, However,
if a community would like to do such that is understood as out-of-spec
communication between servers. Hub-Server communication is given 
message types 15-30 for their own use as needed.
