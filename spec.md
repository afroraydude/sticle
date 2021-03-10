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
client. All messages are protobuf serialized and then encrypted. The above
message is not encrypted for reading's sake. Encrypted messages use PGP

## Message types

- 0 - Unknown message type
- 1 - Join Request
- 2 - Join Approve
- 3 - Join Reject
- 4 - Join Channel
- 5 - Join Channel Accept
- 6 - Join Channel Reject
- 7 - Leave Channel
- 8 - User Information Request
- 9 - User Information Approve/Send
- 10 - User Information Reject
- 11 - Direct Message Send
- 12 - Channel Message Send
- 13 - Message Send Approve
- 14 - Message Send Deny

## Initial client-server handshake

The initial client-server handshake goes as follows:

1. Client sends a join request containing a protobuf payload of the key and
user ID which is described below

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

2. The server sends a join approve if the client is allowed or join deny if not.
Join approvals have no data payload in them, but join denies MUST contain a reason.

## User ID

User IDs are decimal numbers that define each user sepeartly and are generated
as follows:

- The first 48 characters is the user's PGP key hex fingerprint converted to
decimal
- All following characters are the UNIX Timestamp for the initial connection to
the server or server cluster service.
- Zeros are made between the two to make the total size 64 characters

Example: 
```
7324232300814284530122208053811913603524572995950000001615358047
```

## Server Connection String

The connection string for a sticle server has been standardized and uses
protobuf serialization, then encodes into base64 for ease of use in different 
application types.

See [types/server_connection.proto](./types/server_connection.proto) for the specification.

Example:
```
ELkKGq4PTFMwdExTMUNSVWRKVGlCUVIxQWdVRlZDVEVsRElFdEZXU0JDVEU5RFN5MHRMUzB0Q2xabGNuTnBiMjQ2SUV0bGVXSmhjMlVnVDNCbGJsQkhVQ0IyTVM0d0xqQUtRMjl0YldWdWREb2dhSFIwY0hNNkx5OXJaWGxpWVhObExtbHZMMk55ZVhCMGJ3b0tlRzA0UlZsRlpuSXlVazFHU3pSRlJVRkRTVVJCZDFKNGNUUkpTV2xKVHpab1JHMUNWRkpSYUVOWGJtc3lTbVlyYUdOVGRFNUVhVms0Y3pCTFQxQktaQXBvTm1kMGNrNXFSa1pMWXpabVoxbFlWa0ZqTmxKbFdIbGFWV2xsVFVjeVdTdFVOams0TVc5NFR6RktkMnRUWW1vMk9GRlhXWFozYTJaalEzSkVibVJqQ2tadFpsTmtVa3h0VDJOamJHNHZXV2RQTTNwRVJqbFlUbFY2VVROWmJWa3hUa1JqZDA5RVJYbE5SRVY0V2xkS2FGbFViR2xhYlZreFRXMUpNRnB0U1hrS1drUkZNMGxFZHpCT01rcHRUbFJSTTAxRVozaE5ha0Y0VFZkV2FWbFhSVFZaYlZwdFRsUkthVTVIV21sTmJWRjRUakJDYUZwdVNuWmpiVVkxV2toV2F3cGFVelZxWWpJd0szZHZPRVZGZUUxTFFVSmpSa0Z0UWtnMk9XdERSM2s0UkVOM2EwaEJlRlZMUTBGSlpVRlJTVmhuUVVGTFExSkNialJaTm1nMldVNWlDbTFYTTBOQldEbEZlRXhoVkdsVWJGTk5TbXBVYkhneU9VNXBkMjFqYlRrclpHSXhVMUpaVkN0UE9DOTRhMGc0VUVWd1FrVlVWV0k1TWs1TVpGcFFSQ3NLVHpKdFdIY3ZTVUpuVFV3MlZFNVdlRFE0Y0ZkS1pGWlVWRVJYTW1oMU1FcFBkMVpHZVZkbFVXRjFhbGhwTVVOWWVtTkNabGw2WVdsS09HMU5ORGxwYkFweFkzQm5SbHBHWVV0Tk5WTkNSMEpJTmpsclZFTkRjVWRUVFRRNVFYZEZTRUZuVFVVeFQwa3hjVkU0WVZwNWREUm9aSEZHUVVGRFZVOVZla1JaVDNCeENtZHZSbVZaZDJoU01tMTViRE5PUVUxWGRYZFZaRmRHZGxKWmQwcDFWV1IwY0hRNE4wcFpXVlJpYkRaRWMzUTRhUzloY2xCR1YwUnJSemhNUVVwM1VWa0tSWGR2UVVSM1ZVTlpSV1p5TWxGVlNrUjNiV05CUVVsaVRHZENjVU5TUW00MFdUWm9ObGxPWW0xV09HZENRbXRVUTJkQlIwSlJTbWRTSzNaYVFVRnZTZ3BGUzBVdk4xVXpaM05IUmxSeFJHTkNRVXBKZDFWSWQyeHVhelJ6TWk5Q01DczNaSFJvVldKS2NtTnhNR2xTVTFGYVFVeG9kM0ZXT1RaaFUwSkJVRGxzQ2tkTlUxcHBaV0ZhU0hZMlNGWk5WMHd6Ukhac1MyRkVkVTR4TTFGbGNXUTJWblZIYzA5dmF5czVhelU1UVZnNVpUSlFWMHMxY0ZsakszVjVjME5sVTBrS09Wa3pOV1oxTXpVMGNFZ3lZakJGYkdkV00xaHhkWGxLWWt0bWJ6TjJNMk5oZUZSYU9FWXhUV0ZqYUZVMGVVRkNaak51ZDJoTGMzSkliMWQxWVM5WVVBcFdPV1pqVWxkNUt6UTBlVFEwTkdaU2MzSktNREpHTWxsNFRIWnlVbU5vU2s0MVJsaHZZa0Z0UVVJcmIzaEZkM05EVFRWVFFrZENTRFk1YTFSRFEzRkhDbE5OTkRsQmQwVklRV2ROUldsNlJFUm5ZVkZMZEd4eFpXUnFRV1o2ZWxCSFRreHFaV1JUZVdwblZYUm1WbU5wU0VSMVNHUnFlbmcwYVVvelRGQllibGtLTUhwdVJUQmtVR3h5ZVVGTGNVeGtVazgwV0ZkdFducEpZa2M1VTJaWUx6RnNUVXhCU25kUldVVjNiMEZFZDFWRFdVVm1jakpSVlVwRWQyMWpRVUZKWWdwTVowSnhRMUpDYmpSWk5tZzJXVTVpYlZZNFowSkNhMVJEWjBGSFFsRktaMUlyZGxwQlFXOUtSVWhrU2xsVFZUbFZUbVJtUVVkclFTOHhjU3MzYWpJdkNrZHNSM05rYjJGb05tdEhWVzF0V0daWWJHMU1WbWhMTm1relZpc3dNRlZ3V1RJM2EwRlJRMkZUVVRBelMyTm5PVU5XTmxSU1FtZHdibGxsUVVzdk1XUUtVbkpPUjNaaGJsQkdhR2xVZEhsS1luZGthRFpCV1VSc1dVcGtka1JtWjNCb1NubENiM1JyYVVsVVYxVnNiV00xTm1sTlluUk1PV2d5ZEU1emJuVnRXZ3A1ZG1OTVNIQXpObWxoVTFWb1dXVjNTSEpLY2xwU1RVSm1NWE5ZTUhNMk5HTmtUSFZNVjBsQk1XWkNjVXhhV0hORWRGWTJRWEF2VTNkaWVURjRVbVpoQ2pBelVFY3ZVM2M0YzJ4ME56SjJSWHBPTDNGYWJtMU1aMkpuUFQwS1BUQkxWbk1LTFMwdExTMUZUa1FnVUVkUUlGQlZRa3hKUXlCTFJWa2dRa3hQUTBzdExTMHRMUQ==
```
