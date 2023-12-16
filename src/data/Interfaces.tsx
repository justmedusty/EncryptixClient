
export interface Message {
    timeSent: number[];
    senderUserName: string
    recieverUserName: string
    encryptedMessage: Uint8Array;
}