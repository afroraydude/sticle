# Sticle Schema

## Basic Description
Sticle is a messaging protocol built with privacy and simplicity in mind. It 
combines multiple already existing protocols to facilitate its goals. 

## Technologies used
1. TCP sockets for communication
2. PGP for message encryption
3. Protobuf for encoding on the socket level

## Example of a encoded message

```hex
0802
```
This message is a general "Join acccepted" message sent by a server to the 
client. All messages are protobuf serialized and then encrypted. The above message is not encrypted for reading's sake. Encrypted messages use PGP 


## Message types
0 - Unknown message type 
1 - Join Request
2 - Join Approve
3 - Join Reject
4 - Join Channel
5 - Join Channel Accept
6 - Join Channel Reject
7 - Leave Channel
8 - User Information Request
9 - User Information Approve/Send
10 - User Information Reject
11 - Direct Message Send
12 - Channel Message Send

## Initial client-server handshake
The initial client-server handshake goes as follows:
1. Client sends a join request containing a protobuf payload of the key and user ID which is described below

JSON Equivalent:
```json
{ 
    "type":1, 
    "data": {
        "id":"insert id here",
        "key":"insert pgp public key here"
    }
}
```

This is sent encrypted using the server's public key. 

2. The server sends a join approve if the client is allowed or join deny if not. Join approvals have no data payload in them, but join denies MUST contain a reason.
