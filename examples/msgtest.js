var protobuf = require("protobufjs");

protobuf.load("../types/message.proto", (err, root) => {
    if (err)
        throw err;

    let JoinMessage = root.lookupType("GenericMessage")

    let payload = {type: 2, data: null}

    var errMsg = JoinMessage.verify(payload);
    if (errMsg)
        throw Error(errMsg);

    var message = JoinMessage.create(payload)

    var buffer = JoinMessage.encode(message).finish()

    let output = buffer.toString('hex');

    console.log(output)

})
