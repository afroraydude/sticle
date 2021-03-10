var protobuf = require("protobufjs");

protobuf.load("../types/join.proto", (err, root) => {
    if (err)
        throw err;

    let JoinMessage = root.lookupType("JoinMessage")

    let testkey = "LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tClZlcnNpb246IEtleWJhc2UgT3BlblBHUCB2MS4wLjAKQ29tbWVudDogaHR0cHM6Ly9rZXliYXNlLmlvL2NyeXB0bwoKeG04RVlFZnIyUk1GSzRFRUFDSURBd1J4cTRJSWlJTzZoRG1CVFJRaENXbmsySmYraGNTdE5EaVk4czBLT1BKZApoNmd0ck5qRkZLYzZmZ1lYVkFjNlJlWHlaVWllTUcyWStUNjk4MW94TzFKd2tTYmo2OFFXWXZ3a2ZjQ3JEbmRjCkZtZlNkUkxtT2NjbG4vWWdPM3pERjlYTlV6UTNZbVkxTkRjd09ERXlNREV4WldKaFlUbGlabVkxTW1JMFptSXkKWkRFM0lEdzBOMkptTlRRM01EZ3hNakF4TVdWaVlXRTVZbVptTlRKaU5HWmlNbVF4TjBCaFpuSnZjbUY1WkhWawpaUzVqYjIwK3dvOEVFeE1LQUJjRkFtQkg2OWtDR3k4REN3a0hBeFVLQ0FJZUFRSVhnQUFLQ1JCbjRZNmg2WU5iCm1XM0NBWDlFeExhVGlUbFNNSmpUbHgyOU5pd21jbTkrZGIxU1JZVCtPOC94a0g4UEVwQkVUVWI5Mk5MZFpQRCsKTzJtWHcvSUJnTUw2VE5WeDQ4cFdKZFZUVERXMmh1MEpPd1ZGeVdlUWF1alhpMUNYemNCZll6YWlKOG1NNDlpbApxY3BnRlpGYUtNNVNCR0JINjlrVENDcUdTTTQ5QXdFSEFnTUUxT0kxcVE4YVp5dDRoZHFGQUFDVU9VekRZT3BxCmdvRmVZd2hSMm15bDNOQU1XdXdVZFdGdlJZd0p1VWR0cHQ4N0pZWVRibDZEc3Q4aS9hclBGV0RrRzhMQUp3UVkKRXdvQUR3VUNZRWZyMlFVSkR3bWNBQUliTGdCcUNSQm40WTZoNllOYm1WOGdCQmtUQ2dBR0JRSmdSK3ZaQUFvSgpFS0UvN1UzZ3NHRlRxRGNCQUpJd1VId2xuazRzMi9CMCs3ZHRoVWJKcmNxMGlSU1FaQUxod3FWOTZhU0JBUDlsCkdNU1ppZWFaSHY2SFZNV0wzRHZsS2FEdU4xM1FlcWQ2VnVHc09vays5azU5QVg5ZTJQV0s1cFljK3V5c0NlU0kKOVkzNWZ1MzU0cEgyYjBFbGdWM1hxdXlKYktmbzN2M2NheFRaOEYxTWFjaFU0eUFCZjNud2hLc3JIb1d1YS9YUApWOWZjUld5KzQ0eTQ0NGZSc3JKMDJGMll4THZyUmNoSk41RlhvYkFtQUIrb3hFd3NDTTVTQkdCSDY5a1RDQ3FHClNNNDlBd0VIQWdNRWl6RERnYVFLdGxxZWRqQWZ6elBHTkxqZWRTeWpnVXRmVmNpSER1SGRqeng0aUozTFBYblkKMHpuRTBkUGxyeUFLcUxkUk80WFdtWnpJYkc5U2ZYLzFsTUxBSndRWUV3b0FEd1VDWUVmcjJRVUpEd21jQUFJYgpMZ0JxQ1JCbjRZNmg2WU5ibVY4Z0JCa1RDZ0FHQlFKZ1IrdlpBQW9KRUhkSllTVTlVTmRmQUdrQS8xcSs3ajIvCkdsR3Nkb2FoNmtHVW1tWGZYbG1MVmhLNmkzViswMFVwWTI3a0FRQ2FTUTAzS2NnOUNWNlRSQmdwblllQUsvMWQKUnJOR3ZhblBGaGlUdHlKYndkaDZBWURsWUpkdkRmZ3BoSnlCb3RraUlUV1VsbWM1NmlNYnRMOWgydE5zbnVtWgp5dmNMSHAzNmlhU1VoWWV3SHJKclpSTUJmMXNYMHM2NGNkTHVMV0lBMWZCcUxaWHNEdFY2QXAvU3dieTF4UmZhCjAzUEcvU3c4c2x0NzJ2RXpOL3Fabm1MZ2JnPT0KPTBLVnMKLS0tLS1FTkQgUEdQIFBVQkxJQyBLRVkgQkxPQ0stLS0tLQ"

    let data = {id: "7324232300814284530122208053811913603524572995950000001615358047", key: testkey}

    let payload = {type: 1, data: data}

    var errMsg = JoinMessage.verify(payload);
    if (errMsg)
        throw Error(errMsg);

    var message = JoinMessage.create(payload)

    var buffer = JoinMessage.encode(message).finish()

    let base64data = buffer.toString('hex')

    console.log(base64data)
    console.log(Buffer.byteLength(buffer))
})